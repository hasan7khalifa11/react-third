import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import { LoadingScreen } from "../../../component/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin(){

    // Get the current User
    const context = useContext(User);
    const token = context.auth.token;

    const[loading, setLoading] = useState(true)

    // Cookies
    const cookie = new Cookies();
    const getToken = cookie.get("Bearer");


    // Send Refersh Token
    useEffect(() => {
    async function refresh(){
        try{
            await axios.post(`http://127.0.0.1:8000/api/refresh`, null , {
                headers: {
                    Authorization: "Bearer " + getToken,
                }
            })
            .then((data)=> {
                cookie.set("Bearer", data.data.token);
                context.setAuth((prev) => {
                    return {userDetails: data.data.user, token: data.data.token}
                })
            });
        }
        catch(err){
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    !token ? refresh() : setLoading(false)
    },[])

    return (
        loading ? <LoadingScreen /> : <Outlet />
    )
}