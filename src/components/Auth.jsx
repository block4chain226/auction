import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
// import { Navigate, useNavigate } from "react-router-dom";

const Auth = () => {
  const { accounts, setAccounts } = useContext(AuthContext);
  // const navigate = useNavigate();
  async function connect() {
    if (window.ethereum) {
      const resolve = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(resolve);

      localStorage.setItem("loged", resolve);
      // navigate("/", { replace: true });
      // navigate(0);
    }
  }
  return (
    <button className="button" variant="contained" onClick={connect}>
      Connect
    </button>
  );
};

export default Auth;
