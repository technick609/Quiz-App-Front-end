import React from 'react';
import clsx from 'clsx';

const Button = (props) => {

const {children, size, loading, disabled, onClick = () => {}, loadingText="Loading...", icon, iconPosition} = props

const buttonClass = clsx('btn', size, {loading, disabled});
  return (
    <button type="submit" className={buttonClass} onClick={onClick}>{loading ? loadingText : children}{!loading  && iconPosition === "right" && icon}</button>
  )
}

export default Button