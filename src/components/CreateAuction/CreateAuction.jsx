import React, { useEffect, useState } from "react";
import { useContext } from "react";
import LoadingSpin from "react-loading-spin";
import ProviderContext from "../../context/ProviderContext";
import MyButton from "../../Ui/MyButton/MyButton";
import DateTimePicker from "react-datetime-picker";
import cl from "./CreateAuction.module.css";
import Loading from "../../Ui/MyButton/Loading/Loading";

const CreateAuction = ({ arr, tokenId, closeAuction }) => {
  const { nftContract, auctionContract } = useContext(ProviderContext);
  const [endDate, onChange] = useState(new Date());
  const [isCreating, setIsCreating] = useState(false);
  const [startPrice, setStartPrice] = useState("");
  const [error, setError] = useState("");

  async function startAuction() {
    try {
      console.log(arr[0]);
      if (
        auctionContract &&
        nftContract &&
        endDate.getTime() > new Date().getTime() + 300000 &&
        startPrice
      ) {
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
        setError("need to write start price, auction must go min 5 min");
        console.log("you have not auction and nft providers");
      }
    } catch (err) {
      console.log("user canceled transaction");
      setIsCreating(false);
    }
  }

  function getSeconds() {
    console.log(
      "seconds:",
      Math.floor((endDate.getTime() - new Date().getTime()) / 1000)
    );
    return endDate.getTime() / 1000;
  }

  useEffect(() => {});

  return (
    <>
      {
        <div className={cl.auction}>
          <div className={cl.message}>
            <h1>Create auction</h1>
            <h2>{error}</h2>
          </div>

          <div className={cl.container}>
            <div className={cl.image}>
              <img src={arr[0]}></img>
            </div>
            <div className={cl.details}>
              <div className={cl.info}>
                <div className={cl.title}>
                  <p>{arr[1]}</p>
                </div>
                <div className={cl.text}>
                  <p>{arr[2]}</p>
                </div>
              </div>
              <div className={cl.data}>
                <div className={cl.price}>
                  <p style={{ fontSize: "20px" }}>Start price</p>

                  <input
                    type="number"
                    onChange={(e) => {
                      setStartPrice(e.target.value);
                    }}
                    style={{ border: "1px solid red" }}
                  />
                </div>
                <div className={cl.time}>
                  <p style={{ fontSize: "20px" }}>End date</p>
                  <DateTimePicker onChange={onChange} value={endDate} />
                </div>
                <MyButton style={{ width: "200px" }} onClick={startAuction}>
                  Start Auction
                </MyButton>
              </div>
            </div>
            <div onClick={() => closeAuction()} className="cross"></div>
          </div>
          {isCreating ? <Loading /> : ""}
        </div>
      }
    </>
  );
};

export default CreateAuction;
