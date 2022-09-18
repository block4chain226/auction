import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import Countdown from "react-countdown";
import cl from "./MyAuctions.module.css";
import { useRef } from "react";

const MyAuctions = ({ auction }) => {
  const [time, setTime] = useState("");
  const titleRef = useRef();
  function getTimeLeft() {
    const test = 1663595990 * 1000;
    const endtime = auction.totalTime * 1000;
    const currentTime = new Date().getTime();
    const leftTime = endtime - currentTime;
    console.log(
      "🚀 ~ file: MyAuctions.jsx ~ line 8 ~ timer ~ endtime",
      endtime
    );

    leftTime > 0 ? setTime(leftTime) : setTime(0);
  }

  async function endAuction(e) {
    // console.log(e.target.attributes.getNamedItem("data-auctionId").value);
    // const ele = document.querySelector(".MyAuctions_leftTime__2gozI");
    // console.log(ele.attributes.getNamedItem("data-auctionId").value);

    console.log(titleRef.current.props.databoard);
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
            <p>{auction.totalTime}</p>
          </div>
          <div className={cl.info}>
            <div className={cl.title}>{auction.title}</div>
            <div className={cl.text}>{auction.text}</div>
            <div data-auctionId={auction.auctionId} className={cl.leftTime}>
              {time > 0 ? (
                <Countdown
                  databoard={Number(auction.auctionId)}
                  ref={titleRef}
                  onComplete={(e) => {
                    endAuction(e);
                  }}
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
            <div data-auctionId={auction.auctionId} className={cl.stop}>
              <MyButton>Stop Auction</MyButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAuctions;
