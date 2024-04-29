import { useEffect, useState } from "react";
import adminPanelcss from "./adminPanel.css";
import { Link, useNavigate } from "react-router-dom";


let AdminPanel = (props) => {
    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem("token")) {
            navigate("/login", { replace: true })
        }

    }, [])

    return (

        <div className="admincontainer d-flex" >
            <div className="sidebar d-flex justify-content-between flex-column bg-slate-800 ">
                <ul>
                    <Link exact to="/admin-panel"> <li><i className="fa fa-navicon fs-4"></i> <span id="adminLighted">DealsDray</span></li></Link>
                    <Link exact to="/admin-panel"> <li><i className="fa fa-edit"></i> <span>Create Employee</span></li></Link>
                    <Link exact to="/admin-panel/list"><li><i className="fa fa-newspaper-o"></i> <span>Data</span></li></Link>

                </ul>

                <ul className="d-flex flex-column">
                    <li onClick={() => { window.localStorage.clear("token"); navigate("/login") }}><i className="fa fa-sign-in"></i> <span>Log-out</span></li>

                </ul>
            </div>
            <div className="w-100 d-flex align-items-center flex-column">
                <div className="adminpanelHeading">Dashboard</div>
                <div id="adminContainerArea">
                    {props.container}
                </div>

            </div>
        </div >


    );
}

export default AdminPanel;