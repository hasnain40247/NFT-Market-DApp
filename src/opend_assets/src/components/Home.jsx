import React from "react";
import Footer from "./Footer";
import Section from "./Section";
import Test from "./Clouds";
import DiveNavbar from "./DiveNavbar";

function Home() {
  return (
    <>
      <DiveNavbar hide={1} to={"/about"} />
      <Section />
      <Footer />
    </>
  );
}
export default Home;
