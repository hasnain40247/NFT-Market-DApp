import React from "react"
const Label=({price})=>{
return(
    <div className="label">
        <h5 style={{
            padding:"0px",
            margin:"0px",
            fontFamily:"Rokkitt",
            fontWeight:"normal"
        }}>{price} CHILI</h5>
    </div>
)
}
export default Label