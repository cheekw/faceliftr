import React, { Component } from 'react';
import questions from '../questions/questions.json'
import test from '../images/Questionnaire_images/skin_type/question.png'
import './Questionnaire.scss'

class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionTemplate:questions.questionTemplate
        }
    }

    render() {
        const questionItems = this.state.questionTemplate.map(obj => {
            return(
                <QuestionnaireBody questionItem={obj} />
            );
        });

        return(
            <div className="QuestionnaireContainer">
                <div className="Questionnaire">
                    {questionItems}
                </div>
                <div className="QuestionnaireButton">
                    <div className="Button">Next</div>
                </div>
            </div>
        );
    }
}

class QuestionnaireBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const choices = this.props.questionItem.choices.map(choice => {
            return (
                <li><QuestionnaireItem choice={choice}/></li>
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
        this.state = {
            logo:"",
            title:""
        }
    }

    componentWillMount() {
        this.setState({
            logo:this.props.choice.logo,
            title:this.props.choice.title
        })
    }

    render() {
        return(
            <div className="QuestionnaireItem">
                <img alt="Choice" src={test} />
                <h3>{this.state.title}</h3>
            </div>
        );
    }
}

export default Questionnaire