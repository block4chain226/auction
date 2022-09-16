import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ProviderContext from "../../context/ProviderContext";
import MyButton from "../../Ui/MyButton/MyButton";
import DateTimePicker from "react-datetime-picker";
import cl from "./CreateAuction.module.css";

const CreateAuction = ({ arr, tokenId, closeAuction }) => {
  const { nftContract, auctionContract } = useContext(ProviderContext);
  const [endDate, onChange] = useState(new Date());
  const [startPrice, setStartPrice] = useState("");

  async function startAuction() {
    if (auctionContract && nftContract && endDate && startPrice) {
      console.log("tokenId", tokenId);
      const approve = await nftContract.approve(
        auctionContract.address,
        tokenId
      );
      await approve.wait();
      const newAuction = await auctionContract.startAuction(
        tokenId,
        startPrice,
        getSeconds(endDate)
      );
      await newAuction.wait();
      console.log("newAuction", newAuction);
    } else {
      console.log("you have not auction and nft providers");
    }
  }
  async function getAuction(id) {
    const auction = await auctionContract.auctions(0);
    console.log(
      "🚀 ~ file: CreateAuction.jsx ~ line 28 ~ getAuction ~ auction",
      auction
    );
  }
  function getSeconds(endDate) {
    // const difference = date.getTime() - new Date().getTime();
    console.log("seconds:", (endDate.getTime() - new Date().getTime()) / 1000);
    return (endDate.getTime() - new Date().getTime()) / 1000;
  }
  useEffect(() => {
    console.log("tokenId", tokenId);
  }, []);

  return (
    <>
      {
        <div className={cl.auction}>
          <div className={cl.container}>
            <div className={cl.image}>
              <img src={arr[0]}></img>
            </div>
            <div className={cl.details}>
              <div className={cl.title}>
                <p>{arr[1]}</p>
              </div>
              <div className={cl.text}>
                <p>{arr[2]}</p>
              </div>
              <div className={cl.price}>
                <input
                  onChange={(e) => {
                    setStartPrice(e.target.value);
                  }}
                  style={{ border: "1px solid red" }}
                />
              </div>
              <div className={cl.time}>
                <DateTimePicker onChange={onChange} value={endDate} />

                <MyButton onClick={startAuction}>Start Auction</MyButton>
                <MyButton onClick={getSeconds}>Get Auction</MyButton>
              </div>
            </div>
            <div onClick={() => closeAuction()} className="cross"></div>
          </div>
        </div>
      }
    </>
  );
};

export default CreateAuction;
