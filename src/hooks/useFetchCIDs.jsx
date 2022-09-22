import React, { useContext, useEffect, useState } from "react";
import ProviderContext from "../context/ProviderContext";

const useFetchCIDs = (accounts, ids) => {
  const { nftContract } = useContext(ProviderContext);
  const [status, setStatus] = useState({
    loading: false,
    nftData: undefined,
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
        console.log("tokensIdArray", tokensIdArray);
        setStatus({
          loading: false,
          nftData: tokensURI,
          tokensId: tokensIdArray,
        });
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
      setStatus({ loading: true });
      console.log("ids", ids);

      if (ids.length > 0) {
        for (let i = 0; i < ids.length; i++) {
          let tokenURI = await nftContract.tokenURI(Number(ids[i][2]));
          tokenURI = tokenURI.slice(21);
          console.log("tokenURI", tokenURI);
          tokensURI.push(tokenURI);
        }
        setStatus({ loading: false, nftData: tokensURI });
      } else {
        setStatus({ loading: false, error: "you have not tokens" });
      }
    } catch (err) {
      setStatus({ loading: false, error: err.toString() });
      console.log("err", err);
    }
  }

  async function getAllAuctionsTokensURI() {
    try {
      let tokensURI = [];
      setStatus({ loading: true });
      console.log("ids", ids);

      //auction->tokenId->tokenURI->push title/text/url
      if (ids.length > 0) {
        for (let i = 0; i < ids.length; i++) {
          let tokenURI = await nftContract.tokenURI(Number(ids[i].nftId));
          tokenURI = tokenURI.slice(21);
          console.log("tokenURI", tokenURI);
          tokensURI.push(tokenURI);
        }
        setStatus({ loading: false, nftData: tokensURI });
      } else {
        setStatus({ loading: false, error: "you have not tokens" });
      }
    } catch (err) {
      setStatus({ loading: false, error: err.toString() });
      console.log("err", err);
    }
  }

  useEffect(() => {
    if (accounts && ids === undefined) {
      getAllAccountTokensURIs();
    }
  }, [accounts]);

  useEffect(() => {
    if (accounts && ids !== undefined) {
      second();
    }
  }, [accounts, ids]);

  useEffect(() => {
    if (accounts === undefined && ids.length > 0) {
      getAllAuctionsTokensURI();
    }
  }, [ids]);

  return { ...status };
};

export default useFetchCIDs;
