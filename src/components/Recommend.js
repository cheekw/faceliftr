import React, { Component } from 'react';
import Products from './products.json'
import './Recommend.css'

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
            <div>
                <h1>Recommend</h1>
                <div>
                    <h2>Regimen</h2>
                    <div>
                        {   
                            this.state.regimenProducts.map((product, index) =>
                                product ? Object.keys(product).map((key, index2) =>
                                    <Product
                                        key={key}
                                        index={index}
                                        productName={key}
                                        brand={product[key].brand}
                                        price={product[key].price}
                                        rating={product[key].rating}
                                        imageSrc={product[key].image_src}
                                        ingredients={product[key].ingredients}
                                    />
                                ) : undefined
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }

    handleData() {
        let acne = true;
        let stain = false;
        let dark_spots = false;

        let chosenProducts = [];

        var productNumber = 0;

        if (stain || dark_spots) {
            productNumber = this.getRandomInt(0, Products.exfoliator.length);
            chosenProducts.push(Products.exfoliator[productNumber]);
        } else {
            productNumber = this.getRandomInt(0, Products.cleanser.length);
            chosenProducts.push(Products.cleanser[productNumber]);
        }

        productNumber = this.getRandomInt(0, Products.moisturizer.length);
        chosenProducts.push(Products.moisturizer[productNumber]);

        if (acne) {
            productNumber = this.getRandomInt(0, Products.acne.length);
            chosenProducts.push(Products.acne[productNumber]);
        }

        this.setState({ regimenProducts: chosenProducts });
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
            <div>
                <h3>{
                    this.props.index == 0 ? 'Face Wash' : 
                    this.props.index == 1 ? 'Moisturizer':
                    'Acne Product'}</h3>
                <h4>{this.props.productName}</h4>
                <div>{this.props.brand}</div>
                <img src={this.props.imageSrc}></img>
                <div>{this.props.price}</div>
                <div>Rating: {this.props.rating} / 5</div>
                <div>Ingredients</div>
                <div>{this.props.ingredients}</div>
            </div>
        );
    }
}

export default Recommend;