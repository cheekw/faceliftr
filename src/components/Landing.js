import React, { Component } from 'react';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="landing-container">
        <div className="landing-header">
          {/* TODO: Change to actual logo*/}
          <div className="landing-logo">FaceLiftr</div>
          <div className="round-button">Coming Soon</div>
        </div>
        <div className="landing-cards-container">
          <div className="landing-card slogan">
            <div>
              Find your skincare regimen
            </div>
          </div>
          <div className="landing-card recommendation">
            Get immediate recommendations.
          </div>
          <div className="landing-card build">
            Build a regimen.
          </div>
          <div className="landing-card customize">
            Modify your choices.
          </div>
          <div className="landing-card track">
            Track your skin progress.
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default Landing;