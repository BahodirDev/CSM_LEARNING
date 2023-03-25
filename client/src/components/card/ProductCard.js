import React from 'react'
import { Link } from "react-router-dom";
import moment from 'moment';
import { Badge } from 'antd'
import { useCarts } from '../../context/Carts';


function ProductCard({ p, status }) {

    const [carts,setCarts] = useCarts();

    let hovarable;
    if (status) {
        hovarable = 'hovarable';
    }

    function setStorage(data){
        let arr = [...carts,data];
        setCarts(arr)
        console.log(arr);
        localStorage.setItem("carts",JSON.stringify(arr));
    }

    return (
        <div className={`col-md-4 mt-2`}>
            <Badge.Ribbon text={`Sotuvda ${p.count} ta`} color="black" placement='start'>
                <Badge.Ribbon text={`Sotildi ${p.sold} ta`} color="gold" placement='end'>
                    <div class={`card m-auto text-center   ${hovarable}`} >
                        {/* <img src={`${process.env.REACT_APP_URI}/product/photo/${p._id}`} className="card-img-top img_size" alt="..." /> */}
                        <div class="card-body" style={{padding:"0px"}}>
                            <h5 class="card-title">{p.name}</h5>
                            <b>{p.cost} so'm</b>
                            <p class="card-text">{p.description.slice(0, 20)}</p>

                            <p className='text-muted'>{moment(p.createdAt).fromNow()}</p>
                            <p className='text-dark'>SOTILGAN: {p.sold}</p>
                            {/* <p className='text-dark'>SOTILGAN: {p.cat}</p> */}

                            <div className="d-flex justify-content-around">
                                <Link to={`/card/${p.slug}`} className="link_button_l btn btn-primary w-100">
                                    KO`RISH`
                                </Link>
                                <Link to={'/'} onClick={()=>setStorage(p)} className="link_button_r btn btn-outline-primary w-100">
                                    SAVATGA QO`SHISH
                                </Link>
                            </div>
                        </div>
                    </div>
                </Badge.Ribbon>
            </Badge.Ribbon>
        </div>

    )
}

export default ProductCard
