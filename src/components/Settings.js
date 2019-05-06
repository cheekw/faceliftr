import React from 'react';
import { NavLink } from "react-router-dom";
import * as ROUTES from '../constants/routes';

const settings = () => {
    return (
        <div className="settingsContainer">
            <ul>
                <li><a>CLEAR DATA</a></li>
                <li><a>SEND REPORT</a></li>
                <li><a>PRIVACY</a></li>
                <li><a><NavLink to={ROUTES.QUESTIONNAIRE}>QUESTIONNAIRE</NavLink></a></li>
            </ul>
        </div>
    );
}

export default settings;