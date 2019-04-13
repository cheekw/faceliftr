import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase.js';
import SignUp from './SignUp.js'

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // TODO: create unsubscribe
  }

  componentWillUnmount() {
    // TODO: unsubscribe
  }

  handleInputEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleInputPassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error =>
      this.setState({ errorMessage: error.message })
    );
  }

  render() {
    return (
      <div className="account">
        <h1>FaceLiftr</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <input id="user" type="Email" placeholder="Email" autoComplete="off" required
              value={this.state.email}
              onInput={this.handleInputEmail}
            />
            <input id="password" type="password" placeholder="Password" required
              value={this.state.password}
              onInput={this.handleInputPassword}
            />
            <button type="submit" className="btn">SIGN IN</button>
          </div>
        </form>
        <div className="links">
          <span>Don't have an account?</span>
          <Link to={SignUp}>Sign up</Link>
        </div>
      </div>
    );
  }
}

export default SignIn;