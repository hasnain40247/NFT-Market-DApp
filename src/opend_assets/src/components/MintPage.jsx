import React from "react";
import DiveNavbar from "./DiveNavbar";
import DiveSection from "./DiveSection";
import MintBackDrop from "./MintBackDrop";
import Minter from "./Minter";

const MintPage = () => {
  return (
    <>
      <DiveNavbar to={"/about"} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
       
        <div
          className="mintForm"
          style={{
            height: "auto",
            
            padding:"10px",
            width: "50%",
            position: "absolute",
         
          }}
        >

<Minter/>

        </div>
        <MintBackDrop />
      </div>
    </>
  );
};
export default MintPage;
