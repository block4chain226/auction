import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from ".//MyAuctions.module.css";

const MyAuctions = ({ auction }) => {
  return (
    <>
      <div className={cl.col}>
        <div className={cl.item}>
          <div className={cl.image}>
            <img src={auction.url}></img>
          </div>
        </div>
        <div className={cl.info}>
          <div className={cl.title}></div>
          <div className={cl.text}></div>
          <div className={cl.leftTime}></div>
          <div className={cl.timePassed}></div>
          <div className={cl.bidder}></div>
          <div className={cl.stop}></div>
        </div>
        <MyButton>Start Auction</MyButton>
      </div>
    </>
  );
};

export default MyAuctions;
