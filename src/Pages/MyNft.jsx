import NftItem from "../components/NftItem/NftItem";
import React, { useEffect, useState, useContext } from "react";
import Web3StorageContext from "../context/Web3StorageContext";
import AuthContext from "../context/AuthContext";
import useFetchNft from "../hooks/useFetchNft";

const MyNft = () => {
  const { makeStorageClient } = useContext(Web3StorageContext);
  const { accounts } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  /////////Error: invalid address or ENS name (argument="name", value=undefined, code=INVALID_ARGUMENT, version=contracts/5.7.0)
  const r = useFetchNft(accounts[0]);

  /////////////finish useFetcAllhNft
  async function getCidInfo(cid) {
    const client = makeStorageClient();
    const status = await client.status(cid);
    if (status) {
      retrieve(cid);
    } else {
      console.log("smth going wrong!");
    }
  }

  async function retrieve(cid) {
    let arr = [];
    const client = makeStorageClient();
    const res = await client.get(cid);
    if (!res.ok) {
      throw new Error(`failed to get${1}`);
    } else {
      const files = await res.files();
      for (const file of files) {
        console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
        arr.push(`https://ipfs.io/ipfs/${file.cid}`);
      }
    }
    fetchData(arr);
  }
  function fetchData(arr) {
    let array = [];
    // arr.map(async (item) => {
    //   const response = await fetch(item);
    //   const contentType = response.headers.get("content-type");
    //   if (contentType && contentType.indexOf("application/json") !== -1) {
    //     response.json().then((data) => {
    //       array.push(Object.values(data));
    //     });
    //   } else {
    //     array.push(Object.values(item));
    //   }
    //   setLinks((links) => [...links, array]);
    // });

    //////
    new  Promise((res,rej)=>{
      arr.map(async(item)=>{
        await fetch(item).then(data=>{
          if(data.headers.get("content-type")&&data.headers.get("content-type").indexOf("application/json") !== -1){
            data.json().then(data1=>{
              array.push(Object.values(data1));
            })
          }else{
            array.push(Object.values(item));
          }
          setLinks((links) => [...links, array]);
        })
      })
    });
  }

  useEffect(() => {
    getCidInfo("bafybeia6ipmg4hjfqhqsyxlvnhcheqpgiya7jh3wr4vkbpubculzgxdxxm");
  }, []);
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
        {links.length > 0 ? (
          <NftItem links={links} />
        ) : (
          <p>Have not the links</p>
        )}
      </div>
    </>
  );
};

export default MyNft;
