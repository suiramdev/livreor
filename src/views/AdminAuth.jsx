import React, {useRef, useState} from "react";
import axios from "axios";
import "./Auth.scss";
import {Key, Login, Pin, QrCode, Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";

const AdminAuth = () => {
    const navigate = useNavigate();
    const roomIdInput = useRef();
    const passwordInput = useRef();
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        await axios.post("api/admin/auth", {
            roomId: roomIdInput.current.value,
            password: passwordInput.current.value
        });
        navigate(0);
    }

    return (
        <div className="Auth">
            <img src="logo.png" className="Auth__Logo" alt="App logo"/>
            <form className="Auth__Form" onSubmit={handleSubmit}>
                <div>
                    <div className="Field">
                        <Pin/>
                        <input type="text" placeholder="Code de session" ref={roomIdInput} required/>
                        <span className="Field__Help">
                            Entrez le code affiché sur l'écran de l'évenement
                            <img src="doodle_arrow.png" alt="Help arrow"/>
                        </span>
                    </div>
                    <button className="Field" onClick={() => alert("Non disponible :(")}>
                        <QrCode/>
                    </button>
                </div>
                <div className="Field">
                    <Key/>
                    <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" ref={passwordInput} required/>
                    <a className="Field__Visibility"
                       onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                       onMouseLeave={() => setShowPassword(false)}>
                        {showPassword ? (<Visibility/>) : <VisibilityOff/>}
                    </a>
                    <span className="Field__Help">
                        Entrez le mot de passe qui vous a été donné par l'administrateur
                        <img src="doodle_arrow.png" alt="Help arrow"/>
                    </span>
                </div>
                <button className="Submit" type="submit">
                    <span><Login/> Se connecter</span>
                </button>
                <Link to="/" className="Additional">ou participer</Link>
            </form>
        </div>
    )
}

export default AdminAuth;