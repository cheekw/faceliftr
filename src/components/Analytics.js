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
                <svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="#6975A7" rx="10" ry="10" x="0" y="0" height="100%" width="100%" />
                    <text fill="#ecf0f1" x="240" y="30">AUG 1ST, 2018 - MAR 24TH, 2019</text>
                    <text fill="#ecf0f1" x="20" y="460">0</text>
                    <text fill="#ecf0f1" x="20" y="380">20</text>
                    <line x1="40" y1="375" x2="660" y2="380" stroke="#ecf0f1"
                        stroke-dasharray="4" />
                    <text fill="#ecf0f1" x="20" y="300">40</text>
                    <line x1="40" y1="295" x2="660" y2="295" stroke="#ecf0f1"
                        stroke-dasharray="4" />
                    <text fill="#ecf0f1" x="20" y="220">60</text>
                    <line x1="40" y1="215" x2="660" y2="215" stroke="#ecf0f1"
                        stroke-dasharray="4" />
                    <text fill="#ecf0f1" x="20" y="140">80</text>
                    <line x1="40" y1="135" x2="660" y2="135" stroke="#ecf0f1"
                        stroke-dasharray="4" />
                    <text fill="#ecf0f1" x="10" y="60">100</text>
                    <line x1="40" y1="55" x2="660" y2="55" stroke="#ecf0f1"
                        stroke-dasharray="4" />
                    <polyline points="40, 460 660, 460" fill="none" stroke="#ecf0f1"/>
                    <polyline points="40, 40 40, 460" fill="none" stroke="#ecf0f1"/>
                    <polyline points="40, 450 50,450 100,440 150,460 200,380 250,350 300,360 350,300 400,290 450,300 500,250 550,240 600,220 650,200" fill="none" stroke-width="3" stroke="#e74c3c"/>
                    <polyline points="40, 210 50,220 100,230 150,220 200,220 250,220 300,210 350,190 400,190 450,190 500,150 550,160 600,160 650,140" fill="none" stroke-width="3" stroke="#2ecc71"/>
                    <polyline points="40, 360 50,350 100,360 150,420 200,450 250,450 300,440 350,420 400,400 450,410 500,380 550,350 600,300 650,280" fill="none" stroke-width="3" stroke="#f1c40f"/>
                </svg>
                
                <Recommend />
            </div>
        );
    }
}

export default Analytics;