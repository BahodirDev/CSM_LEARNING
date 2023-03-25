import axios from 'axios';
import {useContext,useState,createContext, useEffect} from 'react' 

const authContext = createContext();


const UserAuth=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:''
    });


    axios.defaults.baseURL = process.env.REACT_APP_URI
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('userinfo'));
        setAuth({
            ...auth,
            user:data?.user,
            token:data?.token
        })
    },[])

    return(
        <authContext.Provider value={[auth,setAuth]}>
            {children}
        </authContext.Provider>
    )
}

const useAuth=()=>useContext(authContext);
export {UserAuth,useAuth};
// const [auth,setAuth] = useAuth();