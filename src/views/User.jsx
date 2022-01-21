import React, {useMemo, useState} from "react";
import axios from "axios";
import "./Admin.scss";
import {Link, useNavigate} from "react-router-dom";
import TinderCard from "react-tinder-card";
import {Close, CloudDone, CloudOff, Delete, Fullscreen, Logout, SmartDisplay, Undo} from "@mui/icons-material";

const content = [
    {
        author: "Jean-Pierre",
        message: "C'était d'incroyables vacances passés avec vous !",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Colombus_Isle.JPG/1200px-Colombus_Isle.JPG"
    },
    {
        author: "Bernadette",
        message: "Tu as grandi !",
        image: "https://i.pinimg.com/originals/50/a3/55/50a3556610ab5bf312363b72a46f4466.jpg"
    },
    {
        author: "Odette",
        message: "Bonne anniversaire Henry !!!",
        image: "https://cdn-s-www.leprogres.fr/images/5E640ABC-B930-40B6-8ECE-4E239A28CC8E/NW_raw/l-instant-photo-avant-de-passer-a-table-photo-progres-bernard-moiroud-1565472143.jpg"
    }
];

const Admin = () => {
    const navigate = useNavigate();

    async function disconnect() {
        await axios.post("api/user/logout");
        navigate(0);
    }

    return (
        <div className="Admin">
            <div className="Admin__Options">
                <button className="Option" onClick={disconnect}><Logout/></button>
            </div>
        </div>
    )
}

export default Admin;