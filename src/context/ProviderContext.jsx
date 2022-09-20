import { createContext } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
const NFTabi = require("../ABI.json");
const AUCTIONabi = require("../AUCTION.json");

const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  let nftContract, auctionContract;
  const [updated, setUpdated] = useState(0);
  const nftContractAddress = "0xe36bCA52B61c1912b8B80B0E7bD363AD9db00f48";
  const auctionContractAddress = "0x39AE0684527D868cD16bFb2De4718B05A63b8CeE";

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
