import React, { useContext, useEffect, useState } from "react";
import Web3StorageContext from "../context/Web3StorageContext";
import ProviderContext from "../context/ProviderContext";

const useFetchNft = (accounts) => {
  const { makeStorageClient } = useContext(Web3StorageContext);
  const { contract } = useContext(ProviderContext);
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });

  async function getAllAccountTokensURIs() {
    try {
      let tokensURI = [];
      setStatus({ loading: true });
      const accountBalance = await contract.balanceOf(accounts);
      setBalance("accountBalance",accountBalance);
    
      if(Number(accountBalance)!==0){
         for (let i = 0; i < accountBalance; i++) {
        let tokenId = await contract.tokenOfOwnerByIndex(accounts, i);
        let tokenURI = await contract.tokenURI(tokenId);
        tokenURI = tokenURI.slice(21);
      ////////////////////////////////////////////////////////////////////put just tokenURI
        tokensURI.push(tokenURI);
      }
      setBalance(accountBalance);
      setStatus({ loading: false, data: tokensURI });
      }else{
        setStatus({ loading: false, error: "you have not tokens"});
      }
     
    } catch (err) {
      setStatus({ loading: false, error: err.toString() });
      console.log("err", err);
    }
  }
  useEffect(() => {
    if (accounts) {
      getAllAccountTokensURIs();
    }
  }, [accounts]);

  return { ...status, balance };
};

export default useFetchNft;
