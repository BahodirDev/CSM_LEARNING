import { Badge } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";
import Jumbotron from "../components/menu/Jumbotron";
import { useCarts } from "../context/Carts";

function CategoryView() {
  // hooks
  const [carts, setCarts] = useCarts();
  //
  const { categories } = useSelector((state) => state.categories);
  //
  const [p, setProducts] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    CategoryView();
  }, [slug]);

  async function CategoryView() {
    try {
      let { data } = await axios.get(`/category/${slug}`);
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  //   setStorage funksiyasi
  function setStorage(data) {
    let arr = [...carts, data];
    setCarts(arr);
    console.log(arr);
    localStorage.setItem("carts", JSON.stringify(arr));
  }

  return (
    <>
      <Jumbotron />
      <div className="container">
        <div className="row mt-3">
          {p
            ? p?.map((p, ind) => {
              console.log('p.map =>',p);
                return (
                  <div className={`col-md-4 mt-2`}>
                    {/* <Badge.Ribbon
                      text={`Sotuvda ${p?.count} ta`}
                      color="black"
                      placement="start"
                    >
                      <Badge.Ribbon
                        text={`Sotildi ${p?.sold} ta`}
                        color="gold"
                        placement="end"
                      > */}
                        <div class={`card m-auto text-center`}>
                          {/* <img
                            src={`${process.env.REACT_APP_URI}/product/photo/${p?._id}`}
                            className="card-img-top img_size"
                            alt="..."
                          /> */}
                          <div class="card-body" style={{ padding: "0px" }}>
                            <h5 class="card-title">{p?.name}</h5>
                            <p>{p?.cost}</p>
                            {/* <b>{p?.cost}</b> */}
                            <h5 class="card-title">{p?.slug}</h5>
                            <p class="card-text">
                              {p?.description?.slice(0, 20)}
                            </p>
                            <p className="text-muted">
                              {moment(p?.createdAt).fromNow()}
                            </p>
                            <p className="text-dark">SOTILGAN: {p?.sold}</p>
                            <div className="d-flex justify-content-around">
                              <Link
                                to={`/card/${p?.slug}`}
                                className="link_button_l btn btn-primary w-100"
                              >
                                KO`RISH`
                              </Link>
                              <Link
                                to={"/"}
                                onClick={() => setStorage(p)}
                                className="link_button_r btn btn-outline-primary w-100"
                              >
                                SAVATGA QO`SHISH
                              </Link>
                            </div>
                          </div>
                        </div>
                      {/* </Badge.Ribbon>
                    </Badge.Ribbon> */}
                  </div>
                );
              })
            : "hech narsa yo`q"}
           {/* <div className={`col-md-4 mt-2`}>
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
                        src={`${process.env.REACT_APP_URI}/product/photo/${p?._id}`}
                        className="card-img-top img_size"
                        alt="..."
                      />
                      <div class="card-body" style={{ padding: "0px" }}>
                        <h5 class="card-title">{p?.name}</h5>
                        <h5 class="card-title">{p?.slug}</h5>
                        <b>{p?.cost} so'm</b>
                        <p class="card-text">{p?.description?.slice(0, 20)}</p>
                        <p className="text-muted">
                          {moment(p?.createdAt).fromNow()}
                        </p>
                        <p className="text-dark">SOTILGAN: {p?.sold}</p>
                        <div className="d-flex justify-content-around">
                          <Link
                            to={`/card/${p?.slug}`}
                            className="link_button_l btn btn-primary w-100"
                          >
                            KO`RISH`
                          </Link>
                          <Link
                            to={"/"}
                            onClick={() => setStorage(p)}
                            className="link_button_r btn btn-outline-primary w-100"
                          >
                            SAVATGA QO`SHISH
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Badge.Ribbon>
                </Badge.Ribbon>
              </div> */}
        </div>
      </div>
    </>
  );
}

export default CategoryView;
