import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import LoadingSpin from "react-loading-spin";
import cl from "./BiddAuction.module.css";
import Countdown from "react-countdown";
import { useContext, useState } from "react";
import "../../index.scss";
import BiddContext from "../../context/BiddContext";
import { useEffect } from "react";
import ProviderContext from "../../context/ProviderContext";
import AuthContext from "../../context/AuthContext";
import BiddForm from "../BiddForm/BiddForm";
const ethers = require("ethers");

const BiddAuction = ({ auction, time, closeBidd }) => {
  const { accounts } = useContext(AuthContext);
  const { auctionContract } = useContext(ProviderContext);
  const { bidd, setBidd } = useContext(BiddContext);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isStillPay, setIsStillPay] = useState(false);

  async function riseBidd(e) {
    if (
      Number(bidd.newBidd) !== undefined &&
      Number(bidd.newBidd) > Number(auction.highestPrice)
    ) {
      setIsStillPay(true);
      const bidded = await auctionContract.riseBid(auction.auctionId, {
        from: accounts[0],
        value: ethers.utils.parseUnits(String(bidd.newBidd), "wei"),
      });
      await bidded.wait();
      await getAuctionHighestPrice(auction.auctionId);
    } else {
      console.log("Enter Bidd!");
    }
  }
  async function getAuctionHighestPrice(auctionId) {
    try {
      const auctionUpdate = await auctionContract.getAuction(auctionId);
      auction = auctionUpdate;
      setBidd({ newBidd: auctionUpdate.highestPrice });
      sessionStorage.setItem(
        `bidd${auction.auctionId}`,
        auctionUpdate.highestPrice
      );
      setIsStillPay(false);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem(`bidd${auction.auctionId}`)) {
      setBidd({ newBidd: auction.highestPrice });
    }
    if (sessionStorage.getItem(`bidd${auction.auctionId}`)) {
      setBidd({ newBidd: sessionStorage.getItem(`bidd${auction.auctionId}`) });
    }
    console.log(sessionStorage.getItem(`bidd${auction.auctionId}`));
  }, []);

  return (
    <>
      <div key={auction.auctionId} className={cl.bidd}>
        <div className={cl.col}>
          <div className={cl.image}>
            <img src={auction.image} />
          </div>
          <div className={cl.content}>
            <div className={cl.timer}>
              <Countdown date={Date.now() + time} />
            </div>
            <div className={cl.biddContainer}>
              <BiddForm auction={auction} />
            </div>
            <div className={cl.info}>
              <div className={cl.title}>
                <h1>{auction.title}</h1>
              </div>
              <div className={cl.text}>{auction.text}</div>
            </div>
          </div>
        </div>
        {/* <div className={cl.item}>
          <div className={cl.image}>
            <img src={auction.image}></img>
          </div>
          <div className={cl.info}>
            <Countdown className={cl.text} date={Date.now() + time} />
            <BiddForm auction={auction} closeBidd={closeBidd} />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default BiddAuction;
