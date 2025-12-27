import User from '../models/user.model.js';
import { uploadToCloudinary } from '../services/upload/cloudinaryUpload.service.js';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../config/env.js';

async function getUsers(req,res){
    const token = req.cookies.token;
    const user = await User.findOne();
    res.status(200).json(user);
}


async function getUser(req,res){
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password -refreshToken');
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: user });
}

const uploadAvatar = async(req,res) =>{
    try{
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        let token = req.cookies.token;
        if(!token){
            return res.status(401).json({ success: false, message: 'Unauthorized, User must be Logged in to Upload Avatar' });
        }
        
        const { url } = await uploadToCloudinary(req.file.path, 'avatars');

        try {
            const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
            const user = await User.findById(decoded.userId);

            if(!user){
                return res.status(401).json({ success: false, message: 'Unauthorized, No User Found' });
            }

            user.avatar = url;
            await user.save();

            res.status(200).json({ success: true, message: 'Avatar updated successfully', user });
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    }catch(error){
        console.error('Upload avatar error:', error);
        res.status(500).json({ success: false, error: 'Server error: ' + error.message });
    }
}

export { getUsers, getUser, uploadAvatar };