import { Badge } from "antd";
import React from "react";
import Jumbotron from "../components/menu/Jumbotron";
import { useSearch } from "../context/search";
import moment from "moment";
import { Link } from "react-router-dom";

function Search() {
  const [value, setValue] = useSearch();

  return (
    <>
      <Jumbotron
        title="Search results"
        subtitle={
          value?.results?.length
            ? `Topildi ${value?.results?.length}`
            : "Hech narsa topilmadi"
        }
      />
      <div className="container">
        <div className="row">
          {value?.results?.length
            ? value?.results.map((p, idx) => {
                return (
                  <div className={`col-md-4 mt-2`}>
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
                          <img src={`${process.env.REACT_APP_URI}/product/photo/${p._id}`} className="card-img-top img_size" alt="..." />
                          <div class="card-body" style={{ padding: "0px" }}>
                            <h5 class="card-title">{p?.name}</h5>
                            <b>{p?.cost} so'm</b>
                            <p class="card-text">
                              {p?.description.slice(0, 20)}
                            </p>

                            <p className="text-muted">
                              {moment(p?.createdAt).fromNow()}
                            </p>
                            <p className="text-dark">SOTILGAN: {p?.sold}</p>
                            {/* <p className='text-dark'>SOTILGAN: {p.cat}</p> */}

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

export default Search;
