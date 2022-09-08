import React, { useContext, useEffect, useState } from "react";
import Mint from "../components/Mint";
import AuthContext from "../context/AuthContext";
import "../index.scss";

//0x0195F7793367541078706fd82CeE68414606A44E
const Main = () => {
  const { accounts, showMint } = useContext(AuthContext);

  return <main className="main">{showMint ? <Mint /> : ""}</main>;
};

export default Main;
