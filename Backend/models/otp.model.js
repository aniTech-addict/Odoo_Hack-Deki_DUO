import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const otpSchema = new Schema({

    otp:{
        type: String,
        default:null,
        required: true
    },
    expireAt: {
         type: Date,
        expires: '5m',
        default: Date.now,
        required: true
    }
},{timestamps: true})

otpSchema.pre('save', async function() {
    if(!this.isModified('otp')) return;
    this.otp = await bcrypt.hash(this.otp, 10);
});

const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema) 
export default Otp