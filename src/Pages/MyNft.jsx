import NftItem from "../components/NftItem/NftItem";
import React, { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import useFetchCIDs from "../hooks/useFetchCIDs";
import useFetchNftsData from "../hooks/useFetchNftsData";

const MyNft = () => {
  const { accounts } = useContext(AuthContext);
  const { nftData, tokensId, loading, error } = useFetchCIDs(accounts[0]);
  const fetchedData = useFetchNftsData(nftData);

  if (error) console.log("fetching error!");

  useEffect(() => {
    // if (fetchedData && fetchedData.length) {
    console.log(
      "🚀 ~ file: MyNft.jsx ~ line 16 ~ MyNft ~ fetchedData",
      fetchedData
    );
    // }
  }, [fetchedData, nftData]);

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

        {fetchedData && fetchedData !== undefined ? (
          <NftItem links={fetchedData} tokensId={tokensId} />
        ) : (
          "You have not NFT's..."
        )}
      </div>
    </>
  );
};

export default MyNft;
