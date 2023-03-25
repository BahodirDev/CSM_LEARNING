import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/card/ProductCard";
import Jumbotron from "../components/menu/Jumbotron";
import { useAuth } from "../context/AuthContext"
import { toast } from 'react-hot-toast';

export default function HomePage() {

    // const { products } = useSelector(state => state.products);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);


    // sahifaga kirganda ishlaydi
    useEffect(() => {
        loadProductsPage();
        countProductsPage();
    }, []);


    // page o`zgarganda ishlaydi
    useEffect(() => {
        if (page == 1) return;
        loadingProductsPage();
    }, [page]);

    const countProductsPage = async () => {
        let { data } = await axios.get(`/products-count/`);
        if (data.error) {
            toast.error(data.error)
        } else {
            setCount(data)
        }
    }

// birinchi sahifa bazadan 3 ta ma`lumot olib keladi
    const loadProductsPage = async () => {
        let { data } = await axios.get(`/products-page/${page}`);
        if (data.error) {
            toast.error(data.error)
        } else {
            setProducts(data)
        }
    }


    // load more bosilganda ishlaydigan funsiya
    const loadingProductsPage = async () => {
        let { data } = await axios.get(`/products-page/${page}`);
        if (data.error) {
            toast.error(data.error)
        } else {
            setProducts([...products, ...data])
        }
    }

    console.log(products);
    return (
        <>
            <Jumbotron />
            <div className="container">
                <div className="d-flex p-3 m-3 justify-content-center">
                    <button className="btn btn-primary mx-2">YANGI QO`SHILGANLAR</button>
                    <button className="btn btn-outline-primary mx-2">SARALARI</button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            {
                                products?.map((p, index) => {
                                    
                                    return (
                                        <ProductCard p={p} key={index} status={true} />
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                {
                    products && products.length < count &&
                    <div className=" col-md-6 p-3">
                        <button className="btn btn-outline-warning text-center" onClick={() => setPage(page + 1)}>YUKLASH</button>
                    </div>
                }
            </div>
        </>
    )
}