import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const AuctionsContext = createContext();

export const AuctionsProvider = ({ children }) => {
  const [auctions, setAuctions] = useState([]);

  return (
    <AuctionsContext.Provider value={{ auctions, setAuctions }}>
      {children}
    </AuctionsContext.Provider>
  );
};

export default AuctionsContext;
