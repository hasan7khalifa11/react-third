import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header(){

    const cookie = new Cookies();
    const token = cookie.get("Bearer");
    

    async function handleLogOut () {
        await axios.post(`http://127.0.0.1:8000/api/logout`, null, {
            headers : {
                Authorization: "Bearer " + token,
            },
        });
        cookie.remove("Bearer");
        window.location.pathname = "/";
    }

    return (
        <nav className="top-bar">
            <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', color:'#2196f3', gap: '20px'}}>
                <h2 className="log">Home</h2>
                <h2 className="log">About</h2>
            </div>
            <div style={{gap: '10px', display:"flex", justifyContent: 'center', alignItems: 'center'}}>
                { token ? <>
                            <Link to="/Dashboard" className="register-nav">
                                Dashboard
                            </Link>
                            <div className="register-nav" onClick={handleLogOut}>Log Out</div>
                    </> : <>
                            <Link to="/register" className="register-nav" >
                                Register
                            </Link>
                            <Link to="/login" className="register-nav" >
                                Log In
                            </Link>
                    </>
                }
            </div>
        </nav>
    )
}