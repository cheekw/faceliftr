import React from 'react';
import { NavLink } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import './Navbar.css';

class Navbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="container">
        <div className="title">
          faceliftr.
                </div>
        <ul>
          <li><NavLink to={ROUTES.FACECAPTURE}><div className="circle one"></div></NavLink></li>
          <li><NavLink to={ROUTES.ANALYTICS}><div className="circle two"></div></NavLink></li>
          <li><NavLink to={ROUTES.SETTINGS}><div className="circle three"></div></NavLink></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;