import React, { useEffect } from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";
import AnchorLink from "react-anchor-link-smooth-scroll";
import LoadScene from "./LoadScene";
import LoadSceneDecrease from "./LoadSceneDecrease";

const Clouds = () => {
  useEffect(() => {
    LoadSceneDecrease();
  }, []);

  return (
    <div className="introsection2">
      <canvas id="void22"></canvas>
    </div>
  );
};

export default Clouds;
