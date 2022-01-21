import React, {Component} from 'react';
import {Button} from "@mui/material";

class TinderCardButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button variant="contained"
                    className={["CardButton", `CardButton-${this.props.action}`]}
                    onClick={this.props.onClick}>
                {this.props.children}
            </Button>
        );
    }
}

export default TinderCardButton;