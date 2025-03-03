import React, { useContext } from 'react'
import QuestionContext from '../store/QuestionContext'

const useQuestionContext = () => {
  return (
    useContext(QuestionContext)
  )
}

export default useQuestionContext