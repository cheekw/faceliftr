import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import * as ROUTES from './constants/routes'
import './App.css';

import firebase from './components/firebase.js';
import Navbar from './components/Navbar';
import Analytics from './components/Analytics';
import FaceCapture from './components/FaceCapture';
import Settings from './components/Settings';
import Questionnaire from './components/Questionnaire'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoggedIn: true })
      } else {
        this.setState({ isLoggedIn: false })
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.QUESTIONNAIRE} component={Questionnaire} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;