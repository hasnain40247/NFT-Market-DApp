import React, { useEffect } from "react";
import LoadScene from "./LoadScene";
import { Link } from "react-router-dom";

const Section = () => {
  useEffect(() => {
    LoadScene();
  }, []);

  return (
    <div className="introsection">
      <canvas id="void" />
      <img className="shuttle" src="shuttle.png" width={60} height={60} />

      <h1 className="title">DIVE INTO THE GALAXY OF NFTS.</h1>
      <Link to="/dive" class="button">
        ENTER
      </Link>
    </div>
  );
};

export default Section;
