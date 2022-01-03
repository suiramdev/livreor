import React from "react";
import "./Auth.scss";
import {Pin, Done, Person, QrCode} from "@mui/icons-material";
import {Link} from "react-router-dom";

class UserAuth extends React.Component {
    render() {
        return (
            <div className="Auth">
                <img src="logo.png" className="Auth__Logo" alt="App logo"/>
                <div className="Auth__Form">
                    <div className="Field">
                        <Person/>
                        <input type="text" placeholder="Pseudo"/>
                        <span className="Field__Help">
                            Entrez votre nom ou surnom
                            <img src="doodle_arrow.png" alt="Help arrow"/>
                        </span>
                    </div>
                    <div>
                        <div className="Field">
                            <Pin/>
                            <input type="text" placeholder="Code de session"/>
                            <span className="Field__Help">
                                Entrez le code affiché sur l'écran de l'évenement
                                <img src="doodle_arrow.png" alt="Help arrow"/>
                            </span>
                        </div>
                        <button className="Field" onClick={() => alert("Non disponible :(")}>
                            <QrCode/>
                        </button>
                    </div>
                    <button className="Submit" type="submit">
                        <span><Done/> Valider</span>
                    </button>
                    <Link to="/admin" className="Additional">ou administrer</Link>
                </div>
            </div>
        )
    }
}

export default UserAuth;