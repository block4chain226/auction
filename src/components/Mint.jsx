import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import "../index.scss";
import Web3StorageContext from "../context/Web3StorageContext";
import { JsonRpcBatchProvider } from "@ethersproject/providers";
import ProviderContext from "../context/ProviderContext";
import AuthContext from "../context/AuthContext";
const eventsAbi = require("../events.json");

const Mint = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchedImg, setFetchedImg] = useState([]);
  const { makeStorageClient } = useContext(Web3StorageContext);
  const { contract } = useContext(ProviderContext);
  const { accounts } = useContext(AuthContext);
  //0x2Af36997F2813567238aCD6bC3f6dfCd776929a0

  async function MintNFT(e) {
    if (file[0] && title && text) {
      //get files url
      let url = await uploadFiles(e);
      // url = `https://ipfs.io/ipfs/${url}`;
      //minting
      const mint = await contract.safeMint(accounts[0], url, {
        value: ethers.utils.parseEther("0.0001"),
      });
      //event logs
      await contract.on("Transfer", (from, to, _tokenId) => {
        console.log("Transfer:", from, to, Number(_tokenId));
      });
      contract.on("NewTokenURI", (_owner, _tokenId, _newtokenUri) => {
        console.log("NewTokenURI:", _owner, Number(_tokenId), _newtokenUri);
      });
    } else {
      console.log("not all filled");
    }
  }

  async function uploadFiles(e) {
    let mass = [];
    const client = makeStorageClient();
    const content = makeFileObjects(title, text);
    mass.push(...content);
    mass.push(...file);
    console.log(mass);
    const cid = await client.put(mass);
    console.log("cid", cid);
    return cid;
  }

  function makeFileObjects(title, text, url) {
    const titleObj = { title: title };
    const textObj = { description: text };
    const Blobtitle = new Blob([JSON.stringify(titleObj)], {
      type: "application/json",
    });
    const Blobtext = new Blob([JSON.stringify(textObj)], {
      type: "application/json",
    });
    const files = [
      new File([Blobtext], "description"),
      new File([Blobtitle], "title"),
    ];
    return files;
  }

  /////////////////////////////////////////////output
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
    setLinks(arr);
  }

  function test() {
    links.map(async (item) => {
      const response = await fetch(item);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then((data) => {
          setFetchedData((fetchedData) => [
            ...fetchedData,
            Object.values(data),
          ]);
        });
      } else {
        setFetchedData((fetchedData) => [...fetchedData, item]);
      }
    });
  }

  useEffect(() => {
    test();
  }, [links]);
  useEffect(() => {
    getCidInfo(`bafybeihl5r6ryzbecdnu66dglu4tn5thsp5jlk3jtcyqepg36kt7jz77xu`);
  }, []);

  const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />;
  return (
    <div className="mint">
      <div className="mint__container">
        <div className="mint__picture">
          <img />
        </div>
        <div className="mint__info">
          <div className="mint__title">
            <input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title..."
            />
          </div>
          <div className="mint__description">
            <textarea
              onChange={(e) => setText(e.target.value)}
              placeholder="Description..."
            />
          </div>
          <div className="mint__upload">
            <Example data={file} />
            <input
              type="file"
              name="file"
              id="file"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => setFile(e.target.files)}
            />
            <button onClick={(e) => MintNFT(e)}>upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
