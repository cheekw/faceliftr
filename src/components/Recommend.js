import React, { Component } from 'react';
import Products from './products.json'
import './Recommend.css'
import 'bootstrap/dist/css/bootstrap.css';

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
            <div className='recommend-component tx'>
                <h2 className='row mx-auto text-center'>RECOMMENDED REGIMEN</h2>
                <div className='regimen-box'>
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
            <div className='card'>
                <img className='card-img-top mx-auto' src={this.props.imageSrc}></img>
                <h4>{this.props.productName}</h4>
                <div className='product-details'>{this.props.brand}</div>
                <div className='product-details'>{this.props.price}</div>
                <div className='product-details'>Rating: {this.props.rating} / 5</div>
                <div className='product-details'>Ingredients:</div>
                <div>{this.props.ingredients}</div>
                <div className='product-divider' />
                <br/>
            </div>
        );
    }
    
}

export default Recommend;