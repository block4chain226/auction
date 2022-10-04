import React from "react";
import cl from "./BiddAuction.module.css";
import Countdown from "react-countdown";
import "../../index.scss";
import BiddForm from "../BiddForm/BiddForm";
import { useState } from "react";

const BiddAuction = ({ auction, time, closeBidd }) => {
  const [error, setError] = useState("");

  function showError(message) {
    setError(message);
  }
  return (
    <>
      {time > 0 ? (
        <div key={auction.auctionId} className={cl.bidd}>
          <div className={cl.message}>
            <h1>Bidd auction</h1>
            <h2>{error}</h2>
          </div>
          <div className={cl.col}>
            <div className={cl.image}>
              <img src={auction.image} />
            </div>
            <div className={cl.content}>
              <div className={cl.timer}>
                <Countdown date={Date.now() + time} />
              </div>
              <div className={cl.biddContainer}>
                <BiddForm auction={auction} time={time} showError={showError} />
              </div>
              <div className={cl.info}>
                <div className={cl.title}>
                  <h1>{auction.title}</h1>
                </div>
                <div className={cl.text}>{auction.text}</div>
              </div>
            </div>
            <div className="cross" onClick={() => closeBidd()}></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BiddAuction;
