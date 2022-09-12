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

  const { data, loading, error } = useFetchNft(accounts[0]);

  // useEffect(() => {
  //   getCidInfo("bafybeia6ipmg4hjfqhqsyxlvnhcheqpgiya7jh3wr4vkbpubculzgxdxxm");
  //   console.log("data", data);
  // }, [accounts]);

  // if (loading) return <p>"loading..."</p>;
  if (error) console.log("fetching error!");
  // useEffect(() => {
  //   console.log("balance", data);
  //   console.log("error", error);
  // }, []);

  /////////////finish useFetcAllhNft
  async function getCidInfo(cid) {
    if (accounts.length > 0) {
      console.log(accounts[0]);
      const client = makeStorageClient();
      const status = await client.status(cid);
      if (status) {
        retrieve(cid);
      } else {
        console.log("smth going wrong!");
      }
    } else {
      console.log("login!");
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
    new Promise((res, rej) => {
      arr.map(async (item) => {
        await fetch(item).then((data) => {
          if (
            data.headers.get("content-type") &&
            data.headers.get("content-type").indexOf("application/json") !== -1
          ) {
            data.json().then((data1) => {
              array.push(Object.values(data1));
              setLinks((links) => [...links, array]);
            });
          } else {
            array.push(Object.values(item));
            setLinks((links) => [...links, array]);
          }
        });
      });
    });
  }

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
        {data ? console.log(data) : ""}
        {links.length > 0 ? <NftItem links={links} /> : ""}
      </div>
    </>
  );
};

export default MyNft;
