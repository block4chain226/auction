import { createContext } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const ABI = require("../ABI.json");

const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  let contract;
  const [updated, setUpdated] = useState(0);
  const contractAddress = "0x0195F7793367541078706fd82CeE68414606A44E";
  async function getProvider(contractAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, ABI.abi, signer);
  }
  getProvider(contractAddress);

  return (
    <ProviderContext.Provider value={{ contract, updated, setUpdated }}>
      {children}
    </ProviderContext.Provider>
  );
};

export default ProviderContext;
