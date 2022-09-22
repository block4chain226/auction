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
      let allAccountAuctions = [];
      // setStatus({ loading1: true });
      // const accountAuctionsCount =
      // await auctionContract.getOwnerAuctionsCount();
      const auctions = await auctionContract.getAllAuctions();

      // for (let i = 0; i < accountAuctionsCount - 1; i++) {
      //   ///problem!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //   const auction = await auctionContract.getAccountAuctionByIndex(
      //     account,
      //     i
      //   );

      // console.log("AUCTION", auction);
      // auctions.push(auction);
      const activeAuctions = auctions.filter((item) => !item.isEnd);
      // debugger;
      setStatus(activeAuctions);
    } catch (err) {
      ///////////////////////////////////////////////////////////////////////////////////////////////ok

      // setStatus({ error1: err });
      console.log("error: ", err);
    }
  }

  async function getAllActiveAuctions() {
    try {
      const auctions = await auctionContract.getAllAuctions();
      const activeAuctions = auctions.filter((item) => !item.isEnd);
      console.log(
        "🚀 ~ file: useFetchAuctions.jsx ~ line 44 ~ getAllActiveAuctions ~ activeAuctions",
        activeAuctions
      );

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
