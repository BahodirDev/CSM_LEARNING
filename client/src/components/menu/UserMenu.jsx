import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function UserMenu() {

    // hooks
    const [auth,setAuth] = useAuth();
    
    console.log('auth=>',auth);

    return (
        <>
            <div className='bg-light mb-2  mt-2 text-center p-3 rounded'>
                LINKLAR
            </div>
            <ul className="list-group list-unstyled">
                <NavLink to={`/user/edit/profile/${auth?.user?._id}`} className="list-group-item">
                    PROFILNI O`ZGARTIRISH
                </NavLink>
                <NavLink to={'/user/profile'} className="list-group-item">
                    FOYDALANUVCHI PROFILI
                </NavLink>
                <NavLink to={'/user/order'} className="list-group-item">
                    BUYURTMALAR
                </NavLink>
            </ul>
        </>
    )
}

export default UserMenu
