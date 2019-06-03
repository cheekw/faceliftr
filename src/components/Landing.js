import React, { Component } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import skincare from '../images/landing_images/skincare.png';
import facescan from '../images/landing_images/face-scan.png';
import recommend from '../images/landing_images/recommend.png';
import customize from '../images/landing_images/customize.png';
import track from '../images/landing_images/track.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

import firebase from '../components/firebase.js';


import * as ROUTES from '../constants/routes';


class Landing extends Component {
  constructor() {
    super();
    this.state = {
      buttonText : '',
      signedIn:false,
      historyPushed:false
    };
  }

  componentDidMount() {
    this.setState({ buttonText: ''});

    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ signedIn:true })
      } else {
        this.setState({ signedIn:false })
      }
    });

    AOS.init();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let goHome = () => {
      this.setState({
        historyPushed:true
      });
      if(this.state.signedIn) {
        this.props.history.push('/home');
      } else {
        this.props.history.push('/signup');
      }
    }

    let goTop = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    // function scrollFunction() {
    //   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //     document.getElementById("top").style.display = "flex";
    //   } else {
    //     document.getElementById("top").style.display = "none";
    //   }
    // }

    // function scrolling() {
    //   window.onscroll = function(){scrollFunction()};
    // }

    // {!this.state.historyPushed && scrolling()}
    return (
      // illustration by Ouch.pics
      <div className="landing">
        <div id="top" onClick={goTop} className="top-button">
          ^
        </div>
        <div className="landing-container mission">
          <div className="landing-header">
            <div className="landing-logo-text">faceliftr.</div>
            {/* <Link to={ROUTES.SIGN_IN} style={{ textDecoration: 'none', color: 'white' }}>
              {!this.state.signedIn && <div className="landing-signin-button">
                Sign in
              {/* {this.state.buttonText} */}
              {/* </div>}
            </Link> */}
          </div>
          <div className="landing-mission">find the perfect routine</div>
          <div className="landing-mission-subtitle">become your picture perfect</div>
          {/* <img src={circle}  data-aos="fade-left" className="circle-image" /> */}
          <div className="landing-start" onClick={goHome}>
            Start
          </div>
          <img src={skincare} data-aos="fade-left" className="mission-image" />
        </div>

        <div className="landing-container snapshot">
          <div className="landing-content snapshot-content">
            <div className="landing-content-title">① analyze your skin</div>
            <div className="landing-content-text">
              a selfie and questionaire is all we need to analyze your skin profile.
                  </div>
            <img src={facescan} data-aos="fade-right" className="snapshot-image"/>
          </div>
        </div>

        <div className="landing-container recommend">
          <div className="landing-content recommend-content">
            <div className="landing-content-title">② get immediate recommendations.</div>
            <div className="landing-content-text">
              skincare product recommendations tailored to your skin.
                  </div>
            <img src={recommend} data-aos="fade-left" className="recommend-image" />
          </div>
        </div>

        <div className="landing-container customize">
          <div className="landing-content customize-content">
            <div className="landing-content-title">③ customize your routine</div>
            <div className="landing-content-text">
              build your own routine or modify
              your recommended routine.
                  </div>
            <img src={customize} data-aos="fade-right" className="customize-image" />
          </div>
        </div>

        <div className="landing-container track">
          <div className="landing-content">
            <div className="landing-content-title">④ track skin progress</div>
            <div className="landing-content-text">
              save your skin data overtime to keep track of your skin improvements.
                  </div>
          </div>
          <img src={track} data-aos="fade-left" className="track-image" />
        </div>
      </div>

      // <div className="landing">
      //   <div className="landing-title-container">
      //     <div className="landing-header">
      //       <h1 className="landing-logo-text">Faceliftr</h1>
      //       <div className="landing-signin-button">SIGN IN</div>
      //     </div>
      //     <h3 className="landing-mission"></h3>
      //   </div>

      //   <div className="landing-container snapshot">
      //     <div className="landing-content">
      //       <h1 className="landing-h1 snapshot">
      //         SNAPSHOT AND ANALYZE
      //       </h1>
      //       <p>
      //         Take a quick selfie and a supplementary questionnaire. Then,
      //         our program will analyze your face and recommend specific products
      //         for your own skin issues!
      //       </p>
      //     </div>
      //   </div>

      //   <div className="landing-container track">
      //     <div className="landing-content">
      //       <h1 className="landing-h1 track">
      //         TRACK SKIN PROGRESS
      //       </h1>
      //       <p className="landing-content-track">
      //         Save your skin data after each snapshot, so you can see how your skin reacts to your
      //         current skin routine. You will be able to see when your skin was improving or worsening.
      //       </p>
      //     </div>
      //     <div className="landing-image-container">
      //       <div className="landing-image track"></div>
      //     </div>
      //   </div>

      //   <div className="landing-container customize">
      //     <div className="landing-image-container">
      //       <div className="landing-image customize"></div>
      //     </div>
      //     <div className="landing-content">
      //       <h1 className="landing-h1 customize">
      //         CUSTOMIZE SKINCARE ROUTINE
      //       </h1>
      //       <p className="landing-content-customize">
      //         You can either create your own routine or modify
      //         your recommended routine. Switch out products based
      //         off the skin progress tracker.
      //       </p>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Landing;