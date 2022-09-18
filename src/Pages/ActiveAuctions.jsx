import React, { useEffect } from "react";
import useFetchAuctions from "../hooks/useFetchAuctions";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import useFetchCIDs from "../hooks/useFetchCIDs";
import { useState } from "react";
import MyAuctions from "../components/MyAuctions/MyAuctions";

const ActiveAuctions = () => {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const { accounts } = useContext(AuthContext);
  const auctions = useFetchAuctions(accounts[0]);
  const { nftData, loading, error } = useFetchCIDs(accounts[0], auctions);

  useEffect(() => {
    if (auctions && auctions.length > 0 && accounts.length > 0) {
      console.log("auctions", auctions);
    }
  }, [nftData, auctions]);
  useEffect(() => {
    if (nftData && accounts.length) {
      addMetaDataToAuctions();
    }
  }, [nftData, auctions]);

  function addMetaDataToAuctions() {
    const newAuctions = auctions.map((item, index) => {
      return Object.assign({}, item, { url: nftData[index] });
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
        {activeAuctions.map((item, index) => (
          <MyAuctions auction={item} />
        ))}
      </div>
    </>
  );
};

export default ActiveAuctions;
