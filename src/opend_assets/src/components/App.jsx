import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import DiveHome from "./DiveHome";
import InfoSection from "./InfoSection";
import MintPage from "./MintPage";
import Gallery from "./Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dive" element={<DiveHome />} />
      <Route path="/mint" element={<MintPage />} />
      <Route path="/mynfts" element={<Gallery />} />
      <Route path="/about" element={<InfoSection />} />
    </Routes>
  );
}

export default App;
