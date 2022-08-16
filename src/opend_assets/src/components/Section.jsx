import React, { useEffect } from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";
import AnchorLink from "react-anchor-link-smooth-scroll";
import LoadScene from "./LoadScene";

const Section = () => {
  useEffect(() => {
    LoadScene();
  }, []);

  return (
    <div className="introsection">
      <canvas id="void" />
      <img className="shuttle" src="shuttle.png" width={60} height={60} />

      <h1 className="title">DIVE INTO THE GALAXY OF NFTS.</h1>
      <a href="/dive" class="button">
        ENTER
      </a>
    </div>
  );
};

export default Section;
