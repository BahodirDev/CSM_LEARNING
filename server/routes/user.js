import {Router}  from 'express';
import { register,login,updateProfile } from '../controllers/auth.js';
// import { isAdmin, mustSignIn } from '../middleware/authUserToken.js'
const route = Router();

route.post('/register', register);
route.post('/login',login);
route.put('/edit/profile/:id',updateProfile);


export default route;