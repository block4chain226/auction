import NftItem from "../components/NftItem/NftItem";
import React, { useEffect, useState, useContext } from "react";
import Web3StorageContext from "../context/Web3StorageContext";
import AuthContext from "../context/AuthContext";
import useFetchNft from "../hooks/useFetchNft";

const MyNft = () => {
  const { makeStorageClient } = useContext(Web3StorageContext);
  const { accounts } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const [update, setUpdate] = useState(false);

  const { data, loading, error, balance } = useFetchNft(accounts[0]);

  // if (loading) return <p>"loading..."</p>;
  if (error) console.log("fetching error!");


  useEffect(()=>{
    if(data&&data.length>0){
  together();
    }
  }, [data]);


  async function together(){
   console.log(data);
     if (accounts.length > 0 && data.length > 0) {
       let statusOk = [];
      const client = makeStorageClient();
     const asyncRes = await Promise.all(data.map(async (item, index) => {
        console.log("item", item)
        const status = await client.status(item[0]);
        if (status) {
        
         statusOk.push(item);
        
        } else {
          console.log("smth going wrong!");
        }
        return;
      }));
     console.log("statsOk",statusOk);
      ///////////// retrieve
      const allLinks = await  getLinks(statusOk);
      console.log("allLinks", allLinks);
      //////////// fetchData
      const fetchedData = await fetchData(allLinks);
      
      console.log("fetchedData", fetchedData);
     }
  }

  async function getLinks(arr){
    let cidLinks = [];
    let allLinks = [];
    const client = makeStorageClient();
    console.log("arr", arr);
 
 const asyncRes = await Promise.all(arr.map(async(item)=>{       
        const res = await client.get(item);
        
    if (!res.ok) {
  
      throw new Error(`failed to get${1}`);
    } else {
      const files = await res.files();
      for (const file of files) {

        cidLinks.push(`https://ipfs.io/ipfs/${file.cid}`);
      }
      allLinks.push(cidLinks);
      cidLinks = [];
    }
      return;
      }));
      return allLinks;
  }

  async function fetchData(arrr){
     let dataArray = [];
     let finalArray = [];
     console.log("arrr", arrr);
     const arrLength = arrr.length;
     console.log("arrLength", arrLength);
     console.log("flat", arrr.flat());
      const asyncRes = await Promise.all(arrr.flat().map(async (item, index) => {
       
        await fetch(item).then((data) => {
          // debugger;
          if (
         
            data.headers.get("content-type") &&
            data.headers.get("content-type").indexOf("application/json") !== -1
          ) {
            data.json().then((data1) => {
              
          if((index+1)%3===0){
            console.log("index = ", index+1);
             dataArray.push(Object.values(data1));
             finalArray.push(dataArray);
             dataArray = [];
          }else{
             dataArray.push(Object.values(data1));
          }
              
              // console.log("temp", temp);
            });
          } else {
              if((index+1)%3===0){
                 console.log("index = ", index+1);
             dataArray.push(Object.values(item).join(""));
             finalArray.push(dataArray);
            dataArray = [];
            // console.log("dataArray", item);
          }else{
            dataArray.push(Object.values(item).join(""));
          }
          
        }});
        // finalArray.push(dataArray);
        return;
      }));
    console.log("finalArray", finalArray);
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
        
        {links !== undefined ? (
          <NftItem links={links} />
        ) : (
          "You have not NFT's..."
        )}
      </div>
    </>
  );
};

export default MyNft;
