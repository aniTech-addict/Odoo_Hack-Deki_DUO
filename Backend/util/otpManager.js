import User from '../models/user.model.js';
import Otp from '../models/otp.model.js';
import {createMail, sendMail} from './sendMail.util.js';
async function sendOtp(otp,email){
    const mailContent =new createMail("Opt verification",`Your Otp is`,`<h1> ${otp} </h1>`)
    await sendMail(email, mailContent);
}

async function generateOtp(email){

    const otp = Math.floor(10031 + Math.random()* 87537);
    const newOtp = new Otp({otp});
    sendOtp(otp, email)
    await newOtp.save();
    return newOtp._id
}

async function verifyOtp(userId, otp){
    const user = await User.findById(userId).populate('otp');
    if (!user || !user.otp) {
        console.log("OTP not found");
        return false;
    }
    if (user.otp.otp != otp) {
        return false;
    }
    return true
}

export {
     generateOtp,
     verifyOtp
}