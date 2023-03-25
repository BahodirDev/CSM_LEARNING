import React from 'react'
import Jumbotron from '../../components/menu/Jumbotron';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminMenu from '../../components/menu/AdminMenu';
import UserMenu from '../../components/menu/UserMenu';

function Order() {

    const [auth, setAuth] = useAuth();

    return (
        <>
            <Jumbotron />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='p-3 bg-light mt-2 mb-2'>
                            BUYURTMA HAQIDA
                        </div>
                        <form>
                            <input disabled type="text" className='form-control mt-2' placeholder='ISM' value={auth?.user?.name} />
                            <input disabled type="text" className='form-control mt-2' placeholder='ISM' value={auth?.user?.login} />
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Order

