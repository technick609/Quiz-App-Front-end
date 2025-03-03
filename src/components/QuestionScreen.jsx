import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Card from './UI/Card';
import Button from './UI/Button';
import QuizLogo from './UI/QuizLogo';
import ProgressBar from './UI/ProgressBar';
import CorrectCheckmark from '../assets/white-checkmark.svg';
import IncorrectCheckmark from '../assets/incorrect-cross.svg';
import NextArrowIcon from '../assets/chevron-left-rounded.svg';
import clsx from 'clsx';
import useQuestionContext from '../hooks/useQuestionContext';
import validateAnswerApi from '../API/ValidateAnswers';
import handleError from '../utils/HandleError';

function NextArrow(){
    return <img src={NextArrowIcon} alt="Next Question" />
}


const QuestionScreen = (props) => {

//Static question data
// const activeQuestion = {
//     _id: "question-1",
//     question: "what is the capital of france?",
//     options: [
//         {id: "option-1", value: "Berlin"},
//         {id: "option-2", value: "Madrid"},
//         {id: "option-3", value: "Paris"},
//         {id: "option-4", value: "Rome"}
//     ],
//     correctedOptionId: "option-3"
// }


// const activeQuestionNumber = 1;
// const totalQuestions = 5;
// const userSelectedOption = "option-3";
// const hasAttempted = true;
// const isFinalQuestion = activeQuestionNumber === totalQuestions;
// const isAnswerCorrect = userSelectedOption === activeQuestion.correctedOptionId;


const {showResultScreen} = props;
const [loading, setLoading] = useState(false);
const {activeQuestionNumber, activeQuestion, activeNextQuestion, updateQuestionStatus, totalQuestions} = useQuestionContext();


// track selected options
const [userSelectedOption, setUserSelectedOption] = useState("");
const hasAttempted = Boolean(userSelectedOption);


// Reset selection on question change
useEffect(()=>{
    setUserSelectedOption("");
}, [activeQuestion._id]);

// Checking if it's last question
const isFinalQuestion = useMemo(()=> activeQuestionNumber === totalQuestions, [activeQuestionNumber, totalQuestions]);

// Handling the API response
const handleResponse = useCallback((responseData) =>{
    const isAnswerCorrect = responseData.status === 1;
    updateQuestionStatus(isAnswerCorrect);
}, [updateQuestionStatus]);


const handleClick = useCallback((selectedOption) => {
    setUserSelectedOption(selectedOption.id);
    validateAnswerApi(activeQuestion._id, selectedOption, handleResponse, handleError, setLoading);
}, [activeQuestion._id, handleResponse])

  return (
    <section className="question-section">
        <QuizLogo />
        <ProgressBar />
        <div className="question-content">
            <Card className='question-card'>
                <div className="question-number">
                   {activeQuestionNumber}/{totalQuestions} 
                </div>
                <p className="question-text">{activeQuestion.question}</p>
                <div className="question-options">
                    {activeQuestion.options.map((opt)=>{
                        // Check if selected option is selected by user
                        const isThisSelected = opt.id === userSelectedOption;
                        // Check if selected option is correct or incorrect
                        const isOptionCorrect = isThisSelected && activeQuestion.isAnswerCorrect;
                        const isOptionIncorrect = isThisSelected && !activeQuestion.isAnswerCorrect;
                        return(<button className={clsx('option', !hasAttempted && 'not-answered', isOptionCorrect && 'correct-answer', isOptionIncorrect && 'incorrect-answer')} key={activeQuestion._id + "-" + opt.id} disabled={hasAttempted} onClick={() => handleClick(opt)} >{opt.value}{isThisSelected ? (<span className={clsx(isOptionCorrect && 'correct-radio', isOptionIncorrect && 'incorrect-radio')}>{isOptionCorrect && (<img src={CorrectCheckmark} alt='correct answer' />)}
                        {isOptionIncorrect && (<img src={IncorrectCheckmark} alt='incorrect answer' />)}</span>) : (<span className="unattempted-radio" />)}</button>)
                    })}
                </div>
                {isFinalQuestion? (<Button disabled={!hasAttempted} onClick={showResultScreen} >Submit</Button>) : (<Button icon={<NextArrow />} iconPosition="right" onClick={activeNextQuestion} disabled={!activeQuestion.hasAttempted} >Next</Button>)}
            </Card>
        </div>
    </section>
  )
}

export default QuestionScreen