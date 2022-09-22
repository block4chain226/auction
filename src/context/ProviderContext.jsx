import { createContext } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const NFTabi = require("../ABI.json");
const AUCTIONabi = require("../AUCTION.json");

const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  let nftContract, auctionContract;
  const [updated, setUpdated] = useState(0);
  const nftContractAddress = "0x39737D7CC17a9BCD8b75CC0E8d10A008e12120dE";
  const auctionContractAddress = "0x618037dbc353f2573B189bA83b3eDc384c793038";

  async function getNftProvider(nftContractAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    nftContract = new ethers.Contract(nftContractAddress, NFTabi.abi, signer);
  }
  async function getAuctionProvider(auctionContractAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    auctionContract = new ethers.Contract(
      auctionContractAddress,
      AUCTIONabi.abi,
      signer
    );
  }

  getNftProvider(nftContractAddress);
  getAuctionProvider(auctionContractAddress);

  return (
    <ProviderContext.Provider
      value={{ nftContract, auctionContract, updated, setUpdated }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export default ProviderContext;
