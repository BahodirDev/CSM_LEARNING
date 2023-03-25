import React from 'react'
import Jumbotron from '../../components/menu/Jumbotron';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminMenu from '../../components/menu/AdminMenu';
import { useState } from 'react';
import {Select} from 'antd';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
const {Option} = Select;


function Product() {

    const [auth,setAuth] = useAuth();

    // 
    const {categories} = useSelector(state=>state.categories);

    // states
    const [photo,setPhoto] = useState('');
    const [category,setCategory] = useState('');
    const [name,setName] = useState('');
    const [count,setCount] = useState('');
    const [price,setPrice] = useState('');
    const [desc,setDesc] = useState('');


    // navigatsiya
    const navigate = useNavigate();

    // dispatcher
    const dispatch = useDispatch();

// bazaga qo`shish funksiya
const handleSubmit=async()=>{

    // formData
    let product = new FormData();

    console.log(category);
    product.append('name',name);
    product.append('photo',photo);
    desc && product.append('description',desc);
    product.append('categoryId',category);
    product.append('cost',price);
    product.append('count',count);
    

    try {
        let {data} = await axios.post('/product',product);
        if(data.error){
            toast.error(data.erorr)
        }else{
            dispatch({type:"ADD_PRODUCTS",payload:data});
            toast.success("Muvaffaqiyatli qo`shildi");
            navigate("/admin/product-list")
        }
    } catch (error) {
        console.log(error);
    }
}


    return (
        <>
            <Jumbotron />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                     <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='p-3 bg-light mt-2 mb-2'>
                            Product HAQIDA
                        </div>
                        <div className="row">
                        {/* img upload */}
                        <div className="col-12">
                            <div className='text-center'>
                                {
                                    photo &&
                                <img src={URL.createObjectURL(photo)} alt="photo" className='img img-reponsive mb-3' style={{height:"200px"}} />
                                }
                            </div>
                            <label className='form-control text-center p-2 bg-light pointer'>
                                {photo ? photo.name :'RASM YUKLANG'}
                            <input  type="file" hidden className='form-control mt-2'  onChange={(e)=>setPhoto(e.target.files[0])}/>
                            </label>
                        </div>
                        {/* category */}
                        <div className="col-12">
                            <Select   showSearch className='form-select mt-2 mb-2 ' onChange={(value)=>setCategory(value)}>
                                {
                                    categories?.map((value,index)=>{
                                        console.log(value);
                                        return <Option value={value._id} key={index}>{value.name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col-12">
                            <input type="text" className='form-control mt-2 mb-2 p-2' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Mahsulot nomini kiriting"  />
                        </div>
                        <div className="col-12">
                            <textarea placeholder='(Ihtiyoriy)' className='form-control' value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
                        </div>
                        <div className="col-12">
                            <input type="naumber" className='form-control mt-2 mb-2 p-2' value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Mahsulot narxini kiriting"  />
                        </div>
                        <div className="col-12">
                            <input type="number" className='form-control mt-2 mb-2 p-2' value={count} onChange={(e)=>setCount(e.target.value)} placeholder="Mahsulot miqdorini kiriting"  />
                        </div>
                        <div className="col-12">
                            <button className='btn btn-outline-primary mt-2 mb-3' onClick={handleSubmit}>QO`SHISH</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Product

