import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Setting from './components/Setting';
import Analytics from './components/Analytics';
import FaceCapture from './components/test';
import './App.css';
import { fail } from 'assert';
 
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div id="appContainer" className="appContainer">
            <div className="mainNav">
              <Navbar />
							<Switch>
                <Route path='/camera' component={FaceCapture} />
								<Route path='/analytics' component= { Analytics }/>
								<Route path='/setting' component= { Setting }/>
							</Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;