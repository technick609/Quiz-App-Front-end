// This file provides the context to all components

// store the questions received from api
// Track the active questions
// Allow moving to the next question
// Keep record of correct ans
// Update the status of questions to keep track whether attempted options are corect or not

// useState: Managing the state
// --questions: store the list of questions
// --activeQuestionId: stores the current question's ID


// Derived value using useMemo: 
// activeQuestion
// activeQuestionNumber
// totalQuestion
// correctAnswers


// Helper function as useCallback:
// updateQuestionStatus()
// activeNextQuestion()
// processQuestion()


import React, {useMemo, useState, useCallback} from 'react'
import QuestionContext from './QuestionContext'

const QuestionProvider = ({children}) => {

// state to store the question
const [questions, setQuestions] = useState([]);

// store the active questions
const [activeQuestionId, setActiveQuestionId] = useState("");


// process question:


const activeQuestion = useMemo(() => questions.find((question) => question._id === activeQuestionId), [questions, activeQuestionId]);


// find the question number
const activeQuestionNumber = useMemo(() => questions.findIndex((question) => question._id === activeQuestionId) + 1, [activeQuestionId, questions]);


// find the total questions
const totalQuestions = useMemo(() => questions.length, [questions.length]);


// updates the question data within it
const updateQuestionStatus = useCallback((isAnswerCorrect) => setQuestions((previousQuestions) => previousQuestions.map((question) =>
     question._id === activeQuestionId ? {...question, hasAttempted: true, isAnswerCorrect} : question)), [activeQuestionId]);


// updates the active state of the question
const activeNextQuestion = useCallback(() =>{
    const currentIndex = questions.findIndex(
        (question)=> question._id === activeQuestionId
    );
    if(currentIndex !== -1 && currentIndex + 1 < questions.length){
        setActiveQuestionId(questions[currentIndex + 1]._id);
    }
}, [activeQuestionId, questions]);



// calculate the correct answered questions by the user
const correctAns = useMemo(() => {
    const numOfCorrectAns =  questions.filter((question) => question.isAnswerCorrect).length;
    return numOfCorrectAns;
}, [questions]);


const processQuestion = useCallback(function (questionApiResponse){
    setQuestions(questionApiResponse.map((question) => ({
        ...question,
        hasAttempted: false,
        isAnswerCorrect: false,
    }))
);
setActiveQuestionId(questionApiResponse[0]._id);
}, []);


const contextValue = useMemo(() =>({
    processQuestion,
    activeQuestionNumber,
    activeQuestion,
    activeNextQuestion,
    updateQuestionStatus,
    totalQuestions,
    correctAns,
}), [ processQuestion,
    activeNextQuestion,
    activeQuestionNumber,
    activeQuestion,
    updateQuestionStatus,
    totalQuestions,
    correctAns]);

  return (
    <QuestionContext.Provider value={contextValue}>
        {children}
    </QuestionContext.Provider>
  )
}

export default QuestionProvider