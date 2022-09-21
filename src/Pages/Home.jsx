import React from "react";
import useFetchNftsData from "../hooks/useFetchNftsData";
import useFetchCIDs from "../hooks/useFetchCIDs";
import useFetchAuctions from "../hooks/useFetchAuctions";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Dashboard from "../components/Dashboard/Dashboard";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const { accounts } = useContext(AuthContext);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const auctions = useFetchAuctions();
  const { nftData, loading, error } = useFetchCIDs(undefined, auctions);
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
          flexWrap: "wrap",
          boxSizing: "border-box",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        {loading ? <p>Loading...</p> : ""}

        {activeAuctions && activeAuctions !== undefined ? (
          <Dashboard activeAuctions={activeAuctions} />
        ) : (
          "You have not NFT's..."
        )}
      </div>
    </>
  );
};

export default Home;
