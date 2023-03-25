import {Router} from 'express';
import { create, update, remove, list, singleCategory } from '../controllers/category.js';
import { isAdmin, mustSignIn } from '../middleware/authUserToken.js';
const route = Router();

route.post('/category',mustSignIn, isAdmin, create);
route.delete('/category/:categoryId',mustSignIn, isAdmin, remove);
route.put('/category/:categoryId',mustSignIn, isAdmin, update);
route.get('/categories', list);
route.get('/category/:slug', singleCategory);

export default route;

// 