import React from "react";


const Footer=()=>{
    var date=new Date().getFullYear()
    return(
   <div className="footerDiv">
     <footer className="footerText">Copyright &#169; Hasnain's Chili {date}  </footer>
   </div>

    )
}

export default Footer