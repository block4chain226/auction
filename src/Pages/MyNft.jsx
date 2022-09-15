import NftItem from "../components/NftItem/NftItem";
import React, { useEffect, useState, useContext } from "react";
import Web3StorageContext from "../context/Web3StorageContext";
import AuthContext from "../context/AuthContext";
import useFetchNft from "../hooks/useFetchNft";

const MyNft = () => {
  const { makeStorageClient } = useContext(Web3StorageContext);
  const { accounts } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const client = makeStorageClient();
  const { data, tokensId, loading, error } = useFetchNft(accounts[0]);

  if (error) console.log("fetching error!");

  useEffect(() => {
    if (data && data.length > 0 && accounts.length > 0) {
      getNfts();
    }
  }, [data]);

  async function getNfts() {
    ///////////// retrieve
    const allLinks = await getLinks(data);
    //////////// fetchData
    const fetchedData = await fetchData(allLinks);
    setLinks(fetchedData);
  }

  async function getLinks(arr) {
    const resolve = await Promise.all(
      arr.map(async (item) => {
        return client.get(item);
      })
    );
    const next = resolve.filter((i) => i.ok);
    const files = await Promise.all(next.map(async (item) => item.files()));
    return files.map((file) => {
      return file.map((item) => {
        return `https://ipfs.io/ipfs/${item.cid}`;
      });
    });
  }

  async function fetchData(arrr) {
    let dataArray = [];
    let finalArray = [];
    console.log("arr", arrr);
    for (let i = 0; i < arrr.length; i++) {
      for (let j = 0; j < arrr[i].length; j++) {
        const data = await fetch(arrr[i][j]);
        if (
          data.headers.get("content-type") &&
          data.headers.get("content-type").indexOf("application/json") !== -1
        ) {
          await data.json().then((data) => {
            dataArray.push(Object.values(data));
          });
        } else {
          dataArray.push(Object.values(arrr[i][j]).join(""));
        }
      }
      finalArray.push(dataArray);
      dataArray = [];
    }
    return finalArray;
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

        {links && links !== undefined ? (
          <NftItem links={links} tokensId={tokensId} />
        ) : (
          "You have not NFT's..."
        )}
      </div>
    </>
  );
};

export default MyNft;
