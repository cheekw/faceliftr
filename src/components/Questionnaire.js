import React, { Component } from 'react';
import questions from '../questions/questions.json'
import test from '../images/Questionnaire_images/skin_type/question.png'
import './Questionnaire.scss'
import firebase from './firebase'

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
        this.state.answer.push(answer);
    }

    next = () => {
        console.log(this.state.answer);
        let update = this.state.index;
        if(update + 1 < this.state.questionTemplate.length) {
            this.setState({
                index:update + 1
            });
        } else {
            var database = firebase.database();
            var ref = database.ref('users/' + firebase.auth().currentUser.uid + "/questionnaire");
            var data = {};
            for(let i = 0; i < this.state.answer.length; i++) {
                data["question " + i] = this.state.answer[i];
            }
            ref.set(data);
            console.log("Sent to database.")
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
                <div className="QuestionnaireButton">
                    <div onClick={this.next} className="Button">Next</div>
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
            answer:''
        }
    }

    getData = (index, answer) => {
        this.props.sendData(index, answer);
    }

    render() {
        let choices = this.props.questionItem.choices.map(choice => {
            return (
                <li><QuestionnaireItem sendData={this.getData} choice={choice}/></li>
            );
        });
        return(
            <div className="QuestionnaireBody">
                <h2>{this.props.questionItem.question}</h2>
                <ul>
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

    sendData = () => {
        this.props.sendData(1, this.props.choice.title);
    }

    render() {
        console.log(this.props);
        return(
            <div onClick={this.sendData} className="QuestionnaireItem">
                <img alt="Choice" src={test} />
                <h3>{this.props.choice.title}</h3>
            </div>
        );
    }
}

export default Questionnaire