import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Jumbotron from '../components/menu/Jumbotron';

function Login() {
    const [auth, setAuth] = useAuth();


    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post(`/login`, { login, password });

            if (data.error) {
                toast.error(data.error)
            } else {
                setAuth({ ...auth, user: data?.user, token: data?.token });
                localStorage.setItem('userinfo', JSON.stringify(data))
                toast.success('KIRISH MUVAFFAQIYATLI BO`LDI');
                navigate(`/${data?.user?.isAdmin == true ? 'admin' : 'user'}/dashboard`)
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
        <Jumbotron />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 mt-5">
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={login} className="form-control my-2 p-2" onChange={(e) => setLogin(e.target.value)} placeholder="LOGIN KIRITING" />
                            <input type="password" value={password} className="form-control my-2 p-2" onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD KIRITING" />
                            <div className='text-center mt-4'>
                                <button className='btn btn-primary'>YUBORISH</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login
