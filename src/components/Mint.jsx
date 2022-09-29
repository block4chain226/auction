import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import "../index.scss";
import LoadingSpin from "react-loading-spin";
import Web3StorageContext from "../context/Web3StorageContext";
import ProviderContext from "../context/ProviderContext";
import AuthContext from "../context/AuthContext";
const eventsAbi = require("../events.json");

const Mint = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const { makeStorageClient } = useContext(Web3StorageContext);
  const { nftContract } = useContext(ProviderContext);
  const { accounts } = useContext(AuthContext);

  async function MintNFT(e) {
    if (file[0] && title && text) {
      //get files url
      setIsUploading(true);
      let url = await uploadFiles(e);
      //minting
      const mint = await nftContract.safeMint(accounts[0], url, {
        value: ethers.utils.parseEther("0.0001"),
      });
      await mint.wait();
      setIsUploading(false);
      setFile("");
      setTitle("");
      setText("");
      alert("Minting success");
      //event logs
      await nftContract.on("Transfer", (from, to, _tokenId) => {
        console.log("Transfer:", from, to, Number(_tokenId));
      });
      nftContract.on("NewTokenURI", (_owner, _tokenId, _newtokenUri) => {
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
              value={title}
              placeholder="Title..."
            />
          </div>
          <div className="mint__description">
            <textarea
              onChange={(e) => setText(e.target.value)}
              placeholder="Description..."
              value={text}
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
              defaultValue={file.name}
            />
            {isUploading ? <LoadingSpin /> : ""}
            <button onClick={(e) => MintNFT(e)}>upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
