import React from "react"
const Button=({handleClick,title})=>{

    return(
        <span onClick={handleClick} className="mintButton sellButton">
        {title}
      </span>
    )

}

export default Button