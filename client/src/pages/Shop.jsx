import { useSelector } from "react-redux";
import ProductCard from "../components/card/ProductCard";
import Jumbotron from "../components/menu/Jumbotron";
import { Checkbox, Radio } from 'antd'
import { useEffect, useState } from "react";
import { prices } from '../components/prices'
import axios from "axios";
import Loader from '../components/loader/Loader';

export function Shop() {
    // redux
    const { categories } = useSelector(state => state.categories);
    const { products } = useSelector(state => state.products);

    // state
    const [check, setCheck] = useState([]);
    const [radio, setRadio] = useState([]);
    const [products1, setProducts1] = useState([]);
    const [isLoading, setUsLoading] = useState(false)


    useEffect(() => {
        setUsLoading(true)
        setProducts1(products);
        setUsLoading(false)
    }, [products]);

    console.log(products1);


    useEffect(() => {
        setUsLoading(true)
        if (radio.length || check.length) filterProducts();
        setUsLoading(false)

    }, [check, radio]);




    const filterProducts = async () => {
        try {
            let { data } = await axios.post('/product/filterProducts', { radio, check });
            setProducts1(data);
        } catch (error) {
            console.log(error);
        }
    }

    // function filter
    const filterFunction = (value, isTrue) => {
        let mass = [...check];
        if (isTrue) {
            mass.push(value);
        } else {
            mass = mass.filter(s => s != value)
        }

        setCheck(mass);
    }


    return (
        <>
            <Jumbotron title="Sotuv bo`limi" subtitle="Kategoriya va Narx bo`yicha saralash" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 p-3  mt-3">
                        <h3 className="bg-light p-3 text-center fw-bold">KATEGORIYA</h3>
                        <div>
                            {
                                categories?.map(c => {
                                    return <div className="my-3" key={c._id}>
                                        <Checkbox onClick={(e) => filterFunction(c._id, e.target.checked)}>{c.name}</Checkbox>
                                    </div>
                                })
                            }
                        </div>
                        <h3 className="bg-light p-3 mt-3  text-center fw-bold">NARX</h3>
                        <div>
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {
                                    prices?.map((c, idx) => (
                                        <div className="col h5" key={idx}>
                                            <Radio value={c.price} >
                                                {c.name}
                                            </Radio>
                                        </div>

                                    ))
                                }
                            </Radio.Group>
                        </div>
                        <div className="text-center p-3">
                            <button className="btn btn-outline-danger" onClick={() => {
                                window.location.reload();
                            }}>RESET</button>
                        </div>
                    </div>
                    <div className="col-md-9 p-3 mt-3">
                        <h3 className="bg-light p-3 text-center fw-bold">MAHSULOTLAR</h3>
                        <div className="row p-3">

                            {
                                isLoading ? <Loader />
                                    :
                                    products1?.map((val, idx) => {
                                        return <ProductCard p={val} key={idx} status={false} />
                                    })

                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}