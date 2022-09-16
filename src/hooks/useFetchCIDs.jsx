import React, { useContext, useEffect, useState } from "react";
import ProviderContext from "../context/ProviderContext";

const useFetchCIDs = (accounts, tokenId = null) => {
  const { nftContract } = useContext(ProviderContext);
  const [status, setStatus] = useState({
    loading: false,
    data: undefined,
    tokensId: [],
    error: undefined,
  });

  async function getAllAccountTokensURIs() {
    try {
      console.log("getAllAccountTokensURIs");
      let tokensURI = [];
      let tokensIdArray = [];
      setStatus({ loading: true });
      const accountBalance = await nftContract.balanceOf(accounts);

      if (Number(accountBalance) !== 0) {
        for (let i = 0; i < accountBalance; i++) {
          let tokenId = await nftContract.tokenOfOwnerByIndex(accounts, i);
          tokensIdArray.push(Number(tokenId));
          let tokenURI = await nftContract.tokenURI(tokenId);
          tokenURI = tokenURI.slice(21);
          ////////////////////////////////////////////////////////////////////put just tokenURI
          tokensURI.push(tokenURI);
        }
        setStatus({ loading: false, data: tokensURI, tokensId: tokensIdArray });
      } else {
        setStatus({ loading: false, error: "you have not tokens" });
      }
    } catch (err) {
      setStatus({ loading: false, error: err.toString() });
      console.log("err", err);
    }
  }

  async function second() {
    try {
      let tokensURI = [];
      let tokensIdArray = [];
      setStatus({ loading: true });
      const accountBalance = await nftContract.balanceOf(accounts);

      if (Number(accountBalance) !== 0) {
        for (let i = 0; i < accountBalance; i++) {
          let tokenId = await nftContract.tokenOfOwnerByIndex(accounts, i);
          tokensIdArray.push(Number(tokenId));
          let tokenURI = await nftContract.tokenURI(tokenId);
          tokenURI = tokenURI.slice(21);
          ////////////////////////////////////////////////////////////////////put just tokenURI
          tokensURI.push(tokenURI);
        }
        setStatus({ loading: false, data: tokensURI, tokensId: tokensIdArray });
      } else {
        setStatus({ loading: false, error: "you have not tokens" });
      }
    } catch (err) {
      setStatus({ loading: false, error: err.toString() });
      console.log("err", err);
    }
  }

  useEffect(() => {
    if (accounts && tokenId === null) {
      getAllAccountTokensURIs();
    }
  }, [accounts]);

  useEffect(() => {
    if (accounts && tokenId !== null) {
      second();
    }
  }, [accounts]);

  return { ...status };
};

export default useFetchCIDs;
