import React from "react";
import "./SignIn.scss";
import logo from "assets/logo.png";
import {Key, Done, Person, QrCode} from "@mui/icons-material";

class SignIn extends React.Component {
    render() {
        return (
            <div className="SignIn">
                <img src={logo} className="SignIn__Logo"/>
                <div className="SignIn__Form">
                    <div className="Field">
                        <Person/>
                        <input type="text" placeholder="Pseudo"/>
                        <div className="Field__Help">
                            <span>Entrez votre nom ou surnom</span>
                        </div>
                    </div>
                    <div>
                        <div className="Field">
                            <Key/>
                            <input type="text" placeholder="Code de session"/>
                            <div className="Field__Help">
                                <span>Entrez le code affiché sur l'écran de l'évenement</span>
                            </div>
                        </div>
                        <button className="Field">
                            <QrCode/>
                        </button>
                    </div>
                    <button className="Submit" type="submit">
                        <Done/>
                        <span>Valider</span>
                    </button>
                    <a className="Additional">ou administrer</a>
                </div>
            </div>
        )
    }
}

export default SignIn;