import React from 'react'
import Jumbotron from '../../components/menu/Jumbotron';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminMenu from '../../components/menu/AdminMenu';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import ModalUI from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
function Category() {

    const { categories } = useSelector(state => state.categories);

    const [category, setCategory] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState({
        name: "",
        id: ''
    });

    const dispatch = useDispatch();

    console.log(categories);

    // edit category
    async function editCategoryName() {
        try {
            // bazadan o'zgartirayapti
            let { data } = await axios.put("/category/" + value.id, { name: value.name });
            if (data.error) {
                toast.error(data.error);
            } else {
                dispatch({ type: "UPDATE_CATEGORIES", payload: value })
                toast.success("Muvaffaqiyatli bo`ldi");
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteCategory() {
        try {
            let { data } = await axios.delete("/category/" + value.id);
            if (data.error) {
                toast.error(data.error);
            } else {
                dispatch({ type: "DELETE_CATEGORIES", payload: value.id })
                toast.success("Muvaffaqiyatli bo`ldi");
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(category);
            let { data } = await axios.post("/category", { name: category });
            if (data.error) {
                toast.error(data.error)
            } else {
                dispatch({ type: "ADD_CATEGORIES", payload: data })
                toast.success(` ${data.name} muvaffaqiyatli qo'shildi`);
                setCategory('');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showModal = (name, id) => {
        setOpen(!open);
        setValue({ name, id });
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
                            Category
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className='form-control mt-2 p-2' placeholder='KATEGORIYA NOMI' value={category} onChange={(e) => setCategory(e.target.value)} />
                            <button onClick={handleSubmit} className='btn btn-primary mt-2'>QO`SHISH</button>
                        </form>
                        <hr />

                        <div className='col'>
                            {
                                categories?.map(c => {
                                    return (
                                        <button className='btn btn-outline-warning m-3' onClick={() => showModal(c.name, c._id)}>{c.name}</button>
                                    )
                                })
                            }
                        </div>
                        {/* modal oynasi */}
                        <ModalUI
                            CANCEL={showModal}
                            DELETE={deleteCategory}
                            EDIT={editCategoryName}
                            SETVALUE={setValue}
                            open={open}
                            value={value}
                        />
                    </div>

                </div>
            </div>

        </>
    )
}

export default Category
