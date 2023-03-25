import {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';



function AdminRoute() {

    const [ok,setOk] = useState(false);
    // context
    const [auth,setAuth] = useAuth();

  const  navigate = useNavigate();

    useEffect(()=>{

        const checkUser = async()=>{
            let {data} = await axios.get(`/check-admin`)
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

export default AdminRoute
