import {Router}  from 'express'
const route = Router();
import register from './user.js';
import login from './user.js';
import category from './category.js'
import product from './product.js'
import { isAdmin, mustSignIn } from '../middleware/authUserToken.js';


// check-user
route.get('/api/check-user', mustSignIn, (req,res)=>{
    res.json({ok:true})
})
route.get('/api/check-admin', mustSignIn, isAdmin, (req,res)=>{
    res.json({ok:true})
})

route.use('/api',register);
route.use('/api',login);

// category

route.use("/api",category);
route.use("/api",product);



 export default route;