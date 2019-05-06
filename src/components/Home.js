import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import firebase from './firebase.js';
import Navbar from './Navbar';
import Analytics from './Analytics';
import FaceCapture from './FaceCapture';
import Settings from './Settings';
import Questionnaire from './Questionnaire'
import * as ROUTES from '../constants/routes'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
      displayName: '',
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo(user) {
    this.setState({
      displayName: user.displayName,
    });
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.getUserInfo(user);
      } else {
        this.props.history.push(ROUTES.SIGN_IN);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSignOut() {
    firebase.auth().signOut().catch(error => {
      this.setState({ errorMessage: error.message });
    }).then(this.props.history.push(ROUTES.LANDING));
  }

  render() {
    return (
      <Router>
        <div id="appContainer" className="appContainer">
          <div className="sign-out">
            <Link to={ROUTES.LANDING} onClick={() => this.handleSignOut()}>
              Sign out
              </Link>
          </div>
          <div className="mainNav">
          <Navbar />
            <Switch>
              < Route path={ROUTES.FACECAPTURE} component={FaceCapture} />
              < Route path={ROUTES.ANALYTICS} component={Analytics} />
              <Route path={ROUTES.SETTINGS} component={Settings} />
              <Route path={ROUTES.QUESTIONNAIRE} component={Questionnaire} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Home;