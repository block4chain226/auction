import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  return (
    <AuthContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
