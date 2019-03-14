import React from 'react';
import Recommend from './Recommend';

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
                <Recommend />
            </div>
        );
    }
}

export default Analytics;