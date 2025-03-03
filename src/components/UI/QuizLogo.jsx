import React from 'react'
import Logo from '../../assets/quiz-logo.svg'

const QuizLogo = ({size = "small"}) => {
    const allSizes = {
        small: 168,
        large: 306,
    };

  return (
    <img src={Logo} alt="Quiz Logo" width={allSizes[size]} />
  )
}

export default QuizLogo