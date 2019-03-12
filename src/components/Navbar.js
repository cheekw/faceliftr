import React from 'react';

const Navbar = () => {
    return(
        <div className="container">
            <div className="title">
                <strong>FACE</strong>LIFTR
            </div>
            <ul>
                <li><a href="/camera"><div className="circle one"></div></a></li>
                <li><a href="/analytics"><div className="circle two"></div></a></li>
                <li><a href="/setting"><div className="circle three"></div></a></li>
            </ul>
        </div>
    );
}

export default Navbar;