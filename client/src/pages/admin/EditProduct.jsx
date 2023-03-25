import React from 'react'
import Jumbotron from '../../components/menu/Jumbotron';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminMenu from '../../components/menu/AdminMenu';
import { useState } from 'react';
import { Select } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;


function EditProduct() {

    const [auth, setAuth] = useAuth();

    // states
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [count, setCount] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        slugProduct();
    }, []);

    const { slug } = useParams();

    const {categories} = useSelector(state=>state.categories);

    // navigatsiya
    const navigate = useNavigate();

    // find product by slug
    const slugProduct = async () => {
        try {
            let { data } = await axios.get("/product/" + slug);
            setCategory(data.categoryId._id);
            setName(data.name);
            setCount(data.count);
            setPrice(data.cost);
            setDesc(data.description);
            setId(data._id);
        } catch (error) {
            console.log(error)
        }
    }


    const dispatch = useDispatch();

    // bazaga qo`shish funksiya
    const handleSubmit = async () => {

        // formData
        let product = new FormData();

        product.append('name', name);
        photo && product.append('photo', photo);
        desc && product.append('description', desc);
        product.append('categoryId', category);
        product.append('cost', price);
        product.append('count', count);


        try {
            let { data } = await axios.put('/product/'+id, product);
            if (data.error) {
                toast.error(data.error)
            } else {
                console.log(data);
                dispatch({type:"EDIT_PRODUCTS",payload:{_id:data,name,photo,description:desc,categoryId:category,cost:price,count}})
                toast.success("Muvaffaqiyatli qo`shildi");
                navigate("/admin/product-list")
            }
        } catch (error) {
            console.log(error);
        }
    }
    // remove item
    const handleDelete = async (id) => {

        try {
            let { data } = await axios.delete('/product/'+id,);
            if (data.error) {
                toast.error(data.error)
            } else {
                dispatch({type:"DELETE_PRODUCTS",payload:id})
                toast.success("Muvaffaqiyatli o`chirildi");
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
                                        photo ?
                                            <img src={URL.createObjectURL(photo)} alt="photo" className='img img-reponsive mb-3' style={{ height: "200px" }} />
                                            :
                                            <img src={`${process.env.REACT_APP_URI}/product/photo/${id}`} alt="picture"
                                                className='img img-reponsive mb-3' style={{ height: "200px" }} />
                                    }
                                </div>
                                <label className='form-control text-center p-2 bg-light pointer'>
                                    {photo ? photo.name : 'RASM YUKLANG'}
                                    <input type="file" hidden className='form-control mt-2' onChange={(e) => setPhoto(e.target.files[0])} />
                                </label>
                            </div>
                            {/* category */}
                            <div className="col-12">
                                <Select showSearch className='form-select mt-2 mb-2 ' value={category} onChange={(value) => setCategory(value)}>
                                    {
                                        categories?.map((value, index) => {
                                            return <Option value={value._id} key={index}>{value.name}</Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="col-12">
                                
                                <input type="text" className='form-control mt-2 mb-2 p-2' value={name} onChange={(e) => setName(e.target.value)} placeholder="Mahsulot nomini kiriting" />
                            </div>
                            <div className="col-12">
                                <textarea placeholder='(Ihtiyoriy)' className='form-control' value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                            </div>
                            <div className="col-12">
                                <input type="naumber" className='form-control mt-2 mb-2 p-2' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Mahsulot narxini kiriting" />
                            </div>
                            <div className="col-12">
                                <input type="number" className='form-control mt-2 mb-2 p-2' value={count} onChange={(e) => setCount(e.target.value)} placeholder="Mahsulot miqdorini kiriting" />
                            </div>
                            <div className="col-12">
                                    <button className='btn btn-outline-primary mt-2 mb-3 mx-2' onClick={handleSubmit}>O`ZGARTIRISH</button>
                                    <button className='btn btn-outline-danger mt-2 mb-3 mx-2' onClick={()=>handleDelete(id)}>O`CHIRISH</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditProduct

