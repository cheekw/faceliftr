import React, { Component } from 'react';
import firebase from './firebase.js';
import './Customization.css';
import {Modal, Button} from 'react-bootstrap';

class Customization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regimen:[],
            isLoaded:false,
            show:false,
            removed:false,
            showDeleteConfirmation:false
        }
    }

    componentDidMount() {
        if(!this.state.isLoaded) {
            let regimen = [];
            let gotData = (data) => {
                let routine = data.val();
                for(let product in routine) {
                    regimen.push(routine[product]);
                }
                this.setState({
                    regimen:regimen,
                    isLoaded:true
                });
                ref.off();
            }
            let errData = (err) => {
                console.log(err);
            }
            const user = firebase.auth().currentUser.uid;
            const ref = firebase.database().ref('users/' + user + '/Routine')
            ref.on("value", gotData, errData);
        }
    }

    render() {
        let getData = (name) => {
            let update = this.state.regimen;
            let keys = Object.keys(update);
            for(let key in keys) {
               if(name == update[key].name) {
                   delete update[key];
                   break;
               }
            }
            let gotData = (data) => {
                if(this.state.removed == false) {
                    let routine = data.val();
                    let removalKey = "";
                    for(let product in routine) {
                        if(name == routine[product].name) {
                            removalKey = product;
                        }
                    }
                    try {
                        ref.child(removalKey).remove().then(
                            function() {
                                console.log("removed: " + removalKey);
                                ref.off();
                            }
                        );
                    } catch(err) {
                        console.log("Error caught, stop deleting");
                    }
                    this.setState({
                        regimen:update,
                        showDeleteConfirmation:true,
                        removed:true
                    });
                } else {
                    this.setState({
                        removed:false
                    });
                }
            }

            let errData = (err) => {
                console.log(err);
            }
            const user = firebase.auth().currentUser.uid;
            const ref = firebase.database().ref('users/' + user + '/Routine')
            ref.on("value", gotData, errData);
        }

        let products = this.state.regimen.map((product) => {
            return(
                <li><ProductItem sendData={getData} productData={product}/></li>
            );
        });

        let loadSearch = () => {
            this.setState({
                show:true
            });
        }

        let handleClose = () => {
            this.setState({
                show:false
            });
        }

        let handleCloseDeleteConfirm = () => {
            this.setState({
                showDeleteConfirmation:false
            });
        }
        return(
            <div className="customizationContainer">
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Customization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Search for a product and add it to your current skincare routine.
                        <div className="searchBarContainer">
                            <div className="searchBar">
                                <input className="bar" type="text"/>
                                <Button className="searchBtn" variant="light">Search</Button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showDeleteConfirmation} onHide={handleCloseDeleteConfirm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Customization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your product has been successfully removed from your current skincare routine.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseDeleteConfirm}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <h3>Current Skincare Routine</h3>
                <div>
                    <ul className="productsList">
                        {this.state.isLoaded && products}
                        <li className="addContainer"><div className="addButton" onClick={loadSearch}><h6>+</h6></div></li>
                    </ul>
                </div>
            </div>
        );
    }
}

class ProductItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let product = this.props.productData;

        let sendData = () => {
            this.props.sendData(product.name);
        }

        return(
            <div className="productItemContainer">
                <div className="productBox">
                    <div className="remove" onClick={sendData}>
                        X
                    </div>
                    <img src={product.img} className="productImg"/>
                </div>
                <h6 className="productName">{product.name}</h6>
            </div>
        );
    }
}

export default Customization;