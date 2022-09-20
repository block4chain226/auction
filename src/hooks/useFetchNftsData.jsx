import React, { useEffect, useState, useContext } from "react";
import Web3StorageContext from "../context/Web3StorageContext";

const useFetchNftsData = (data) => {
  const { makeStorageClient } = useContext(Web3StorageContext);
  const client = makeStorageClient();
  const [fetchedData, setfetchedData] = useState([]);

  async function getNfts() {
    ///////////// retrieve

    const allLinks = await getLinks(data);
    //////////// fetchData
    const fetchedData = await fetchData(allLinks);
    // setLinks(fetchedData);
    // console.log("fetched-data", fetchedData);
    setfetchedData(fetchedData);
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

  useEffect(() => {
    if (data) {
      getNfts();
    } else {
      console.log("No CIDs");
    }
  }, [data]);

  return fetchedData;
};

export default useFetchNftsData;
