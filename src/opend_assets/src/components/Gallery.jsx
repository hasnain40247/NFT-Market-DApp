import React, { useEffect } from "react";
import Item from "./Item";

import React from "react";
import DiveNavbar from "./DiveNavbar";
import DiveSection from "./DiveSection";
import Footer from "./Footer";
import Clouds from "./Clouds";

import {opend} from "../../../declarations/opend"
import CURRENT_USER_ID from "../index";
import MyNFT from "./MyNFT";

const Gallery = () => {


  return (
    <>
      <DiveNavbar to={"/about"} />
      <div className="gradient"></div>
      <h1 className="absoluteTitle">YOUR NFTS</h1>

      <DiveSection />

      <Clouds />

      <MyNFT />
      

      <Footer />
    </>
  );
};
export default Gallery;

