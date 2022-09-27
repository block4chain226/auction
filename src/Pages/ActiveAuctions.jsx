import React, { useEffect } from "react";
import useFetchAuctions from "../hooks/useFetchAuctions";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import useFetchCIDs from "../hooks/useFetchCIDs";
import { useState } from "react";
import MyAuctions from "../components/MyAuctions/MyAuctions";
import useFetchNftsData from "../hooks/useFetchNftsData";

const ActiveAuctions = () => {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const { accounts } = useContext(AuthContext);
  const auctions = useFetchAuctions(accounts[0]);

  const { nftData, loading, error } = useFetchCIDs(accounts[0], auctions);
  const fetchedData = useFetchNftsData(nftData);

  useEffect(() => {
    if (auctions && auctions.length > 0 && accounts.length > 0) {
      console.log("auctions", auctions);
    }
  }, [nftData, auctions]);
  useEffect(() => {
    if (fetchedData && accounts.length) {
      console.log("fetchedData", fetchedData);
      addMetaDataToAuctions();
    }
  }, [fetchedData]);

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
    console.log("auctions+tokensUri", newAuctions);
  }
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
        {activeAuctions.length ? (
          activeAuctions.map((item) => <MyAuctions auction={item} />)
        ) : (
          <p> You have not active auctions </p>
        )}
      </div>
    </>
  );
};

export default ActiveAuctions;
