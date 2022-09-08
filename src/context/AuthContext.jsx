import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [showMint, setShowMint] = useState(false);
  return (
    <AuthContext.Provider
      value={{ accounts, setAccounts, showMint, setShowMint }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
