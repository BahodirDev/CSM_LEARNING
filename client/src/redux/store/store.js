
import { configureStore } from '@reduxjs/toolkit'
import categories from './../reducers/categories';
import products from '../reducers/products';

export const store = configureStore({
    reducer:{categories:categories,products:products}
});