import NftItem from "../components/NftItem/NftItem";
import React, {useEffect,useState,useContext} from "react";
import Web3StorageContext from "../context/Web3StorageContext";
import AuthContext from "../context/AuthContext";
import useFetchNft from "../hooks/useFetchNft";

const MyNft = () => {
 const { makeStorageClient } = useContext(Web3StorageContext);
 const { accounts } = useContext(AuthContext);
 const [links, setLinks] = useState([]);
 const r = useFetchNft(accounts[0]);


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
    let array1 = [];
    arr.map(async (item) => {
      const response = await fetch(item);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json().then((data) => {
            array.push(Object.values(data));
          // setLinks((links) => [
          //   ...links,
          //   Object.values(data),
          // ]);
        });
      } else {
        
         array.push(Object.values(item));
        // setLinks((links) => [...links, item]);
      }
    });
  //  array1.push(array);
    setLinks((links)=>[...links, array]);
     console.log("array: ",array);
    
  }
  
  useEffect(() => {
    getCidInfo("bafybeia6ipmg4hjfqhqsyxlvnhcheqpgiya7jh3wr4vkbpubculzgxdxxm");
  }, []);
  return (
    <>
    <div style={{ width: "100%",
  padding: "10px",
  display: "flex",
  flexWrap: "wrap",
  boxSizing: "border-box",
  justifyContent: "center",
  marginTop: "100px"}}>
    <NftItem links={links}/>
    </div>
    </>
  );
};

export default MyNft;
