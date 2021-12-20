import React, {useRef} from "react";
import axios from "axios";
import "./Admin.scss";
import {useNavigate} from "react-router-dom";
import TinderCard from "react-tinder-card";
import {SmartDisplay} from "@mui/icons-material";

const Admin = () => {
    const navigate = useNavigate();

    async function disconnect(event) {
        await axios.post("api/admin/logout");
        navigate(0);
    }

    return (
        <div className="Admin">
            <div className="NavBar">
                <button className="NavLink">
                    <div className="NavLink__Icon">
                        <SmartDisplay/>
                    </div>
                    <div className="NavLink__Info">
                        <span>Affichage écran</span>
                    </div>
                </button>
            </div>
            <TinderCard preventSwipe={["down"]} className="Card">dd</TinderCard>
        </div>
    )
}

export default Admin;