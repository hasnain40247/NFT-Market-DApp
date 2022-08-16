import React from "react"
import Clouds from "./Clouds"
import DiveNavbar from "./DiveNavbar"



const InfoSection = () => {
  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      justifyContnet:"center",
      alignItems:"center"
    }}>
      <DiveNavbar hide={1} to={"/"} />
      <div className="aboutSec">


        <img alt="hasnain" src="hasnain.png" className="hasnain" height={150} width={150} style={{ borderRadius: "500px" }} />

        <h1> <span>
        <img alt="galaxy" src="galaxy.png" className="hasnain" height={50} width={50}  />
          
          </span> ABOUT</h1>
        <h6>

          My name is Hasnain and I like to indulge myself into learning and creating as much as I can.
          This side-project is just another attempt to do exactly that.
          This website is meant to showcase an <span className="highlight" > LSTM</span> capabilities on a completely automatically collection of historic stock data with the help of web crawlers. The web crawler crawls through multiple subreddits and filters out comments from popular posts that talk about stocks. These comments are then sent to a  <span className="highlight">sentiment analysis</span> module which is </h6>
      </div>
      <Clouds/>
      
      
    </div>
  )
}

export default InfoSection


