import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";


export default function Product() {

    const [products, setProducts] = useState([]);
    const [runUseEffects, setRun] = useState(0);

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/product/show", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((data) => setProducts(data.data))
    }, [runUseEffects, token]);

    const showProduct = products.map((product, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>
                <Link to={`${product.id}`}>
                    <i className="fa-solid fa-pen-to-square i1" />
                </Link>
                <i
                    onClick={() => deleteProduct(product.id)}
                    className="fa-solid fa-trash i2"
                />
            </td>
        </tr>
    ));

    async function deleteProduct(id) {
        try {
            const res = await axios
                .delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
            if (res.status === 200) {
                setRun((prev) => prev + 1);
            }
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <div>
            <div className="tab">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showProduct}
                    </tbody>
                </table>
            </div>
        </div>
    )
}