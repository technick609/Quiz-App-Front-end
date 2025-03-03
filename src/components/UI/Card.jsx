import React from 'react'
import clsx from "clsx";

const Card = ({className, children}) => {
  return (
    <div className={clsx("card-wrapper", className)}>
      {children}
    </div>
  )
}

export default Card