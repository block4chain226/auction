import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from "./BiddAuction.module.css";

const BiddAuction = ({ auction }) => {
  return (
    <>
      <div key={auction.auctionId} className={cl.col}>
        <div className={cl.item}>
          <div className={cl.image}>
            <img src={auction.image}></img>
          </div>
        </div>
        <MyButton>Bidd</MyButton>
      </div>
    </>
  );
};

export default BiddAuction;
