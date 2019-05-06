import React from 'react';
import { NavLink } from "react-router-dom";
import * as ROUTES from '../constants/routes';

const settings = () => {
    return (
        <div className="settingsContainer">
            <ul>
                <li>CLEAR DATA</li>
                <li>SEND REPORT</li>
                <li>PRIVACY</li>
                <NavLink to={ROUTES.QUESTIONNAIRE}><li>QUESTIONNAIRE</li></NavLink>
            </ul>
        </div>
    );
}

export default settings;