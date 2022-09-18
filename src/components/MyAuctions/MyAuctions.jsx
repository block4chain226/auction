import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from ".//MyAuctions.module.css";

const MyAuctions = ({ auction }) => {
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
            <div className={cl.leftTime}></div>
            <div className={cl.timePassed}></div>
            <div className={cl.bidder}></div>
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
