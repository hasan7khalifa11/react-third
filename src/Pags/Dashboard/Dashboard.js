
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import { Outlet } from "react-router-dom";


export default function Dashboard() {
    return (
        <div>
            <Topbar />
            <div className="content-flex">
                <Sidebar />
                <div style={{width: "100%"}}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}