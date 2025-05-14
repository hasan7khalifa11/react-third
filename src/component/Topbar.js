import { Link } from "react-router-dom";

export default function Topbar(){
    return(
        <div className="d-flex top-bar">
            <h1 className="log">Store</h1>
            <Link to="/" className="register-nav">Go To Web Site</Link>
        </div>
    )
}