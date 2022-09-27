import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import ProviderContext from "../context/ProviderContext";

const useFetchAuctions = (account, partisipation) => {
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
        const auctionBiddAmount = await auctionContract.getAuctionBiddAmount(
          account,
          auctionId
        );
        if (auctionBiddAmount > 0) {
          participationAuctions.push(auction);
        }
      }
      setStatus(participationAuctions);
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

  useEffect(() => {
    if (account && partisipation === "partisipation") {
      getAllParticipationAuctions();
    }
  }, [account]);

  return status;
};

export default useFetchAuctions;
