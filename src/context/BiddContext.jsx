import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const BiddContext = createContext();

export const BiddProvider = ({ children }) => {
  const [bidd, setBidd] = useState("");

  return (
    <BiddContext.Provider value={{ bidd, setBidd }}>
      {children}
    </BiddContext.Provider>
  );
};

export default BiddContext;
