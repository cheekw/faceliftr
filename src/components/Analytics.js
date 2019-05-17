import React from 'react';
import Recommend from './Recommend';
import {Line} from 'react-chartjs-2';
import firebase from './firebase.js';

class Analytics extends React.Component {
    constructor() {
        super();
        this.state = {
            regimen:[],
            date:['05/10/19', '05/11/19', '05/12/19', '05/13/19', '05/14/19', '05/15/19'],
            acne:[2, 2.2, 2.1, 1.8, 1.76, 1.65],
            health:[12.3, 10.2, 11, 9.34, 7.75, 8.2],
            stain:[37.2, 37.54, 37.13, 38, 37.2, 38.42],
            isLoaded:false
        }
    }

    async componentDidMount() {
        let dates = this.state.date;
        let acne = this.state.acne;
        let health = this.state.health;
        let stain = this.state.stain;
        let gotData = (data) => {
            console.log(data.val());
            let x = data.val();
            for (let n in x) {
                let date = x[n]
                for(let key in date) {
                    acne.push(date[key].acne);
                    health.push(date[key].health);
                    stain.push(date[key].stain);
                }
            }
            let keys = Object.keys(data.val());
            for(let i = 0; i < keys.length; i++) {
                dates.push(keys[i])
            }
            this.setState({
                date:dates,
                acne:acne,
                health:health,
                stain:stain,
                isLoaded:true
            });
            console.log(this.state.acne);
        }
    
        let errData = (err) => {
            console.log(err);
        }
        const user = firebase.auth().currentUser.uid;
        console.log(user)
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
        return (
            <div className="analyticsContainer">
                <div>
                    {this.state.isLoaded && <Line data={dataAcne} />}
                </div>
                <div>
                    {this.state.isLoaded && <Line data={dataHealth} />}
                </div>
                <div>
                    {this.state.isLoaded && <Line data={dataStain} />}
                </div>
                {/* <svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="#6975A7" rx="10" ry="10" x="0" y="0" height="100%" width="100%" />
                    <text fill="#ecf0f1" x="240" y="30">AUG 1ST, 2018 - MAR 24TH, 2019</text>
                    <text fill="#e74c3c"x="460" y="485">ACNE</text>
                    <text fill="#2ecc71" x="510" y="485">DARK SPOTS</text>
                    <text fill="#f1c40f" x="610" y="485">STAINS</text>
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
                </svg> */}
                
                <Recommend />
            </div>
        );
    }
}

export default Analytics;