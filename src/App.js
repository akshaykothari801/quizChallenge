import React from 'react';
import data from './questions';
import Answers from './components/answers';
import LastPage from './components/lastPage'
import {ProgressBar} from 'react-bootstrap';
import Rating from 'react-rating';
import './App.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            totalCount: data.length,
            isAnswered: false,
            score: 0,
            difficulty: 0,
            resultPage: false,
        };
    }

    renderCurrentQuestion = (questionIndex) => {
        /* Here we are randomly generate number between 0 to 3 because there are four options
           After that we storing found position data in currentQuestion
        */
        let currentQuestion = data[questionIndex];
        let correctAnsPosition = Math.floor(Math.random() * (currentQuestion.incorrect_answers.length > 1 ? 4 : 2));
        /* We are making one array by combining incorrect and correct options
           We using slice because correct question position is randomly decide
         */
        currentQuestion.incorrect_answers.splice(correctAnsPosition, 0, currentQuestion.correct_answer);
        let difficulty = currentQuestion.difficulty === 'hard' ? 3 : currentQuestion.difficulty === 'medium' ? 2 : 1;
        this.setState({
            question: decodeURIComponent(currentQuestion.question),
            category: decodeURIComponent(currentQuestion.category),
            difficulty,
            answers: currentQuestion.incorrect_answers,
            correct: correctAnsPosition,
            questionIndex,
        });
    }

    componentDidMount() {
        /* It will be render first question on screen */
        let {questionIndex} = this.state;
        this.renderCurrentQuestion(questionIndex);
    }

    renderNextQuestion = () => {
        /* This method will be used to change the question
           We are increasing the questionIndex and based upon that rendering next question
        */
        let {questionIndex, totalCount} = this.state;
        /* This will be called when user attempted all the questions */
        if (questionIndex + 1 === totalCount) {
            this.handleLastQuestion()
        } else {
            this.renderCurrentQuestion(questionIndex + 1);
            this.setState({
                showButton: false,
                isAnswered: false,
                questionIndex: questionIndex + 1,
            });
        }

    }

    toggleShowNextButton = () => {
        this.setState({
            showButton: true,
            isAnswered: true
        })
    }

    handleIncreaseScore = () => {
        const {score}  = this.state
        this.setState({
            score: score + 1
        });
    }

    handleLastQuestion = () => {
        this.setState({
            resultPage: true
        })
    }

    render() {
        let {questionIndex, totalCount, question, answers, correct, showButton, isAnswered, score, category, difficulty, classNames, resultPage} = this.state;
        let currentQuestion = questionIndex + 1;

        let barMinimumScore = (100 * score) / data.length;

        let scoreVariable = isAnswered ? (100 * score) / (currentQuestion) : ((100 * score) / (questionIndex));
        let percentageScore = Math.round(!isNaN(scoreVariable) ? scoreVariable : (100 * score) / (currentQuestion));
        let barScore = percentageScore - barMinimumScore;

        let maxScore = Math.round(isAnswered ? ((100 * (score + data.length - currentQuestion)) / data.length) : ((100 * (score + data.length - questionIndex)) / data.length));
        let barMaxScore = maxScore - (barMinimumScore + barScore);

        return (
            <div className="container p-0">
                <div className="main-que">
                    {resultPage ? <LastPage score={percentageScore}/> :
                        <div className="h-100">
                            <div className="process-bar"><ProgressBar now={(100 * currentQuestion) / data.length}/>
                            </div>
                            <div className="main-que-section">
                                <div className="question-display">
                                    <div className="container">
                                        <div id="question">
                                            <h2 className="question-heading">Question {currentQuestion}/{totalCount}</h2>
                                            <p className='m-0 category-wrapper text-muted'>{category}</p>
                                            <Rating
                                                placeholderRating={difficulty}
                                                placeholderSymbol="fa fa-star fa-1x"
                                                readonly
                                                emptySymbol="fa fa-star-o fa-1x"
                                                fullSymbol="fa fa-star fa-1x"
                                            />
                                            <p className="question-tag my-4">{question}</p>
                                        </div>
                                        <Answers answers={answers} correct={correct}
                                                 totalCount={totalCount}
                                                 toggleShowNextButton={this.toggleShowNextButton}
                                                 showButton={showButton}
                                                 isAnswered={isAnswered} increaseScore={this.handleIncreaseScore}
                                                 classNames={classNames}
                                                 renderNextQuestion={this.renderNextQuestion}
                                                 currentQuestion={currentQuestion}
                                                 isLast={currentQuestion === data.length}
                                                 handleLastQuestion={this.handleLastQuestion}
                                        />

                                    </div>
                                </div>
                                <div className="score-bar">
                                    <div className="score-bar-status">
                                        <p>Score: {percentageScore}%</p>
                                        <p>Max score: {maxScore}%</p>
                                    </div>
                                    <div className="max-score">
                                        <ProgressBar>
                                            <ProgressBar now={barMinimumScore} key={1}/>
                                            <ProgressBar now={barScore} key={2}/>
                                            <ProgressBar now={barMaxScore} key={3}/>
                                        </ProgressBar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
        );
    }
};

export default Main;
