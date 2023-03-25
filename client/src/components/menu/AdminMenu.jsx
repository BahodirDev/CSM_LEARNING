import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminMenu() {
    return (
        <>
            <div className='bg-light mb-2  mt-2 text-center p-3 rounded'>
                LINKLAR
            </div>
            <ul className="list-group list-unstyled">
                <NavLink to={'/admin/category'} className="list-group-item">
                    KATEGORIYA QO`SHISH
                </NavLink>
                <NavLink to={'/admin/product'} className="list-group-item">
                    MAHSULOT QO`SHISH
                </NavLink>
                <NavLink to={'/admin/product-list'} className="list-group-item">
                    MAHSULOTLAR SAHIFASI
                </NavLink>
            </ul>
        </>
    )
}

export default AdminMenu
