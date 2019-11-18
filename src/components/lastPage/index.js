import React, {Component} from 'react';
import './style.css'

class LastPage extends Component {
    render() {
        const {score} = this.props;
        return (
            <div className="main-wrap">
                <h1 className="resule-heading">Thank You!!</h1>
                <h4 className="result-score">Your Score is {score}%</h4>
            </div>
        );
    }
}

export default LastPage;
