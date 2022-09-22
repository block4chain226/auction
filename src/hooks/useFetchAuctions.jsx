import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import ProviderContext from "../context/ProviderContext";

const useFetchAuctions = (account = undefined) => {
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
        console.log("AUCTION", auction);
        if (auction.isEnd === false) {
          auctions.push(auction);
        }
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////ok

      setStatus(auctions);
    } catch (err) {
      // setStatus({ error1: err });
      console.log("error: ", err);
    }
  }

  async function getAllActiveAuctions() {
    try {
      const auctions = await auctionContract.getAllAuctions();
      const activeAuctions = auctions.filter((item) => !item.isEnd);

      setStatus(activeAuctions);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    if (account) {
      getAllAccountAuctions();
    }
  }, [account]);

  useEffect(() => {
    if (account === undefined) {
      getAllActiveAuctions();
    }
  }, [account]);

  return status;
};

export default useFetchAuctions;
