import React from "react";
import useFetchNftsData from "../hooks/useFetchNftsData";
import useFetchCIDs from "../hooks/useFetchCIDs";
import useFetchAuctions from "../hooks/useFetchAuctions";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const AuctionsParticipation = () => {
  const { accounts } = useContext(AuthContext);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const auctions = useFetchAuctions(accounts[0], "partisipation");
  const { nftData, loading, error } = useFetchCIDs(accounts[0], auctions);
  const fetchedData = useFetchNftsData(nftData);

  function addMetaDataToAuctions() {
    console.log("newAuctionsBefore: ", auctions);
    const newAuctions = auctions.map((item, index) => {
      return Object.assign({}, item, {
        title: fetchedData[index][0],
        image: fetchedData[index][1],
        text: fetchedData[index][2],
      });
    });

    setActiveAuctions(newAuctions);
    debugger;
    console.log("auctions+tokensUri", newAuctions);
  }

  useEffect(() => {
    addMetaDataToAuctions();
  }, [fetchedData]);
  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        {/* {activeAuctions.length ? (
          activeAuctions.map((item) => <MyAuctions auction={item} />)
        ) : (
          <p> You have not active auctions </p>
        )} */}
      </div>
    </>
  );
};

export default AuctionsParticipation;
