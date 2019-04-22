import React, { Component } from 'react';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing-title-container">
          <div className="landing-header">
            <div className="landing-logo-text">
              <h1><strong className="bolden">Face</strong>liftr</h1>
            </div>
            <div className="landing-signin-container">
              <div className="landing-signin-button">
                <h3>SIGN IN</h3>
              </div>
            </div>
          </div>
          <div className="landing-mission">
            <h1>Become your picture perfect you</h1>
          </div>
          {/* <div className="flex">
            <div className="landing-logo-container">
              <div className="landing-logo"></div>
              <div className="landing-logo-text">
                <h1 className="landing-logo-h1"><strong className="bolden">FACE</strong>LIFTR</h1>
              </div>
            </div>
          </div> */}
        </div>

        <div className="landing-container snapshot">
          <div className="landing-image-container">
            <div className="landing-image snapshot"></div>
          </div>
          <div className="landing-content">
            <h1 className="landing-h1 snapshot">
              <strong className="bolden">SNAPSHOT</strong> AND ANALYZE
            </h1>
            <p>
              Take a quick selfie and a supplementary questionnaire. Then, 
              our program will analyze your face and recommend specific products
              for your own skin issues!
            </p>
          </div>
        </div>

        <div className="landing-container track">
          <div className="landing-content">
            <h1 className="landing-h1 track">
              TRACK <strong className="bolden">SKIN</strong> PROGRESS
            </h1>
            <p className="landing-content-track">
              Save your skin data after each snapshot, so you can see how your skin reacts to your 
              current skin routine. You will be able to see when your skin was improving or worsening.
            </p>
          </div>
          <div className="landing-image-container">
            <div className="landing-image track"></div>
          </div>
        </div>

        <div className="landing-container customize">
          <div className="landing-image-container">
            <div className="landing-image customize"></div>
          </div>
          <div className="landing-content">
            <h1 className="landing-h1 customize">
              CUSTOMIZE <strong className="bolden">SKINCARE</strong> ROUTINE
            </h1>
            <p className="landing-content-customize">
              You can either create your own routine or modify 
              your recommended routine. Switch out products based 
              off the skin progress tracker.
            </p>
          </div>
        </div>
      </div>

      // <div className="landing-container">
      //   <div className="landing-header">
      //     {/* TODO: Change to actual logo*/}
      //     <div className="landing-logo">faceliftr</div>
      //     <div className="round-button">Coming Soon</div>
      //   </div>
      //   <div className="landing-cards-container">
      //     <div className="landing-card slogan">
      //       <div>
      //         Find your skincare regimen
      //       </div>
      //     </div>
      //     <div className="landing-card recommendation">
      //       Get immediate recommendations.
      //     </div>
      //     <div className="landing-card build">
      //       Build a regimen.
      //     </div>
      //     <div className="landing-card customize">
      //       Modify your choices.
      //     </div>
      //     <div className="landing-card track">
      //       Track your skin progress.
      //     </div>
      //   </div>
      //   <div></div>
      // </div>
    );
  }
}

export default Landing;