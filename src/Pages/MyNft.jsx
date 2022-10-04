import NftItem from "../components/NftItem/NftItem";
import React, { useEffect, useContext } from "react";
import LoadingSpin from "react-loading-spin";
import AuthContext from "../context/AuthContext";
import useFetchCIDs from "../hooks/useFetchCIDs";
import useFetchNftsData from "../hooks/useFetchNftsData";
import Loading from "../Ui/MyButton/Loading/Loading";

const MyNft = () => {
  const { accounts } = useContext(AuthContext);
  const { nftData, tokensId, loading, error } = useFetchCIDs(accounts[0]);
  const fetchedData = useFetchNftsData(nftData);

  if (error) console.log("fetching error!");

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
        {loading ? <Loading /> : ""}

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
