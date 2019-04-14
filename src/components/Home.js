import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Analytics from './Analytics';
import FaceCapture from './FaceCapture';
import Settings from './Settings';
import * as ROUTES from '../constants/routes'

class Home extends Component {
  render() {
    return (
      <Router>
        <div id="appContainer" className="appContainer">
          <div className="mainNav">
            <Navbar />
            <Switch>
              <Route path={ROUTES.FACECAPTURE} component={FaceCapture} />
              <Route path={ROUTES.ANALYTICS} component={Analytics} />
              <Route path={ROUTES.SETTINGS} component={Settings} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Home;