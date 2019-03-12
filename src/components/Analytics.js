import React from 'react';

class Analytics extends React.Component {
    constructor() {
        super();
        this.state = {
            regimen:[]
        }
    }

    componentWillMount() {
        this.setState({
            regimen:[
                {
                    title:"title1",
                    description:"description1",
                    picture:"picture1"
                },
                {
                    title:"title2",
                    description:"description2",
                    picture:"picture2"
                },
                {
                    title:"title3",
                    description:"description3",
                    picture:"picture3"
                }
            ]
        });
    }
    render() {
        return (
            <div className="analyticsContainer">
                <div className="graph"></div>
                <div className="subtitle">
                    <h2>Regimen #1</h2>
                </div>
                <div className="regimen">
                    <div className="regimenRow">
                        <div className="imgProduct"></div>
                        <div className="content">
                            <h3>Product Name</h3>
                            <h6>Price</h6>
                            <p>Content</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Analytics;