import React from 'react';
import Recommend from './Recommend';
import {Line, Doughnut} from 'react-chartjs-2';
import firebase from './firebase.js';
import Customization from './Customization';
import './Analytics.css';
import growth from '../images/analytics_img/growth.png';
import decrease from '../images/analytics_img/statistics.png';
import noChange from '../images/analytics_img/minus.png';
import {Button, Modal} from 'react-bootstrap';

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
            avgImg:[growth, noChange, decrease],
            showSkinModal:false
        }
    }

    async componentDidMount() {
        let dates = this.state.date;
        let acne = this.state.acne;
        let health = this.state.health;
        let stain = this.state.stain;
        let gotData = (data) => {
            let x = data.val();
            console.log(x)
            for (let n in x) {
                let scan = x[n]
                acne.push(scan.acne);
                health.push(scan.health);
                stain.push(scan.stain);
                
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

        let user = 0;
        if (firebase.auth().currentUser) {
            user = firebase.auth().currentUser.uid;
            const ref = firebase.database().ref("users/" + user + '/Face Scans');
            ref.on("value", gotData, errData);
        }
    }

    render() {
        const dataAcne = {
            labels: this.state.date,
            datasets: [
                {
                    label: 'Acne Probability',
                    fill: false,
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
                    label: 'Skin Health Abnormalities',
                    fill: false,
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
                    label: 'Skin Stain Probability',
                    fill: false,
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
                acneImg = this.state.avgImg[2];
            } else if (this.state.acneDiff == 0) {
                acneImg = this.state.avgImg[1];
            } else if (this.state.acneDiff < 0) {
                acneImg = this.state.avgImg[0];
            }

            if(this.state.healthDiff > 0) {
                healthImg = this.state.avgImg[2];
            } else if (this.state.healthDiff == 0) {
                healthImg = this.state.avgImg[1];
            } else if (this.state.healthDiff < 0) {
                healthImg = this.state.avgImg[0];
            }

            if(this.state.stainDiff > 0) {
                stainImg = this.state.avgImg[2];
            } else if (this.state.stainDiff == 0) {
                stainImg = this.state.avgImg[1];
            } else if (this.state.stainDiff < 0) {
                stainImg = this.state.avgImg[0];
            }
        }

        let openSkinInfo = () => {
            this.setState({
                showSkinModal:true
            });
        }

        let handleCloseModal = () => {
            this.setState({
                showSkinModal:false
            });
        }

        return (
            <div className="analyticsContainer">
                {this.state.showSkinModal && <Modal show={this.state.showSkinModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Analytics: Skin Progress Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Change in scores</h4>
                        <p>
                            <strong>The LOWER your score the better your skin is. </strong>
                            The up or down arrows are determined by the change from your first face capture
                            to your most recent face capture.
                        </p>
                        <h4>Graphs</h4>
                        <p>
                            The graphs visually communicate your skin progress for each day you face captured. These
                            graphs represent acne probability, skin health abnormalities, and skin stain probability.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleCloseModal}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>   }
                <Recommend />
                <br />
                <Customization />
                <div className="headerContainer">
                    <h3>Skin Progress</h3>
                    <Button className="info" variant="secondary" onClick={openSkinInfo}>i</Button>
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
            </div>
        );
    }
}

export default Analytics;