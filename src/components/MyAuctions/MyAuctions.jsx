import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import Countdown from "react-countdown";
import cl from "./MyAuctions.module.css";

const MyAuctions = ({ auction }) => {
  const [time, setTime] = useState("");

  function getTimeLeft() {
    const test = 1663513695106;
    const endtime = auction.totalTime;
    const currentTime = new Date();
    const leftTime = test - currentTime;
    console.log(
      "🚀 ~ file: MyAuctions.jsx ~ line 8 ~ timer ~ endtime",
      new Date().getTime()
    );
    leftTime > 0 ? setTime(leftTime) : setTime(0);
  }

  useEffect(() => {
    getTimeLeft();
  }, [auction]);
  return (
    <>
      <div className={cl.col}>
        <div className={cl.item}>
          <div className={cl.image}>
            <img src={auction.image}></img>
          </div>
          <div className={cl.info}>
            <div className={cl.title}>{auction.title}</div>
            <div className={cl.text}>{auction.text}</div>
            <div className={cl.leftTime}>
              {time > 0 ? (
                <Countdown
                  onComplete={() => setTime(0)}
                  date={Date.now() + time}
                />
              ) : (
                <MyButton>Withdraw</MyButton>
              )}
            </div>
            <div className={cl.timePassed}></div>
            <div className={cl.bidder}>
              <label for="bidder">
                bidder
                <input name="bidder" />
              </label>
            </div>
            <div className={cl.stop}>
              <MyButton>Stop Auction</MyButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAuctions;
