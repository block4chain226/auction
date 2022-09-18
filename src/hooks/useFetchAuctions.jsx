import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import ProviderContext from "../context/ProviderContext";


const useFetchAuctions = (account, auctionId = null) => {
  const { nftContract, auctionContract } = useContext(ProviderContext);
  const [status, setStatus] = useState([]);

  async function getAllAccountAuctions() {
    try {
      let auctions = [];
      // setStatus({ loading1: true });
      const accountAuctionsCount =
        await auctionContract.getOwnerAuctionsCount();
      console.log(
        "🚀 ~ file: useFetchAuctions.jsx ~ line 21 ~ getAllAccountAuctions ~ accountAuctionsCount",
        accountAuctionsCount
      );
      for (let i = 0; i < accountAuctionsCount; i++) {
        const auction = await auctionContract.getAccountAuctionByIndex(
          account,
          i
        );
        auctions.push(auction);
      }
      console.log(
        "🚀 ~ file: useFetchAuctions.jsx ~ line 23 ~ getAllAccountAuctions ~ auctions",
        auctions
      );
      // const timestamp = 1663429928;
      // const date = new Date(timestamp * 1000);
      // console.log("date", date);
      setStatus(auctions);
    } catch (err) {
      // setStatus({ error1: err });
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    if (account && auctionId === null) {
      getAllAccountAuctions();
    }
  }, [account]);

  return status;
};

export default useFetchAuctions;
