import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, IndexRoute, Route, Switch, Redirect } from 'react-router-dom';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import FaceCapture from './components/FaceCapture';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import * as ROUTES from './constants/routes'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path={ROUTES.SIGN_IN} component={SignIn}/>
            <Route path={ROUTES.SIGN_UP} component={SignUp}/>
            <Route path={ROUTES.HOME} component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;