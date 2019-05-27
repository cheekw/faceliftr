import React from 'react';
import Recommend from './Recommend';
import {Line, Doughnut} from 'react-chartjs-2';
import firebase from './firebase.js';
import Customization from './Customization';
import { Spinner } from 'react-bootstrap';
import './Analytics.css';
import growth from '../images/analytics_img/growth.png';
import decrease from '../images/analytics_img/statistics.png';
import noChange from '../images/analytics_img/minus.png';

class Analytics extends React.Component {
    constructor() {
        super();
        this.state = {
            regimen:[],
            date:['05/10/19', '05/11/19', '05/12/19', '05/13/19', '05/14/19', '05/15/19'],
            acne:[2, 2.2, 2.1, 1.8, 1.76, 1.65],
            health:[12.3, 10.2, 11, 9.34, 7.75, 8.2],
            stain:[37.2, 37.54, 37.13, 38, 37.2, 38.42],
            isLoaded:false,
            acneDiff:0,
            healthDiff:0,
            stainDiff:0,
            avgImg:[growth, noChange, decrease]
        }
    }

    async componentDidMount() {
        let dates = this.state.date;
        let acne = this.state.acne;
        let health = this.state.health;
        let stain = this.state.stain;
        let gotData = (data) => {
            let x = data.val();
            for (let n in x) {
                let date = x[n]
                for(let key in date) {
                    if(key != "questionnaire") {
                        acne.push(date[key].acne);
                        health.push(date[key].health);
                        stain.push(date[key].stain);
                    }
                }
            }
            let acneDiff = acne[acne.length - 1] - acne[0];
            acneDiff = acneDiff.toFixed(2);
            let healthDiff = health[health.length - 1] - health[0];
            healthDiff = healthDiff.toFixed(2);
            let stainDiff = stain[stain.length - 1] - stain[0];
            stainDiff = stainDiff.toFixed(2);
            try {
                let keys = Object.keys(data.val());
                for(let i = 0; i < keys.length; i++) {
                    dates.push(keys[i])
                }
            }   
            catch(err) {

            }
            this.setState({
                date:dates,
                acne:acne,
                health:health,
                stain:stain,
                isLoaded:true,
                acneDiff:acneDiff,
                healthDiff:healthDiff,
                stainDiff:stainDiff
            });
        }
    
        let errData = (err) => {
            console.log(err);
        }
        const user = firebase.auth().currentUser.uid;
        const ref = firebase.database().ref("users/" + user + '/Results');
        ref.on("value", gotData, errData);

    }

    render() {
        const dataAcne = {
            labels: this.state.date,
            datasets: [
                {
                    label: 'Acne',
                    fill:false,
                    lineTension: 0.1,
                    backgroundColor: '#e74c3c',
                    borderColor: '#DE5134',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#95a5a6',
                    pointBackgroundColor: '#ecf0f1',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#ecf0f1',
                    pointHoverBorderColor: '#95a5a6',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.acne
                }
            ]
        };

        const dataHealth = {
            labels: this.state.date,
            datasets: [
                {
                    label: 'Skin Health',
                    fill:false,
                    lineTension: 0.1,
                    backgroundColor: '#6975A7',
                    borderColor: '#3498db',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#95a5a6',
                    pointBackgroundColor: '#ecf0f1',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#ecf0f1',
                    pointHoverBorderColor: '#95a5a6',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.health
                }
            ]
        };

        const dataStain = {
            labels: this.state.date,
            datasets: [
                {
                    label: 'Skin Stain',
                    fill:false,
                    lineTension: 0.1,
                    backgroundColor: '#e67e22',
                    borderColor: '#f39c12',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#95a5a6',
                    pointBackgroundColor: '#ecf0f1',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#ecf0f1',
                    pointHoverBorderColor: '#95a5a6',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.stain
                }
            ]
        };
        let acneImg = "";
        let healthImg = "";
        let stainImg = "";
        if(this.state.isLoaded) {
            if(this.state.acneDiff > 0) {
                acneImg = this.state.avgImg[0];
            } else if (this.state.acneDiff == 0) {
                acneImg = this.state.avgImg[1];
            } else if (this.state.acneDiff < 0) {
                acneImg = this.state.avgImg[2];
            }

            if(this.state.healthDiff > 0) {
                healthImg = this.state.avgImg[0];
            } else if (this.state.healthDiff == 0) {
                healthImg = this.state.avgImg[1];
            } else if (this.state.healthDiff < 0) {
                healthImg = this.state.avgImg[2];
            }

            if(this.state.stainDiff > 0) {
                stainImg = this.state.avgImg[0];
            } else if (this.state.stainDiff == 0) {
                stainImg = this.state.avgImg[1];
            } else if (this.state.stainDiff < 0) {
                stainImg = this.state.avgImg[2];
            }
        }

        return (
            <div className="analyticsContainer">
                <Customization />
                <div className="headerContainer">
                    <h3>Skin Progress</h3>
                    {   
                        this.state.isLoaded &&
                        <div className="avgContainer">
                            <div className="avg">
                                <img src={acneImg}/>
                                <h4>Acne Change</h4>
                                <h4>{this.state.acneDiff}</h4>
                            </div>
                            <div className="avg">
                                <img src={healthImg}/>
                                <h4>Health Change</h4>
                                <h4>{this.state.healthDiff}</h4>
                            </div>
                            <div className="avg">
                                <img src={stainImg}/>
                                <h4>Stain Change</h4>
                                <h4>{this.state.stainDiff}</h4>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {this.state.isLoaded && <Line data={dataAcne} />}
                </div>
                <div>
                    {this.state.isLoaded && <Line data={dataHealth} />}
                </div>
                <div>
                    {this.state.isLoaded && <Line data={dataStain} />}
                </div>
                <Recommend />
            </div>
        );
    }
}

export default Analytics;