import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "../index.scss";

//0x0195F7793367541078706fd82CeE68414606A44E
const Main = () => {
  const [showMint, setShowMint] = useState(false);
  const { accounts } = useContext(AuthContext);

  return (
    <main className="main">
      <h2>
        <p>Main</p>
      </h2>
    </main>
  );
};

export default Main;
