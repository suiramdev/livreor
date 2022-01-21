import React from "react";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserAuth from "./views/UserAuth";
import AdminAuth from "./views/AdminAuth";
import Admin from "./views/Admin";
import {createTheme, ThemeProvider} from "@mui/material";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false
        }

        this.theme = createTheme({
            palette: {
                mode: "dark"
            }
        });
    }

    async componentDidMount() {
        this.setState({
            isAdmin: (await axios.get("api/admin")).status === 200
        });
    }


    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<UserAuth/>}/>
                        <Route path="/admin/*" element={this.state.isAdmin ? <Admin/> : <AdminAuth/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}

export default App;