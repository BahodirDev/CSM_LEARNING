import {Router} from 'express';
import { create,list,singleProduct,photo,update,remove, filterProducts, productsCount, productsPage, categories, productsSearch} from '../controllers/product.js';
import formdable from 'express-formidable';
import { isAdmin, mustSignIn } from '../middleware/authUserToken.js';
const route = Router();

route.post('/product',mustSignIn, isAdmin, formdable(), create);
route.delete('/product/:productId', remove);
route.put('/product/:productId',formdable(), update);
route.get('/products', list);
route.get('/product/:slug', singleProduct);
route.get('/product/photo/:productId', photo);
route.post('/product/filterProducts', filterProducts);
route.get('/products-count', productsCount); // hammasi
route.get('/products-page/:page', productsPage); // page qarab
route.get("/products/search/:query",productsSearch)
route.get("/category/:slug",categories)



export default route;

// 