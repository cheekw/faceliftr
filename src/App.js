import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import Setting from './components/Setting';
import Analytics from './components/Analytics';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="appContainer">
            <div className="mainNav">
              <Navbar />
              <Route path='/camera'/>
              <Route path='/analytics' component= { Analytics }/>
              <Route path='/setting' component= { Setting }/>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
