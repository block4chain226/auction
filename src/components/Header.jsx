import React, { useContext, useState } from "react";
import Auth from "../components/Auth";
import AuthContext from "../context/AuthContext";
import "../index.scss";

const Header = () => {
  const { accounts, setShowMint } = useContext(AuthContext);
  return (
    <header className="header">
      <div className="header__logo">
        <h1>NFT Gallery</h1>
      </div>
      <div className="header__menu">
        <ul>
          <li>Home</li>
          <li>Activity</li>
          <li>Category</li>
          <li>Browse</li>
        </ul>
      </div>
      <div className="header__connect">
        {accounts != "" ? (
          <button onClick={() => setShowMint(true)}>Start Collection</button>
        ) : (
          <Auth />
        )}
      </div>
    </header>
  );
};

export default Header;
