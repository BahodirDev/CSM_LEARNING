import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Badge } from "antd";
import { useCarts } from "../context/Carts";
import moment from "moment";
import { FaDollarSign, FaCogs, FaCalendarAlt, FaCheckDouble } from "react-icons/fa";

function CardView() {
  // hooks
  const [carts, setCarts] = useCarts();

  const { slug } = useParams();
  const [p, setProduct] = useState({});

  console.log('c');

  useEffect(() => {
    if (slug) {loadOneProduct();
      //  loadRelatedProduct();
      }
  }, [slug]);


  // // related card olib keladi
  // async function loadRelatedProduct() {
  //   let { data } = await axios.get(`/related/${p.categoryId}/${p._id}`);
  //   if (data.error) {
  //     toast.error(data.error);
  //   } else {
  //     setProduct(data);
  //   }
  // }
  // bitta card olib keladi
  async function loadOneProduct() {
    let { data } = await axios.get(`/product/${slug}`);
    if (data.error) {
      toast.error(data.error);
    } else {
      setProduct(data);
    }
  }
  // bitta card olib keladi
  async function loadOneProduct() {
    let { data } = await axios.get(`/product/${slug}`);
    if (data.error) {
      toast.error(data.error);
    } else {
      setProduct(data);
    }
  }

  //   Storage
  function setStorage(data) {
    let arr = [...carts, data];
    setCarts(arr);
    console.log(arr);
    localStorage.setItem("carts", JSON.stringify(arr));
  }

  return (
    <div className="container-fluid mt-3 ">
      <div className="row ">
        <div className="col-md-9">
          <div className={`col-md-4 mt-2 w-100 h-100`}>
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
                <div class={`card`}>
                  <img
                    src={`${process.env.REACT_APP_URI}/product/photo/${p._id}`}
                    className="card-img-top img_size"
                    alt="..."
                  />
                  <div class="card-body p-4" style={{ padding: "0px" }}>
                    <h5 class="card-title">{p?.name}</h5>
                    <div className="d-flex align-items-center my-2">
                      <FaDollarSign />
                      <p className="px-2"></p>
                      <b>{p?.cost} so'm</b>
                    </div>
                    <div className="d-flex align-items-center my-2">
                      <FaCogs />
                      <p className="px-2"></p>
                      <p class="card-text">{p?.description?.slice(0, 20)}</p>
                    </div>
                    <div className="d-flex align-items-center my-2">
                      <FaCalendarAlt />
                      <p className="px-2"></p>
                      <p className="text-muted" style={{ margin: "0px" }}>
                        {moment(p?.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="d-flex align-items-center my-2">
                      <FaCheckDouble />
                      <p className="px-2"></p>
                      <p className="text-dark" style={{ margin: "0px" }}>SOTILGAN: {p.sold}</p>
                    </div>

                    {/* <p className='text-dark'>SOTILGAN: {p.cat}</p> */}
                  </div>

                  <div className="d-flex justify-content-around">
                    <button
                      onClick={() => setStorage(p)}
                      className="link_button_r btn btn-outline-primary w-100"
                    >
                      SAVATGA QO`SHISH
                    </button>
                  </div>
                </div>
              </Badge.Ribbon>
            </Badge.Ribbon>
          </div>
        </div>
        <div className="col-md-3 text-center">
          <h3 className="text">Tegishli mahsulotlar</h3>
          {/* massiv */}
        </div>
      </div>
    </div>
  );
}

export default CardView;
