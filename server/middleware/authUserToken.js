import JWT from 'jsonwebtoken';
import dot from 'dotenv';
import userModel from '../model/userModel.js';
dot.config();

export const mustSignIn = async(req,res,next)=>{
    try {
        let {authorization} = req.headers;
        let user = JWT.verify(authorization,process.env.JWT_SECRET);
        req.user = user._id;
        next();
    } catch (error) {
        console.log('error =>', error);
        res.status(401).send(error)
    }

}

export const isAdmin = async(req,res,next)=>{
    try {
        let user = await userModel.findById(req.user);
        if(!user.isAdmin){
           return res.status(401).json({error:"Xatolik"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(error)
    }

}