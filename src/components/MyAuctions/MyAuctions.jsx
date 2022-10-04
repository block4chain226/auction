import React, { useContext } from "react";
import { useState } from "react";
import LoadingSpin from "react-loading-spin";
import { useEffect } from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import Countdown from "react-countdown";
import cl from "./MyAuctions.module.css";
import { useRef } from "react";
import ProviderContext from "../../context/ProviderContext";
import AuthContext from "../../context/AuthContext";
import BiddForm from "../BiddForm/BiddForm";

const MyAuctions = ({ auction }) => {
  const { accounts } = useContext(AuthContext);
  const { auctionContract } = useContext(ProviderContext);
  const [bids, setBids] = useState("");
  const [time, setTime] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const titleRef = useRef();
  const [showAuction, setShowAuction] = useState(true);

  function getTimeLeft() {
    const endtime = auction.totalTime * 1000;
    const currentTime = new Date().getTime();
    const leftTime = endtime - currentTime;
    leftTime > 0 ? setTime(leftTime + 12000) : setTime(0);
    if (time < 1) {
      endAuction();
    }
  }

  async function endAuction(e) {
    try {
      await auctionContract.endAuction(auction.auctionId);
      setShowAuction(false);
      if (auction.highestBidder !== accounts[0]) {
        const myBids = await auctionContract.bids(accounts, auction.auctionId);
        setBids(myBids);
        myBids > 0 ? setIsWithdraw(true) : setIsWithdraw(false);
      } else {
        console.log("you got your money already");
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  async function withdraw() {
    if (bids > 0) {
      const auctionId = titleRef.current.props.databoard;
      const returnBids = await auctionContract.withdraw(auctionId);
    } else {
      console.log("you have not bidded!");
    }
  }

  useEffect(() => {
    getTimeLeft();
  }, [auction]);
  return (
    <>
      {showAuction ? (
        <div className={cl.col}>
          <div className={cl.image}>
            <img src={auction.image} />
          </div>
          <div className={cl.content}>
            <div className={cl.timer}>
              <Countdown date={Date.now() + time} />
            </div>
            <div className={cl.biddContainer}>
              <div>
                <p>Start price</p>
                <p>{auction.startPrice.toString()}</p>
              </div>
              <div>
                <p>Best offer</p>
                <p>{auction.highestPrice.toString()}</p>
              </div>
            </div>
            <div className={cl.info}>
              <div className={cl.title}>
                <h1>{auction.title}</h1>
              </div>
              <div className={cl.text}>{auction.text}</div>
            </div>
          </div>
          {/* <div className="cross" onClick={() => closeBidd()}></div> */}
        </div>
      ) : (
        // </div>
        ""
      )}
    </>
  );
};

export default MyAuctions;
