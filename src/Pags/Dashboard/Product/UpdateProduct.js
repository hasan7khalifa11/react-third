import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function UpdateProduct() {

    const[title, setTitle] = useState("")
    const[description, setDescripition] = useState("")
    const[image, setImage] = useState("")

    const id = window.location.pathname.split("/").slice(-1)[0]


    const[accept, setAccept] = useState(false)

    const context = useContext(User)
    const token = context.auth.token;

    const nav = useNavigate();

    useEffect(() => {
        axios
        .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        })
        .then((data) => {
            console.log(data)
            setTitle(data.data[0].title);
            setDescripition(data.data[0].description);
        })
    },[]);

    async function submit(e){
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
                let res = await axios.post(`http://127.0.0.1:8000/api/product/Update/${id}`, 
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
                nav("/dashboard/products")
        } catch (err) {
            console.log(err);
            setAccept(true);
        }
    }

    return (
        <div>
            <h1 className="update">Update Product</h1>
            <div className="sign">
                <form onSubmit={submit}>
                    <label htmlFor="name">Title : </label>
                    <input 
                        id="name" 
                        type="text" 
                        placeholder="Enter Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {title.length === 0 && accept && <p>UserName Is Requierd</p>}
                    <label htmlFor="email">Description : </label>
                    <input 
                        id="email" 
                        type="text" 
                        placeholder="Enter Description" 
                        value={description}
                        onChange={(e) => setDescripition(e.target.value)}
                    />
                    {/* {emailError === 422 && accept && <p>Email Is Already Been Taken</p>} */}
                    <label htmlFor="password">Image : </label>
                    <input 
                        id="password" 
                        type="file" 
                        placeholder="Enter Image" 
                        onChange={(e) => setImage(e.target.files.item(0))}
                    />
                    {/* {password.length < 8 && accept && <p>Password Must Be More Then 8 Char</p>} */}
                    
                    <div className="register">
                        <button type="submit">update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}