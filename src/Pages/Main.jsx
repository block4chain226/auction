import React, { useContext, useEffect, useState } from "react";
import Mint from "../components/Mint";
import AuthContext from "../context/AuthContext";
import "../index.scss";

const Main = () => {
  const { accounts, showMint } = useContext(AuthContext);

  return (
    <>
      <main className="main">{showMint ? <Mint /> : ""}</main>
    </>
  );
};

export default Main;
