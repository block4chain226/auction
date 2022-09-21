import { createContext } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const NFTabi = require("../ABI.json");
const AUCTIONabi = require("../AUCTION.json");

const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  let nftContract, auctionContract;
  const [updated, setUpdated] = useState(0);
  const nftContractAddress = "0x7Bc3832Da0d21679B79b0a5536092375f3548F3c";
  const auctionContractAddress = "0x1B85cC6e354D827774e7706176001bcD9e0cF7B4";

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
