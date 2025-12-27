import mongoose, { startSession } from "mongoose"
import User from '../models/user.model.js';
import { createAccessToken, createRefreshToken} from '../util/createToken.js';
import bcrypt from 'bcrypt';
import { generateOtp } from '../util/otpManager.js';
import { verifyOtp } from "../util/otpManager.js";
export const sign_up = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
     try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ username, email, password });

        const otpId = await generateOtp(email);
        newUser.otp = otpId;
        await newUser.save({ session });

        await session.commitTransaction();
        
        return res.status(201).json({ status: 'success', message: 'redirect to otp verification' ,userId: newUser._id});  // in frontend localStorage.setItem('userId', newUser._id)
     } catch (error) {
        console.log("Error in sign up:", error);
        res.status(500).json({ message: 'Internal server error at sign up' });
     } finally {
        session.endSession();
     }
        
}

export const otp_verification = async(req, res)=>{
    const { otp, userId } = req.body;

    const validOtp = await verifyOtp(userId, otp);

    if (!validOtp) {
        return res.status(401).json({success: false, message: 'Invalid OTP' });
    }

    const user = await User.findById(userId);
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        user.verified = true;
        user.otp = null;
        const payload = { userId: user._id, username: user.username };
        const accessToken = await createAccessToken(payload);
        const refreshToken = await createRefreshToken(payload);

        //set or update cookies
        res.cookie(
            'token',
             accessToken,
            { httpOnly: true, secure: true, sameSite: 'strict' }
            );

        user.refreshToken = refreshToken;

        await user.save({ session });

        await session.commitTransaction();

        return res.status(200).json({ status: 'success', message: 'OTP verified successfully' });
        
    } catch (err) {
        await session.abortTransaction();
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        session.endSession();
    }

}

export const sign_in = async (req,res,next)=>{
    const { username, password } = req.body;
    try{
        if (!username || !password) {
            return res.status(400).json({status: 'failed',message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({status: 'failed', message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({status: 'failed', message: 'Invalid password ' });
        }

        const token = await createAccessToken({ userId: user._id, username: user.username });
        const refreshToken = await createRefreshToken({ userId: user._id, username: user.username });

        user.refreshToken = refreshToken;
        await user.save();
        //Sets cookies
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ status: 'success', message: 'User signed in successfully', userId: user._id });

    }catch(err){
        console.log('Sign-in error:', err.message);
        res.status(400).json({ status: 'failed',message: err.message });
    }
}
export const sign_out = (req,res,next)=>{

}