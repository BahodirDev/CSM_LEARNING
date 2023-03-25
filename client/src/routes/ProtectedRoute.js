import {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';



function ProtectedRoute() {

    const [ok,setOk] = useState(false);
    // context
    const [auth,setAuth] = useAuth();

//   const  navigate = useNavigate();
//   const  location = useLocation();
    // console.log(location);
    useEffect(()=>{

        const checkUser = async()=>{
            let {data} = await axios.get(`/check-user`);
            if(data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        checkUser();

    },[auth?.token])



    return ok ? <Outlet /> : 'loading.....'
}

export default ProtectedRoute
