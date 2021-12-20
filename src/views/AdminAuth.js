import React, {useRef, useState} from "react";
import axios from "axios";
import "./Auth.scss";
import {Key, Login, Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";

const AdminAuth = () => {
    const navigate = useNavigate();
    const passwordInput = useRef();
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        await axios.post("api/admin/auth", {
            password: passwordInput.current.value
        });
        navigate(0);
    }

    return (
        <div className="Auth">
            <img src="logo.png" className="Auth__Logo" alt="App logo"/>
            <form className="Auth__Form" onSubmit={handleSubmit}>
                <div className="Field">
                    <Key/>
                    <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" ref={passwordInput}/>
                    <a className="Field__Visibility"
                       onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                       onMouseLeave={() => setShowPassword(false)}>
                        {showPassword ? (<Visibility/>) : <VisibilityOff/>}
                    </a>
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