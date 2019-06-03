import React, { Component } from 'react';
import Products from './products.json'
import './Recommend.css'
import 'bootstrap/dist/css/bootstrap.css';
import firebase from './firebase.js';
import { Link } from 'react-router-dom';

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regimenProducts: []
        };
    }

    componentDidMount() {
        this.handleData();
    }

    render() {
        return (
            <div className='recommend-component'>
                <h2>Recommended Routine</h2>
                <div className='regimen-box'>
                    {
                        this.state.regimenProducts.map((product, index) =>
                            product ?
                                <Product
                                    key={index}
                                    link={product.product_url}
                                    category={product.category}
                                    name={product.name}
                                    brand={product.brand}
                                    price={product.price}
                                    rating={product.rating}
                                    reviews={product.reviews}
                                    imageSrc={product.image_url}
                                />
                                : undefined
                        )
                    }
                </div>
            </div>
        );
    }

    handleData() {
        if (firebase.auth().currentUser) {
            const user = firebase.auth().currentUser.uid;

            const userRef = firebase.database().ref('users/' + user);
            userRef.once('value').then((snapshot) => {
                let userData = snapshot.val();

                let faceScans = userData['Face Scans'];
                let lastScanDate = Object.keys(faceScans)[Object.keys(faceScans).length - 1];
                let lastScan = faceScans[lastScanDate];

                let questions = userData['Questionnaires'];
                let lastQuestionDate = Object.keys(questions)[Object.keys(questions).length - 1];
                let lastQuestion = questions[lastQuestionDate];

                let skinType = [];
                skinType.push(lastQuestion['question 0']);
                if (lastQuestion['question 9'] == 'Yes') {
                    skinType.push("Sensitive");
                }

                let nonEssentialCategories = new Set([
                    "Eye Treatments",
                    "Face Masks",
                    "Lip Treatments",
                    "Self Tanners"
                ]);

                let regimenProducts = [];

                const productsRef = firebase.database().ref('skincare_products');
                productsRef.once('value').then((snapshot) => {
                    let products = snapshot.val();
                    Object.keys(products).map((category, index) => {
                        let categoryProducts = products[category];
                        if (!nonEssentialCategories.has(category)) {
                            if (category == 'Facial Treatments') {
                                if (lastScan['acne'] > 50 || lastQuestion['question 12'] == 'Yes') {
                                    // TODO: find acne treatment
                                    this.getSubCategoryProduct(skinType, categoryProducts, 'Blemish & Acne Treatments', regimenProducts);
                                }
                                if (lastScan['stain'] > 50) {
                                    this.getSubCategoryProduct(skinType, categoryProducts, 'Face Serums', regimenProducts);
                                }
                            } else if (category == 'Sunscreens') {
                                if (lastQuestion['question 2'] == 'No') {
                                    this.getCategoryProduct(skinType, categoryProducts, 'Sun Care', regimenProducts);
                                }
                            } else if (category == 'Cleansers') {
                                this.getCategoryProduct(skinType, categoryProducts, category, regimenProducts);
                            } else if (category == 'Moisturizers') {
                                this.getCategoryProduct(skinType, categoryProducts, category, regimenProducts);
                            }
                        }
                    });
                    this.setState({ regimenProducts: regimenProducts });
                    console.log(regimenProducts);
                });
            });
        }
    }

    // gets the product matching skin type and sub category
    getSubCategoryProduct(skinType, categoryProducts, subCategory, regimenProducts) {
        Object.keys(categoryProducts).some((productId, index) => {
            let containsAllTypes = false;
            let product = categoryProducts[productId];
            // console.log(product);
            let productSkinTypes = product['skin_types'];
            // add if skinType exists and leave the loop;
            if (productSkinTypes != "") {
                for (let i = 0; i < skinType.length; i++) {
                    let type = skinType[i];
                    if (type in productSkinTypes) {
                        containsAllTypes = true;
                    } else {
                        containsAllTypes = false;
                        break;
                    }
                }
            }
            let valid = containsAllTypes && product['sub_category'] == subCategory;
            if (valid) {
                regimenProducts.push(product);
            }

            return valid;
        });
    }

    // gets the product matching skin type and category
    getCategoryProduct(skinType, categoryProducts, category, regimenProducts) {
        Object.keys(categoryProducts).some((productId, index) => {
            let containsAllTypes = false;
            let product = categoryProducts[productId];
            // console.log(product);
            let productSkinTypes = product['skin_types'];
            // add if skinType exists and leave the loop;
            if (productSkinTypes != "") {
                for (let i = 0; i < skinType.length; i++) {
                    let type = skinType[i];
                    if (type in productSkinTypes) {
                        containsAllTypes = true;
                    } else {
                        containsAllTypes = false;
                        break;
                    }
                }
            }
            let valid = containsAllTypes && product['category'] == category;
            if (valid) {
                regimenProducts.push(product);
            }

            return valid;
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

class Product extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="product">
                <div className='product-card'>
                    <img className='product-image' src={this.props.imageSrc}></img>
                    <div className='product-details-content'>
                        <h4>{this.props.category}</h4>
                        <div className='product-details'><a href={this.props.link} target="_blank">{this.props.name}</a></div>
                        <div className='product-details'>Brand: {this.props.brand}</div>
                        <div className='product-details'>Price: {this.props.price}</div>
                        <div className='product-details'>Rating: {this.props.rating} / 5</div>
                        <div className='product-details'>{this.props.reviews}</div>
                        <div className='product-divider' />
                    </div>
                </div>
            </div>

        );
    }

}

export default Recommend;