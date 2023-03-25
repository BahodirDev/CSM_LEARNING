import { Badge } from "antd";
import React from "react";
import Jumbotron from "../components/menu/Jumbotron";
import { useCarts } from "../context/Carts";
import moment from 'moment';
import { Link } from "react-router-dom";
import {FaTrashAlt} from 'react-icons/fa';

function Carts() {
  // hooks
  const [carts, setCarts] = useCarts();

  // getremove
  function getremove (id){
    let arr = [...carts];
    let index = arr.findIndex(s => s._id == id);
    arr.splice(index,1);
    setCarts(arr);
    localStorage.setItem("carts",JSON.stringify(arr));
  }


  return (
    <>
      <Jumbotron title="Cartlar Sahivasiga" subtitle="xush kelibsiz" />
      <div className="container">
        <div className="row">
          {carts
            ? carts?.map((p, idx) => {
                return (
                  <div className={`col-md-4 mt-2`} key={idx}>
                    <Badge.Ribbon
                      text={`Sotuvda ${p?.count} ta`}
                      color="black"
                      placement="start"
                    >
                      <Badge.Ribbon
                        text={`Sotildi ${p?.sold} ta`}
                        color="gold"
                        placement="end"
                      >
                        <div class={`card m-auto text-center`}>
                          <img
                            src={`${process.env.REACT_APP_URI}/product/photo/${p._id}`}
                            className="card-img-top img_size"
                            alt="..."
                          />
                          <div class="card-body" style={{ padding: "0px" }}>
                            <h5 class="card-title">{p?.name}</h5>
                            <p class="card-text">
                              {p?.description?.slice(0, 20)}
                            </p>
                            <b>{p?.cost} so'm</b>
                            <p style={{padding:"1px 0px"}}></p>
                            <p className="text-muted">
                              {moment(p?.createdAt).fromNow()}
                            </p>
                            <p className="text-dark">SOTILGAN: {p?.sold}</p>
                            <div className="d-flex justify-content-center ">
                                {/* <p className='text-dark mx-2'>SLUG: {p.categoryId.slug}</p> */}
                                <p className='text-dark mx-2'>SLUG: {p.slug}</p>
                                <button className="mx-2" onClick={()=>getremove(p._id)}><FaTrashAlt /></button>
                            </div>
                            {/* <p className='text-dark'>CATEGORIYASI: {p.categoryId.name}</p> */}

                            <div className="d-flex justify-content-around">
                              <Link
                                to={`/card/${p?.slug}`}
                                className="link_button_l btn btn-primary w-100"
                              >
                                KO`RISH`
                              </Link>
                              <button className="link_button_r btn btn-outline-primary w-100">
                                SAVATGA QO`SHISH
                              </button>
                            </div>
                          </div>
                        </div>
                      </Badge.Ribbon>
                    </Badge.Ribbon>
                  </div>
                );
              })
            : "Hech narsa topilmadi"}
        </div>
      </div>
    </>
  );
}

export default Carts;
