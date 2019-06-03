import React from 'react';
import { NavLink, Link } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import firebase from './firebase.js';
import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap';
import { tsImportEqualsDeclaration } from '@babel/types';




class settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDisclaimer:false,
            errorMessage:''
        }
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
    firebase.auth().signOut().catch(error => {
        this.setState({ errorMessage: error.message });
    }).then(this.props.history.push(ROUTES.LANDING));
    }

    render() {
        let showModal = () => {
            this.setState({
                showDisclaimer:true
            });
        }

        let handleCloseDisclaimer = () => {
            this.setState({
                showDisclaimer:false
            });
        }

        return (
            <div className="settingsContainer">
                <ul>
                    <li onClick={showModal}>privacy</li>
                    <Modal show={this.state.showDisclaimer} onHide={handleCloseDisclaimer}>
                        <Modal.Header closeButton>
                            <Modal.Title>Face Capture: Disclaimer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                            We will always ask for your permission before uploading your images to our database. It is important for us to store 
                            this information as it allows us to look back on your skin health, and make better suggestions to your skincare routine.
                            You will alwyas be in the driver's seat when it comes to what we store, as you have the ability to clear your data.
                            </p>
                            <p>
                            Using the Face++ API, your uploaded picture will be scanned to get skin-health data.
                            The scan will give us information related to the levels of acne, blemishes, dark circles, and general skin health.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleCloseDisclaimer}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>  
                    <NavLink to={ROUTES.QUESTIONNAIRE}><li>questionnaire</li></NavLink>
                    <Link to={ROUTES.LANDING} onClick={() => this.handleSignOut()}>
                        <li>sign out</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

export default settings;