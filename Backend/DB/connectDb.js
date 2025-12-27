import mongoose from "mongoose";
import { MONGO_DB_URI } from "../config/env.js";

if(!MONGO_DB_URI) throw new Error('--- MONGO_DB_URI NOT DEFINED --- remove from prod');

async function connectDb(){
    try {
        console.log('Attempting to connect to MongoDB...');
        mongoose.connection.on('connected', () => {
            console.log(`MongoDB connected: ${mongoose.connection.host}`);
        });
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        const conn = await mongoose.connect(MONGO_DB_URI);
        console.log('MongoDB connect promise resolved.');
    } catch (error) {
        console.log("Error connecting to db",error )
    }
}

export default connectDb;