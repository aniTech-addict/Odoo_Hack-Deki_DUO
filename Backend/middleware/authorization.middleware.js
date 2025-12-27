import { JWT_ACCESS_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const authorizationMiddleware = async (req,res,next)=>{
    let token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}

export default authorizationMiddleware;