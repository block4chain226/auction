import { createContext } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const NFTabi = require("../ABI.json");
const AUCTIONabi = require("../AUCTION.json");

const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  let nftContract, auctionContract;
  const [updated, setUpdated] = useState(0);
  const nftContractAddress = "0x502E05441aa784723Da78c1c0e543f4AA8aD3Af9";
  const auctionContractAddress = "0x00fc2835C494984C49Cd8444a0e689204F66F0A7";

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
