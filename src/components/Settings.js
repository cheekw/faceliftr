import React from 'react';
import { NavLink } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import firebase from './firebase.js';
import Button from 'react-bootstrap/Button';



class settings extends React.Component {

    render() {
        return (
            <div className="settingsContainer">
                <ul>
                    <li>CLEAR DATA</li>
                    <li>SEND REPORT</li>
                    <li>PRIVACY</li>
                    <NavLink to={ROUTES.QUESTIONNAIRE}><li>QUESTIONNAIRE</li></NavLink>
                </ul>
            </div>
        )
    }
}

export default settings;