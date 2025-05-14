import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../Pags/Website/Context/UserContext";

export default function Sidebar(){
    const child = useContext(User);
    console.log(child);
    return(
        <div className="side-bar">
            <NavLink to="/Dashboard/users" className="item-link">
                <i className="fa-solid fa-users fa-xs"></i>
                Users
            </NavLink> 
            <NavLink to="/Dashboard/user/create" className="item-link">
                <i className="fa-solid fa-user-plus fa-xs"></i>
                New User
            </NavLink> 
            <NavLink to="/Dashboard/products/" className="item-link">
                <i className="fa-brands fa-product-hunt fa-xs"></i>
                Product
            </NavLink> 
            <NavLink to="/Dashboard/products/create" className="item-link">
                <i className="fa-solid fa-plus fa-xs"></i>
                New Product
            </NavLink> 
        </div>
    )
}