import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Analytics from './Analytics';
import FaceCapture from './FaceCapture';
import Settings from './Settings';

class Home extends Component {
  render() {
    return (
      <Router>
        <div id="appContainer" className="appContainer">
          <div className="mainNav">
            <Navbar />
            <Switch>
              <Route path='/camera' component={FaceCapture} />
              <Route path='/analytics' component={Analytics} />
              <Route path='/settings' component={Settings} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Home;