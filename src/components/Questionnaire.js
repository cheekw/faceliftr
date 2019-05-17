import React, { Component } from 'react';
import questions from '../questions/questions.json'
import 'bootstrap/dist/css/bootstrap.css';
import test from '../images/Questionnaire_images/skin_type/oilyskin.png'
import './Questionnaire.css'
import firebase from './firebase'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionTemplate:questions.questionTemplate,
            answer:[],
            index:0
        }
    }

    getData = (index, answer) => {
        this.state.answer[this.state.index] = answer;
    }

    previous = () => {
        let update = this.state.index;
        if(update - 1 >= 0) {
            this.setState({
                index:update - 1
            });
        }
    }

    next = () => {
        let update = this.state.index;
        if(update + 1 < this.state.questionTemplate.length) {
            this.setState({
                index:update + 1
            });
        } else {
            var database = firebase.database();
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = mm + '\\' + dd + '\\' + yyyy;
            var ref = database.ref('users/' + firebase.auth().currentUser.uid + "/Results/" + today + "/questionnaire");
            var data = {};
            for(let i = 0; i < this.state.answer.length; i++) {
                data["question " + i] = this.state.answer[i];
            }
            ref.set(data);
            window.confirm("Sent to database.")
        }
    }


    render() {
        let obj = this.state.questionTemplate[this.state.index];
        let questionItems = <QuestionnaireBody sendData={this.getData} questionItem={obj}/>;

        return(
            <div className="QuestionnaireContainer">
                <div className="Questionnaire">
                    {questionItems}
                </div>
                <div className="row mx-auto self-center text-center btn-group btn-group-lg">
                    <div onClick={this.previous} className="btn btn-primary btn-lg">Previous</div>
                    <div onClick={this.next} className="btn btn-primary btn-lg">Next</div>
                </div>
            </div>
        );
    }
}

class QuestionnaireBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            answer:'',
        }
    }

    getData = (index, answer) => {
        this.props.sendData(index, answer);
    }

    render() {
        let choices = this.props.questionItem.choices.map((choice, index) => {
            return (
                <li><QuestionnaireItem key={index} sendData={this.getData} choice={choice}/></li>
            );
        });
        return(
            <div className="QuestionnaireBody">
                <h2>{this.props.questionItem.question}</h2>
                <ul className="columns">
                    {choices}
                </ul>
            </div>
        );
    }
}

class QuestionnaireItem extends Component {
    constructor(props) {
        super(props);
    }

    sendData = (event) => {
        let el = document.getElementById(this.props.choice.title);
        let otherChoices = document.getElementsByClassName("QuestionnaireItem");
        let arr = Array.from(otherChoices);
        arr.map(choice => {
            choice.setAttribute("style", "filter:grayscale(100%");
        });
        el.setAttribute("style", "filter:grayscale(0)");
        this.props.sendData(1, this.props.choice.title);
    }

    clear() {
        let otherChoices = document.getElementsByClassName("QuestionnaireItem");
        let arr = Array.from(otherChoices);
        arr.map(choice => {
            choice.setAttribute("style", "filter:grayscale(100%");
        });
    }

    render() {
        this.clear();
        return(
            <div id={this.props.choice.title} onClick={this.sendData} className="QuestionnaireItem">
                <img alt="Choice" src={process.env.PUBLIC_URL + this.props.choice.logo} />
                <h3>{this.props.choice.title}</h3>
            </div>
        );
    }
}

export default Questionnaire