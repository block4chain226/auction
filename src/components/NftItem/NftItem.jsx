import React, { useEffect } from "react";
import cl from "./NftItem.module.css";
import imf from "../../img/image-10.jpeg";
import imf1 from "../../img/image9.jpeg";
import imf2 from "../../img/image-11.jpeg";
import Web3StorageContext from "../../context/Web3StorageContext";
import { useContext } from "react";
import { useState } from "react";

const NftItem = ({ links }) => {
  // const { makeStorageClient } = useContext(Web3StorageContext);
  // const [links, setLinks] = useState([]);

  // async function getCidInfo(cid) {
  //   const client = makeStorageClient();
  //   const status = await client.status(cid);
  //   if (status) {
  //     retrieve(cid);
  //   } else {
  //     console.log("smth going wrong!");
  //   }
  // }

  // async function retrieve(cid) {
  //   let arr = [];
  //   const client = makeStorageClient();
  //   const res = await client.get(cid);
  //   if (!res.ok) {
  //     throw new Error(`failed to get${1}`);
  //   } else {
  //     const files = await res.files();
  //     for (const file of files) {
  //       console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
  //       arr.push(`https://ipfs.io/ipfs/${file.cid}`);
  //     }
  //   }
  //   fetchData(arr);
  // }
  // function fetchData(arr) {
  //   let array = [];
  //   arr.map(async (item) => {
  //     const response = await fetch(item);
  //     const contentType = response.headers.get("content-type");
  //     if (contentType && contentType.indexOf("application/json") !== -1) {
  //       return response.json().then((data) => {
  //           console.log("data",  Object.values(data));
  //           array.push(Object.values(data));
  //         // setLinks((links) => [
  //         //   ...links,
  //         //   Object.values(data),
  //         // ]);
  //       });
  //     } else {
  //        console.log("data", item);
  //        array.push(Object.values(item));
  //       // setLinks((links) => [...links, item]);
  //     }
  //   });

  //   setLinks(array);
  //    console.log("array: ",array);

  // }

  return (
    <>
      <div className={cl.col}>
        <div className={cl.item}>
          <div className={cl.image}>
            <img src={links[0][0].join("")}></img>
          </div>
          <div className={cl.info}>
            <div className={cl.name}>
              <p>{links[0][1]}</p>
            </div>
            <div className={cl.price}>
              <p>{links[0][2]}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftItem;
