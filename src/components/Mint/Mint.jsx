import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import cl from "./Mint.module.css";
import LoadingSpin from "react-loading-spin";
import Web3StorageContext from "../../context/Web3StorageContext";
import ProviderContext from "../../context/ProviderContext";
import AuthContext from "../../context/AuthContext";
import Loading from "../../Ui/MyButton/Loading/Loading";
import MyButton from "../../Ui/MyButton/MyButton";
const eventsAbi = require("../../events.json");

const Mint = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const { makeStorageClient } = useContext(Web3StorageContext);
  const { nftContract } = useContext(ProviderContext);
  const { accounts } = useContext(AuthContext);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

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
      //event logs
      await nftContract.on("Transfer", (from, to, _tokenId) => {
        const mintEvent = {
          from: from,
          to: to,
          tokenId: _tokenId,
        };
        setAlert(mintEvent.from);
        debugger;
        console.log("Transfer:", from, to, Number(_tokenId));
      });
      nftContract.on("NewTokenURI", (_owner, _tokenId, _newtokenUri) => {
        console.log("NewTokenURI:", _owner, Number(_tokenId), _newtokenUri);
      });
    } else {
      console.log("not all filled");
      setError("you must to fill all fields");
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

  useEffect(() => {
    setError("");
  }, [file.length > 0 && title !== "" && text !== ""]);

  const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />;

  return (
    <div className={cl.mint}>
      <div className={cl.message}>
        <h1>Create New Item</h1>
        <h2>{error}</h2>
      </div>

      <div className={cl.container}>
        {/* <div className={cl.picture}>{Example}</div> */}

        <div className={cl.title}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title..."
          />
        </div>
        <div className={cl.text}>
          <textarea
            rows={10}
            onChange={(e) => setText(e.target.value)}
            placeholder="Description..."
            value={text}
          />
        </div>
        <div className={cl.upload}>
          <Example data={file} />
          <input
            type="file"
            name="file"
            id="file"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => setFile(e.target.files)}
            defaultValue={file.name}
          />
          {isUploading ? <Loading /> : ""}
        </div>
        <MyButton
          style={{ width: "100px", padding: "20px 24px" }}
          onClick={(e) => MintNFT(e)}
        >
          upload
        </MyButton>
      </div>
    </div>
  );
};

export default Mint;
