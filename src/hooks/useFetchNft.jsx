import React, { useContext, useEffect, useState } from "react";
import Web3StorageContext from "../context/Web3StorageContext";
import ProviderContext from "../context/ProviderContext";

const useFetchNft = (accounts) => {
  const { makeStorageClient } = useContext(Web3StorageContext);
  const { contract } = useContext(ProviderContext);
  const [balance, setBalance]= useState("");
  
console.log("accou", accounts);
    async function getAllAccountTokenURIs(accounts){
        const accountBalance = await contract.balanceOf(accounts);
     console.log("accountBalance",accountBalance);
        setBalance(accountBalance);
    }
    useEffect(()=>{
getAllAccountTokenURIs(accounts);
    },[])
    
   return balance;
    return (
        <div>
            
        </div>
    );
};

export default useFetchNft;