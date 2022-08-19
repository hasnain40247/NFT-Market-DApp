import React, { useState } from "react";
import {
  NavLink,
  Link,
  useLocation,
} from "../../../../node_modules/react-router-dom/index";

const allPages = [
  {
    href: "/dive",
    title: "Discover",
  },
  {
    href: "/mint",
    title: "Mint",
  },
  {
    href: "/mynfts",
    title: "My NFTs",
  },
  {
    href: "https://osphh-syaaa-aaaal-aa3ja-cai.raw.ic0.app/",
    title: "ChiliCoin",
  },
];

const DiveNavbar = (props) => {
  const to = props.to;
  const hide = props.hide;

  hide === 1 ? (
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
  ) : (
    <nav className="navbar">
      <Link to={to}>
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
        {allPages.map((page, index) => {
          return (
            <NavLink
              key={index}
              to={page.href}
              style={({ isActive }) => ({
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#ff3e84",
                marginRight: "30px",
                cursor: "pointer",
                textDecoration: isActive ? "underline" : "none",
              })}
            ></NavLink>
          );
        })}

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
};

export default DiveNavbar;
