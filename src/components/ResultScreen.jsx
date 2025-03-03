import React, { useState, useCallback } from 'react'
import QuizLogo from './UI/QuizLogo';
import Trophy from '../assets/trophy.png';
import Button from './UI/Button'; 
import RestartIcon from '../assets/restart-icon.svg';
import Card from './UI/Card';
import useQuestionContext from '../hooks/useQuestionContext';
import fetchQuestionsApi from '../API/FetchQuestions';
import handleError from '../utils/HandleError';


function Restart(){
    return <img src={RestartIcon} alt="" />
}

const ResultScreen = (props) => {

const {showQuestionScreen} = props;
const {totalQuestions, correctAns, processQuestion} = useQuestionContext();

const [loading, setLoading] = useState(false);

// const totalQuestions = 10;
// const correctAnswers = 8;
let feedBackText;
const percentage = (correctAns / totalQuestions) * 100;


const handleResponse = useCallback(function(responseData){
  console.log(responseData.questions);
  processQuestion(responseData.questions);
  // change screen
  showQuestionScreen();
}, [processQuestion, showQuestionScreen]);

const beginQuiz = useCallback(() => {
    fetchQuestionsApi(setLoading, handleResponse, handleError);
}, [handleResponse])

if(percentage >= 90){
    feedBackText = "!!Excellent!!";
}
else if (percentage >= 70){
    feedBackText = "!Good Job!";
}
else if (percentage >= 50){
    feedBackText = "You Did Okay...";
}
else{
    feedBackText = "You Could Do Better!";
}

  return (
    <section className='result-section'> 
        <QuizLogo size='large' />
        <Card className='result-card'>
        <div className="result-icon-wrapper">
            <img src={Trophy} />
        </div>
        <h1 className="result-text">{feedBackText}</h1>
        <div className="result-details">
            <span className="correct-answers">{correctAns}</span>
            <p className='total-questions'>
                Questions <br />
                out of <span className="weight-700">{totalQuestions}</span>
            </p>
        </div>
        <Button icon={<Restart />} loading={loading} loadingText="Restarting..." iconPosition="right" onClick={beginQuiz} >Restart</Button>
        </Card>
    </section>
  )
}

export default ResultScreen