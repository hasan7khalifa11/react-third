
import { useContext, useState } from "react";
import Header from "../../../component/Header";
import axios from "axios";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";

export default function SignUp() {


    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[accept, setAccept] = useState(false)
    const[emailError, setEmailError] = useState(false)
    const nav = useNavigate();

    // Cookies
    const cookie = new Cookies();
    

    // Get User
    const userNow = useContext(User);



    async function submit(e){
        e.preventDefault();
        setAccept(true);
        try{
            let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
                email: email,
                password: password,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            userNow.setAuth({ token, userDetails });
            nav("/dashboard")
        } catch (err) {
            if(err.response.status === 401){
                setEmailError(true);
            }
            setAccept(true);
        }
    }

    return (
        <div>
            <Header />
            <h1 className="update">Login User</h1>
            <div className="sign">
                <form onSubmit={submit}>
                    
                    <label htmlFor="email">Eamil : </label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="Enter Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && accept && <p>Email Not Registered</p>}
                    <label htmlFor="password">Password : </label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="Enter Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {password.length < 8 && accept && <p>Password Must Be More Then 8 Char</p>}
                    <div className="register">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}