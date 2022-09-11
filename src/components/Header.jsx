import React, { useContext, useState } from "react";
import Auth from "../components/Auth";
import AuthContext from "../context/AuthContext";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
          <Link to="/">Home</Link>
          <Link to="/mynft">My NFT</Link>
          <Link to="mynft">Active Auctions</Link>
          <Link to="mynft">Auctions Participation</Link> 
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
