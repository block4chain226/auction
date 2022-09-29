import React, { useEffect, useState } from "react";
import { useContext } from "react";
import LoadingSpin from "react-loading-spin";
import ProviderContext from "../../context/ProviderContext";
import MyButton from "../../Ui/MyButton/MyButton";
import DateTimePicker from "react-datetime-picker";
import cl from "./CreateAuction.module.css";

const CreateAuction = ({ arr, tokenId, closeAuction }) => {
  const { nftContract, auctionContract } = useContext(ProviderContext);
  const [endDate, onChange] = useState(new Date());
  const [isCreating, setIsCreating] = useState(false);
  const [startPrice, setStartPrice] = useState("");

  async function startAuction() {
    if (auctionContract && nftContract && endDate && startPrice) {
      setIsCreating(true);
      const approve = await nftContract.approve(
        auctionContract.address,
        tokenId
      );
      await approve.wait();
      const seconds = getSeconds();
      const newAuction = await auctionContract.startAuction(
        tokenId,
        startPrice,
        seconds
      );
      await newAuction.wait();
      setIsCreating(false);
      console.log("newAuction", newAuction);
    } else {
      console.log("you have not auction and nft providers");
    }
  }

  function getSeconds() {
    console.log(
      "seconds:",
      Math.floor((endDate.getTime() - new Date().getTime()) / 1000)
    );
    return endDate.getTime() / 1000;
  }

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
              {isCreating ? <LoadingSpin /> : ""}
              <div className={cl.time}>
                <DateTimePicker onChange={onChange} value={endDate} />
                <MyButton onClick={startAuction}>Start Auction</MyButton>
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
