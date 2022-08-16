import React, { useState } from "react";
import { Link, useLocation } from "../../../../node_modules/react-router-dom/index";

const DiveNavbar = (props) => {
  const location = useLocation();
  const path=location["pathname"]


  const to=props.to
  const hide=props.hide
  if (hide === 1) {
    return (
      <nav className="navbar">
        <Link to={to}>
          <img className="logo" src="galaxy.png" height={60} width={60} />
        </Link>
        <h2
          style={{
            color: "white",
            fontSize: "2.5rem",
          }}
        >
          nftVoid.
        </h2>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <Link to={to} >
          <img className="logo" src="galaxy.png" height={60} width={60} />
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            href="/dive"
            style={{
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ff3e84",
              marginRight: "30px",
              cursor: "pointer",
              textDecoration: path == "/dive"?"underline":"none",
            }}
          >
            Discover
          </a>

          <a
            href="/mint"
            style={{
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ff3e84",
              marginRight: "30px",
              cursor: "pointer",
              textDecoration: path == "/mint"?"underline":"none",
            }}
          >
            Mint
          </a>
          <a
            href="/mynfts"
            style={{
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ff3e84",
              marginRight: "30px",
              cursor: "pointer",
              textDecoration: path == "/mynfts"?"underline":"none",
            }}
          >
            My NFTs
          </a>
          <a
            href="https://osphh-syaaa-aaaal-aa3ja-cai.raw.ic0.app/"
            style={{
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ff3e84",
              marginRight: "30px",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            ChiliCoin
          </a>

          <h2
            style={{
              color: "white",
              fontSize: "2.5rem",
            }}
          >
            nftVoid.
          </h2>
        </div>
      </nav>
    );
  }
};

export default DiveNavbar;
