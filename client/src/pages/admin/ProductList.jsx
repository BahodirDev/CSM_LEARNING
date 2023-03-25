import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminMenu from "../../components/menu/AdminMenu"
import Jumbotron from "../../components/menu/Jumbotron";
import moment from 'moment'
import { Link } from "react-router-dom";

export default function ProductList() {

    const {products} = useSelector(state => state.products);

    return (
        <>
            <Jumbotron />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 mt-2">
                        {
                            products?.map((p, index) => {
                                return (
                                    <Link to={'/admin/product-edit/'+p.slug}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div>
                                                    <img src={`${process.env.REACT_APP_URI}/product/photo/${p._id}`} alt="picture"
                                                        className="img img-responsive" style={{ height: "100%", width:"100%",objectFit: 'cover' }} />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="card mt-2 mb-2 p-3">
                                                    <div className="card-body">
                                                        <p className="card-title">
                                                            {p.name}
                                                        </p>

                                                        <p className="card-text">
                                                            {p.description}
                                                        </p>
                                                        <p className="text-mute">
                                                            {moment(p.createdAt).format('MMMM do h:m yy')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        </>
    )
}