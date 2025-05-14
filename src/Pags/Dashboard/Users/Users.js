import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";


export default function Users() {

    const [users, setUsers] = useState([]);
    const [runUseEffects, setRun] = useState(0);

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/user/show", {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        })
        .then((data) => setUsers(data.data))
    },[runUseEffects]);

    const showUser = users.map((user, index) =>(
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <Link to={`${user.id}`}>
                    <i className="fa-solid fa-pen-to-square i1"/>
                </Link>
                <i
                    onClick={() => deleteuser(user.id)}
                    className="fa-solid fa-trash i2"
                />
            </td>
        </tr>
    ));

    async function deleteuser(id) {
        try {
            const res = await axios
            .delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            if(res.status === 200) {
                setRun((prev) => prev + 1);
            }
        } 
        catch {
            console.log("error");
        }
    }



    return (
        <div>
            <div className="tab">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showUser}
                    </tbody>
                </table>
            </div>
        </div>
    )
}