
import { Route, Routes } from "react-router-dom"; 
import "./style.css"
import "./all.min.css"
import "./Pags/Dashboard/dashboard.css"
import SignUp from "./Pags/Website/Auth/SignUp"
import Login from "./Pags/Website/Auth/Login"
import Home from "./Pags/Website/Home";
import Dashboard from "./Pags/Dashboard/Dashboard"
import Users from "./Pags/Dashboard/Users/Users";
import UpdateUser from "./Pags/Dashboard/Users/UpdateUser"
import CreateUser from "./Pags/Dashboard/Users/CreateUser";
import RequireAuth from "./Pags/Website/Auth/RequireAuth";
import PersistLogin from "./Pags/Website/Auth/PersistLogin";
import CreateProduct from "./Pags/Dashboard/Product/CreateProduct";
import UpdateProduct from "./Pags/Dashboard/Product/UpdateProduct";
import Product from "./Pags/Dashboard/Product/Porduct";
// import About from "./About";

export default function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth/>}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="products" element={<Product />} />
              <Route path="products/create" element={<CreateProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}


