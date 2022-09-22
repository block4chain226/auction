import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from "./BiddAuction.module.css";
import Countdown from "react-countdown";
import "../../index.scss";

const BiddAuction = ({ auction, time, closeBidd }) => {
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
                  <input readOnly value={auction.startPrice} />
                </label>
              </div>
              <div>
                <label>
                  my Bidd
                  <input />
                </label>
              </div>
              <MyButton
                data-index={Number(auction.auctionId)}
                onClick={(e) =>
                  console.log(
                    e.target.attributes.getNamedItem("data-index").value
                  )
                }
              >
                Bidd1
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
