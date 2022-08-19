import React from "react";
import DiveNavbar from "./DiveNavbar";
import DiveSection from "./DiveSection";
import Footer from "./Footer";
import Clouds from "./Clouds";

import MyNFT from "./MyNFT";
import Discover from "./Discover";

const DiveHome = () => {
  return (
    <>
      <DiveNavbar to={"/about"} />
      <div className="gradient"></div>
      <h1 className="absoluteTitle">HOME</h1>
      <DiveSection />
      <Clouds />
      <Discover />
      <Footer />
    </>
  );
};
export default DiveHome;
