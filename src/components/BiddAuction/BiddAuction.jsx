import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from "./BiddAuction.module.css";
import Countdown from "react-countdown";
import { useContext, useState } from "react";
import "../../index.scss";
import BiddContext from "../../context/BiddContext";
import { useEffect } from "react";
import ProviderContext from "../../context/ProviderContext";
import AuthContext from "../../context/AuthContext";

const BiddAuction = ({ auction, time, closeBidd }) => {
  const { accounts } = useContext(AuthContext);
  const { nftContract, auctionContract } = useContext(ProviderContext);
  const { bidd, setBidd } = useContext(BiddContext);

  async function riseBidd(e) {
    debugger;
    if (
      Number(bidd.testBidd) !== undefined &&
      Number(bidd.testBidd) > Number(auction.highestPrice)
    ) {
      setBidd({ newBidd: bidd.testBidd });
      console.log("RIGHT!!!");
    } else {
      console.log("Enter Bidd!");
    }
  }

  function currentPrice() {
    console.log("bidd", bidd.newBidd);

    if (bidd.newBidd > Number(auction.highestPrice)) {
      debugger;
      setBidd({ auctionId: auction.auctionId, newBidd: bidd.newBidd });
    }
    if (bidd.newBidd < Number(auction.highestPrice)) {
      console.log("newBidd", bidd);
      console.log("auction", auction.highestPrice);
      debugger;
      setBidd({
        auctionId: auction.auctionId,
        newBidd: Number(auction.highestPrice),
      });
    }
  }

  async function getAuctions(e) {
    const auctionId = e.target.attributes.getNamedItem("data-index").value;
    // const result = await auctionContract.auctions(auctionId);

    console.log(
      "🚀 ~ file: MyAuctions.jsx ~ line 69",
      e.target.attributes.getNamedItem("data-index").value
    );
  }

  return (
    <>
      <div key={auction.auctionId} className={cl.bidd}>
        <div className={cl.item}>
          <div className={cl.image}>
            <img src={auction.image}></img>
          </div>
          <div className={cl.info}>
            <div className={cl.description}>
              <div className={cl.title}>
                <p>{auction.title}</p>
              </div>
              <div className={cl.text}>
                <p>{auction.text}</p>
              </div>
            </div>
            <div className={cl.biddInfo}>
              <div className={cl.timer}>
                <p>Ends at</p>
                <Countdown className={cl.text} date={Date.now() + time} />
              </div>
              <div>
                <label>
                  start price
                  <input readOnly value={auction.startPrice} />
                </label>
              </div>
              <div>
                <label>
                  current price
                  <input
                    readOnly
                    value={
                      bidd.newBidd > auction.highestPrice
                        ? bidd.newBidd
                        : auction.highestPrice
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  my Bidd
                  <input
                    onChange={(e) => {
                      setBidd({ testBidd: e.target.value });
                    }}
                  />
                </label>
              </div>
              <MyButton
                data-index={Number(auction.auctionId)}
                onClick={(e) => riseBidd(e)}
              >
                Bidd
              </MyButton>
            </div>

            <div onClick={() => closeBidd()} className="cross"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiddAuction;
