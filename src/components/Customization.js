import React, { Component } from 'react';
import firebase from './firebase.js';
import './Customization.css';
import {Modal, Button, Collapse, Dropdown, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroller';

class Customization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regimen:[],
            isLoaded:false,
            show:false,
            removed:false,
            showDeleteConfirmation:false,
            noProd:true
        }
    }

    componentDidMount() {
        if (firebase.auth().currentUser) {
            if (!this.state.isLoaded) {
                let regimen = [];
                let gotData = (data) => {
                    let routine = data.val();
                    for (let product in routine) {
                        regimen.push(routine[product]);
                    }
                    this.setState({
                        regimen: regimen,
                        isLoaded: true
                    });
                    ref.off();
                }
                let errData = (err) => {
                    console.log(err);
                }

                const user = firebase.auth().currentUser.uid;
                const ref = firebase.database().ref('users/' + user + '/Routine');
                ref.on("value", gotData, errData);
            }

            // const productsRef = firebase.database().ref('skincare_products');
            // productsRef.once('value').then(function (snapshot) {
            //     console.log(snapshot.val());
            // });
        }
    }

    render() {
        let getData = (name) => {
            let update = this.state.regimen;
            let keys = Object.keys(update);
            for (let key in keys) {
                if (name == update[key].name) {
                    delete update[key];
                    break;
                }
            }
            let gotData = (data) => {
                if (this.state.removed == false) {
                    let routine = data.val();
                    console.log(routine);
                    let removalKey = "";
                    for(let product in routine) {
                        if(name == routine[product].name) {
                            console.log(product);
                            removalKey = product;
                        }
                    }
                    try {
                        ref.child(removalKey).remove();
                        this.setState({
                            regimen: update,
                            showDeleteConfirmation: true,
                            removed: true
                        });
                        ref.off();
                    } catch(e) {
                        console.log("error caught: " + e);
                    }
                    // let routine = data.val();
                    // let removalKey = "";
                    // for (let product in routine) {
                    //     if (name == routine[product].name) {
                    //         removalKey = product;
                    //     }
                    // }
                    // try {
                    //     ref.child(removalKey).remove().then(
                    //         function () {
                    //             console.log("removed: " + removalKey);
                    //             ref.off();
                    //         }
                    //     );
                    // } catch (err) {
                    //     console.log("Error caught, stop deleting");
                    // }
                } else {
                    this.setState({
                        removed: false
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
            if(this.state.noProd) {
                this.setState({
                    noProd:false
                });
            }
            return(
                <li><ProductItem sendData={getData} productData={product}/></li>
            );
        });

        let openAddProduct = () => {
            this.setState({
                show: true
            });
        }

        let handleClose = (data) => {
            this.setState({
                show: data
            });
        }

        let handleAdd = (product) => {
            const user = firebase.auth().currentUser.uid;
            const ref = firebase.database().ref('users/' + user + '/Routine')
            ref.push(product);
            let update = this.state.regimen;
            update.push(product);
            console.log("updated");
            console.log(product);
            this.setState({
                regimen:update
            });
        }

        let handleCloseDeleteConfirm = () => {
            this.setState({
                showDeleteConfirmation: false
            });
        }
        return (
            <div className="customizationContainer">
                {this.state.show && <AddProduct getAdd={handleAdd} close={handleClose}/>}
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
                    {this.state.noProd && <div className="noProd"><h5>You have no current products in your skincare routine.</h5></div>}
                    {/* <ul className="productsList">
                        {this.state.isLoaded && products}
                        <li className="addContainer"><div className="addButton" onClick={loadSearch}><h6>+</h6></div></li>
                    </ul> */}
                    <ul className="productsList">
                        {this.state.isLoaded && products}
                    </ul>
                    <div className="addContainer">
                        <div className="addButton" onClick={openAddProduct}>
                            Add Product
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            results:[],
            isLoaded:false,
            marker:""
        }
    }

    async componentDidMount() {
        let marker;
        const ref = firebase.database().ref('skincare_products/Cleansers');
        let counter = 0;
        let paginate = (snapshot, prevKey) => {
            counter++;
            if(!marker) {
                marker = snapshot.key;
            }
            let dict = {};
            dict["key"] = snapshot.key;
            dict["brand"] = snapshot.child("brand").val();
            dict["image_url"] = snapshot.child("image_url").val();
            dict["ingredients"] = snapshot.child("ingredients").val();
            dict["likes"] = snapshot.child("likes").val();
            dict["name"] = snapshot.child("name").val();
            dict["price"] = snapshot.child("price").val();
            dict["product_url"] = snapshot.child("product_url").val();
            dict["rating"] = snapshot.child("rating").val();
            dict["skin_types"] = snapshot.child("skin_types").val();
            this.state.results.push(dict);
            if(counter == 10) {
                this.setState({
                    isLoaded:true,
                    marker:marker
                });
            }
        }
        let results = await ref.orderByKey().limitToLast(10).on("child_added", paginate);
        console.log(results);
    }

    render() {
        let handleClose = () => {
            this.setState({
                show:!this.state.show
            });
            this.props.close(false);
        }
        
        let handleAdd = (product) => {
            this.props.getAdd(product);
        }

        let list = this.state.results.map((obj) => {
            return(
                <SearchItem getAdd={handleAdd} product={obj}/>
            );
        });

        let loadFunc = async (page) => {
            let marker;
            const ref = firebase.database().ref('skincare_products/Cleansers');
            let counter = 0;
            let paginate = (snapshot, prevKey) => {
                counter++;
                if(!marker) {
                    marker = snapshot.key;
                }
                let dict = {};
                dict["key"] = snapshot.key;
                dict["brand"] = snapshot.child("brand").val();
                dict["image_url"] = snapshot.child("image_url").val();
                dict["ingredients"] = snapshot.child("ingredients").val();
                dict["likes"] = snapshot.child("likes").val();
                dict["name"] = snapshot.child("name").val();
                dict["price"] = snapshot.child("price").val();
                dict["product_url"] = snapshot.child("product_url").val();
                dict["rating"] = snapshot.child("rating").val();
                dict["skin_types"] = snapshot.child("skin_types").val();
                this.state.results.push(dict);
                if(counter == 10) {
                    this.setState({
                        isLoaded:true,
                        marker:marker
                    });
                }
            }
            let results = await ref.orderByKey().endAt(this.state.marker).limitToLast(10).on("child_added", paginate);
            console.log(results);
        }
        return(
            <div>
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Customization: Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="addProductContainer">
                            <div className="searchBar">
                                <input placeholder="Search for your product" type="text"/>
                                <Button variant="secondary">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Button>
                                {/* <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Dropdown Button
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                            </div>
                            <div className="searchResults">
                                <div className="searchList">
                                    {
                                        this.state.isLoaded && 
                                       
                                            <div className="infiniteList">
                                                <InfiniteScroll 
                                                    pageStart={0}
                                                    loadMore={loadFunc}
                                                    hasMore={true}
                                                    useWindow={false}
                                                >
                                                    {list}
                                                </InfiniteScroll>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

class SearchItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product:{}
        };
    }

    componentDidMount() {
        this.setState({
            product:this.props.product,
            open:false
        });
    }

    render() {
        let handleAdd = () => {
            this.props.getAdd(this.state.product);
            this.setState({
                open:!this.state.open
            });
        };

        let handleClose = () => {
            this.setState({
                open:!this.state.open
            });
        };

        return(
            <div>
                <Modal show={this.state.open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Customization: Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Product has been added to your current skincare routine!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
                <div className="searchItem">
                    <div className="leftContainer">
                        <img src={this.state.product.image_url}/>
                        <h6>{this.state.product.brand + ": " + this.state.product.name}</h6>
                    </div>
                    <div className="addSearchContainer">
                        <div className="addSearchButton" onClick={handleAdd}><h6>+</h6></div>
                    </div>
                </div>
            </div>
        );
    }
}

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false,
            open:false
        }
    }
    render() {
        let product = this.props.productData;

        let sendData = () => {
            this.props.sendData(product.name);
        }

        let getProductInfo = () => {
            this.setState({
                showInfo: true
            });
        }

        let updateInfo = () => {
            this.setState({
                showInfo: false
            });
        }

        let openIngredients = () => {
            this.setState({
                open:!this.state.open
            });
        }

        return (
            // <div>
            //     {this.state.showInfo && <ProductInfo prodInfo={updateInfo} data={product} />}
            <div id="productItemContainer" className="productItemContainer" onClick={getProductInfo}>
                {/* <div className="productBox">
                    <div className="remove" onClick={sendData}>
                        X
                    </div>
                    <img src={product.img} className="productImg" />
                </div>
                <h6 className="productName">{product.name}</h6> */}
                <div className="imgContainer">
                    <img src={product.image_url} />
                </div>
                <div className="productContent">
                    <h3>{product.brand}</h3>
                    <p>{product.name}</p>
                    <Button onClick={openIngredients} variant="link">
                        Show Ingredients
                    </Button>
                    <Modal show={this.state.open} onHide={openIngredients}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ingredients for {product.brand}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {product.ingredients}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={openIngredients}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="removeContainer">
                    <div className="remove" onClick={sendData}>
                        X
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            open: false
        }
    }

    render() {
        let product = this.props.data;
        console.log(product);
        let handleClose = () => {
            this.props.prodInfo(false);
            this.setState({
                show: false
            });
        }

        let openIngredients = () => {
            this.setState({
                open: !this.state.open
            });
        }

        return (

            <div>
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Customization: Product Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="prodInfo">
                            <div className="prodImgContainer">
                                <img src={product.img} />
                            </div>
                            <div className="prodContent">
                                <h2>{product.name}</h2>
                                <p>{product.desc}</p>
                                <Button onClick={openIngredients} variant="link">
                                    Show Ingredients
                                </Button>
                                <Collapse in={this.state.open}>
                                    <p>{product.ingre}</p>
                                </Collapse>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Customization;