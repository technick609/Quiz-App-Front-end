import React, { useCallback, useState } from 'react'
import QuizLogo from "./UI/QuizLogo";
import QuestionBubble from "../assets/question-bubble.png";
import GreenCheckMark from "../assets/check-circle-green.svg";
import Card from "./UI/Card"
import Button from './UI/Button';
import useQuestionContext from '../hooks/useQuestionContext';
import fetchQuestionsApi from '../API/FetchQuestions';
import handleError from '../utils/HandleError';

const WelcomeScreen = (props) => {

const {showQuestionScreen} = props;
const{processQuestion} = useQuestionContext();
const [loading, setLoading] = useState(false);

const handleResponse = useCallback(function(responseData){
  console.log(responseData.questions);
  processQuestion(responseData.questions);
  // change screen
  showQuestionScreen();
}, [processQuestion, showQuestionScreen]);


const beginQuiz = useCallback(() => {
  fetchQuestionsApi(setLoading, handleResponse, handleError);
}, [handleResponse])


  return (
    <section className="welcome-section">
      <QuizLogo  size="large" />
      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={QuestionBubble} width={172} alt="" />
          <h2>Are you Ready?</h2>
          <h3>Let's see how many questions you can answer</h3>
        </div>
        <ul className='welcome-card-list'>
          <li className='list-item'><img src={GreenCheckMark} alt="" />There are 30 Questions</li>
          <li className='list-item'><img src={GreenCheckMark} alt="" />You need to pick 1 answer</li>
        </ul>
        <Button size="large" onClick={beginQuiz} loading={loading} loadingText='Starting the Quiz'>I'm Ready - Start the Quiz</Button>
      </Card>
    </section>
  )
}

export default WelcomeScreen