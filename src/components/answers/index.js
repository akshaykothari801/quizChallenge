import React from 'react';
import './style.css';
import {Button} from "react-bootstrap";

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCorrect: false,
            classNames: []
        };
    }

    checkAnswer = (e) => {
        let {isAnswered, toggleShowNextButton} = this.props;

        if (!isAnswered) {
            let elem = e.currentTarget;
            let {correct, increaseScore} = this.props;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;
            if (answer === correct) {
                updatedClassNames[answer] = 'right';
                this.setState({
                    isCorrect: true
                });
                increaseScore();
            } else {
                    updatedClassNames[answer] = 'wrong';
                    updatedClassNames[correct] = 'right';
            }
            this.setState({
                classNames: updatedClassNames
            });
           toggleShowNextButton();
        }
    }

    resetClass = () => {
        let {isLast, handleLastQuestion} = this.props;

        this.setState({
            isCorrect: false,
            classNames: []
        });
        isLast && handleLastQuestion();
    }

    render() {
        let {answers, isAnswered, showButton, totalCount, currentQuestion} = this.props;
        let {classNames, isCorrect} = this.state;
        return (
            <div id="answers" className="mb-3">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div onClick={this.checkAnswer}
                             className={`${classNames.length ? classNames[0] : ''} answer-item mb-3`} data-id="0">
                            <span>{decodeURIComponent(answers !== undefined ? answers[0] : '')}</span></div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div onClick={this.checkAnswer} className={`${classNames[1] ? classNames[1] : ''} answer-item mb-3`}
                             data-id="1"><span>{decodeURIComponent(answers !== undefined ? answers[1] : '')}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {answers !== undefined && answers.length > 2 &&
                    <React.Fragment>
                        <div className="col-md-6 col-sm-12">
                            <div onClick={this.checkAnswer}
                                 className={`${classNames[2] ? classNames[2] : ''} answer-item mb-3`} data-id="2">
                                <span>{decodeURIComponent(answers !== undefined ? answers[2] : '')}</span></div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div onClick={this.checkAnswer}
                                 className={`${classNames[3] ? classNames[3] : ''} answer-item mb-3`} data-id="3">
                                <span>{decodeURIComponent(answers !== undefined ? answers[3] : '')}</span></div>
                        </div>
                    </React.Fragment>
                    }
                </div>
                {isAnswered &&
                <div className="text-center mt-md-5  display-correct"><span>{(isCorrect && currentQuestion <= totalCount) ? 'Correct!' : 'Sorry!'}</span>
                </div>}
                <div id="submit" className="mb-3 text-center">
                    {(showButton && currentQuestion <= totalCount)? <Button className="btn next-btn"
                                          onClick={() => {
                                              this.props.renderNextQuestion();
                                              this.resetClass();
                                          }}>{currentQuestion === totalCount ? 'Finish quiz' : 'Next question'}</Button> : null}
                </div>
            </div>
        );
    }
}

export default Answers;
