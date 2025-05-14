
import { useContext, useState } from "react";
import Header from "../../../component/Header";
import axios from "axios";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {


    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[passwordR, setPasswordR] = useState("")
    const[accept, setAccept] = useState(false)
    const[emailError, setEmailError] = useState(false)

    const nav = useNavigate();

    // Cookie
    const cookie = new Cookies();

    // Get User
    const userNow = useContext(User);


    async function submit(e){
        e.preventDefault();
        setAccept(true);
        try{
            let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordR,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            userNow.setAuth({ token, userDetails });
            nav("/dashboard")
        } catch (err) {
            if(err.response.status === 422){
                setEmailError(true);
            }
            setAccept(true);
        }
    }

    return (
        <div>
            <Header />
            <h1 className="update">SignUp User</h1>
            <div className="sign">
                <form onSubmit={submit}>
                    <label htmlFor="name">Name : </label>
                    <input 
                        id="name" 
                        type="text" 
                        placeholder="Enter Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {name.length === 0 && accept && <p>UserName Is Requierd</p>}
                    <label htmlFor="email">Eamil : </label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="Enter Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && accept && <p>Email Is Already Been Taken</p>}
                    <label htmlFor="password">Password : </label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="Enter Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {password.length < 8 && accept && <p>Password Must Be More Then 8 Char</p>}
                    <label htmlFor="repeat password">Repeat Password : </label>
                    <input 
                        id="repeat password" 
                        type="password" 
                        placeholder="Enter Repeat Password" 
                        value={passwordR}
                        onChange={(e) => setPasswordR(e.target.value)}
                    />
                    {passwordR !== password && accept && <p>Password Dose Not Match</p>}
                    <div className="register">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}