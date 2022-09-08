import React, { useContext, useEffect, useState } from "react";
import Auth from "../components/Auth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Mint from "../components/Mint";
import AuthContext from "../context/AuthContext";
import "../index.scss";

import ConnectButton from "../UI/ConnectButton";
//0x0195F7793367541078706fd82CeE68414606A44E
const Main = () => {
  const [showMint, setShowMint] = useState(false);
  const { accounts } = useContext(AuthContext);

  return (
    <main className="main">
      <h2></h2>
    </main>
  );
};

export default Main;
