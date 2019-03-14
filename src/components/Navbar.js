import React from 'react';
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <div className="container">
                <div className="title">
                    <strong>FACE</strong>LIFTR
                </div>
                <ul>
                    <li><NavLink to="/camera"><div className="circle one"></div></NavLink></li>
                    <li><NavLink to="/analytics"><div className="circle two"></div></NavLink></li>
                    <li><NavLink to="/setting"><div className="circle three"></div></NavLink></li>
                </ul>
            </div>
        );
    }
}

export default Navbar;