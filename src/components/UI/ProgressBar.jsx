import React, { useMemo } from 'react';
import useQuestionContext from '../../hooks/useQuestionContext';
import clsx from 'clsx';

const ProgressBar = () => {

const {activeQuestionNumber, totalQuestions} = useQuestionContext();

//  progress percentage calculation
const progressText = useMemo(() =>
  // instead of .tofixed(2) I used Math.floor and getting te same result
  `${Math.floor((activeQuestionNumber / totalQuestions)*100)}%`
, [activeQuestionNumber, totalQuestions]);


const isFinalQuestion = useMemo(() => 
  activeQuestionNumber === totalQuestions
, [activeQuestionNumber, totalQuestions]);

  return (
    <>
      <progress value={activeQuestionNumber} max={totalQuestions} className={clsx("progress-bar", isFinalQuestion && "final-question")}>{progressText}</progress>
    </>
  )
}

export default ProgressBar