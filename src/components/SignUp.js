import React, { Component } from 'react';
import firebase from './firebase.js';
import { Link } from 'react-router-dom';
import md5 from 'blueimp-md5';
import * as ROUTES from '../constants/routes';
import "./SignIn.css";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: '',
        };
        this.handleInputDisplayName = this.handleInputDisplayName.bind(this);
        this.handleInputEmail = this.handleInputEmail.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
        this.handleInputPasswordConfirmation = this.handleInputPasswordConfirmation.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    getEmailHash() {
        return md5(this.state.email.trim().toLowerCase());
    }

    handleInputDisplayName(event) {
        this.setState({ displayName: event.target.value });
    }

    handleInputEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleInputPassword(event) {
        this.setState({ password: event.target.value });
    }

    handleInputPasswordConfirmation(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    handleSubmitForm(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMessage: 'Passwords do not match.' })
        } else {
            let hash = this.getEmailHash();
            firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => {
                    user.updateProfile({ displayName: this.state.displayName })
                    // .then(() => { this.props.history.push('/'); window.location.reload() })
                    // .catch(error => this.setState({ errorMessage: error.message }));
                })
                .catch(error => this.setState({ errorMessage: error.message }));
        }
    }

    render() {
        return (
            <div className="account">
                <h1><Link to={ROUTES.LANDING} style={{color: "#2CD6A9"}} >faceliftr.</Link></h1>
                <p className="error-message">{this.state.errorMessage}</p>
                <form onSubmit={event => this.handleSubmitForm(event)}>
                    <div className="container">
                        <input id="displayName" type="text" placeholder="Display Name" autoComplete="off" required
                            value={this.state.displayName}
                            onChange={event => this.handleInputDisplayName(event)}
                        />
                        <input id="user" type="Email" placeholder="Email" autoComplete="off" required
                            value={this.state.email}
                            onChange={event => this.handleInputEmail(event)}
                        />
                        <input id="password" type="password" placeholder="Password" required minLength="6"
                            value={this.state.password}
                            onChange={event => this.handleInputPassword(event)}
                        />
                        <input id="confirmPassword" type="password" placeholder="Confirm Password" required minLength="6"
                            value={this.state.confirmPassword}
                            onChange={event => this.handleInputPasswordConfirmation(event)}
                        />
                        <button type="submit" className="btn">CREATE ACCOUNT</button>
                    </div>
                    <div className="links">
                        <span>Already have an account?</span>
                        <Link to={ROUTES.SIGN_IN}>Sign in</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;