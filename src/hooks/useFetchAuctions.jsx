import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import ProviderContext from "../context/ProviderContext";

const useFetchAuctions = (account) => {
  const { nftContract, auctionContract } = useContext(ProviderContext);
  const [status, setStatus] = useState([]);

  async function getAllAccountAuctions() {
    try {
      const auctions = await auctionContract.getAllAuctions();
      // const activeAuctions = auctions.filter((item) => !item.isEnd);
      const activeAuctions = auctions.filter(
        (item) => item.owner.toLowerCase() === account && !item.isEnd
      );
      setStatus(activeAuctions);
    } catch (err) {
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

  async function getAllParticipationAuctions() {
    let auctionsId = [];
    let participationAuctions = [];
    try {
      const count = await auctionContract.getAccountAuctionsParticipationCount(
        account
      );
      for (let i = 0; i < count; i++) {
        const auctionId = await auctionContract.getAuctionParticipationId(
          account,
          i
        );
        const auction = await auctionContract.getAuction(auctionId);
        participationAuctions.push(auction);
      }
      // const temp = participationAuctions.map(
      //   async (item) =>
      //     await auctionContract.getAuctionBiddAmount(
      //       account,
      //       item.auctionId > 0
      //     )
      // );

      console.log("temp", participationAuctions);
      setStatus(participationAuctions);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    if (account) {
      getAllAccountAuctions();
      // getAllParticipationAuctions();
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
