import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import MyButton from "../Ui/MyButton/MyButton";
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
    <MyButton className="button" onClick={connect}>
      Connect
    </MyButton>
  );
};

export default Auth;
