import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/menu/navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { toast, Toaster } from 'react-hot-toast';
import UserDashboard from './pages/user/UserDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import PageNotFound from './components/Error/PageNotFound';
import Dashboard from './pages/admin/Dashboard';
import AdminRoute from './routes/AdminRoute';
import Category from './pages/admin/Category';
import Product from './pages/admin/Product';
import Profile from './pages/user/Profile';
import Order from './pages/user/Order';
import ProductList from './pages/admin/ProductList';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditProduct from './pages/admin/EditProduct';
import { Shop } from './pages/Shop';
import CardView from './pages/CardView';
import Search from './pages/Search';
import Carts from './pages/Carts';
import CategoryView from './pages/CategoryView';
import EditProfile from './pages/user/EditProfile';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    loadProducts();
    loadCategories();
  },[]);

  async function loadProducts(){
    try {
      let {data} = await axios.get("/products");
      if(!data.error){
        dispatch({type:"LOAD_PRODUCTS",payload:data});
      }else{
        toast.error(data.error)
      }
    } catch (error) {
        console.log(error);
    }
  }
  async function loadCategories(){
    try {
      let {data} = await axios.get("/categories");
      if(!data.error){
        dispatch({type:"LOAD_CATEGORIES",payload:data});
      }else{
        toast.error(data.error)
      }
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Toaster />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/category/:slug' element={<CategoryView />} />
          <Route path='/carts' element={<Carts />} />
          <Route path='/search' element={<Search />} />
          <Route path='/card/:slug' element={<CardView />} />
          <Route path='/admin' element={<AdminRoute />} >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='category' element={<Category />} />
            <Route path='product' element={<Product />} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='product-edit/:slug' element={<EditProduct />} />
          </Route>
          <Route path='/user' element={<ProtectedRoute />} >
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='edit/profile/:id' element={<EditProfile />} />
            <Route path='profile' element={<Profile />} />
            <Route path='order' element={<Order />} />
          </Route>
          <Route path='*' element={<PageNotFound />} replace />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
