import React, { useContext, useState, useEffect } from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import Countdown from "react-countdown";
import cl from "./MyParticipation.module.css";
import ProviderContext from "../../context/ProviderContext";
import AuthContext from "../../context/AuthContext";

const MyParticipation = ({ auction }) => {
  const { accounts } = useContext(AuthContext);
  const { auctionContract } = useContext(ProviderContext);

  const [time, setTime] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [showAuction, setShowAuction] = useState(true);

  function getTimeLeft() {
    const endtime = auction.totalTime * 1000;
    const currentTime = new Date().getTime();
    const leftTime = endtime - currentTime;
    leftTime > 0 ? setTime(leftTime + 12000) : setTime(0);
  }

  async function withdraw() {
    const auctionBiddAmount = await auctionContract.getAuctionBiddAmount(
      accounts[0],
      auction.auctionId
    );
    if (auctionBiddAmount > 0) {
      const withdraw = await auctionContract.withdraw(auction.auctionId);
      await withdraw.wait();
      setShowAuction(false);
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
          <div className={cl.item}>
            <div className={cl.image}>
              <img src={auction.image}></img>
            </div>
            <div className={cl.info}>
              <div className={cl.title}>{auction.title}</div>
              <div className={cl.text}>{auction.text}</div>
              <div className={cl.leftTime}>
                {time > 0 && !isWithdraw ? (
                  <Countdown
                    onComplete={() => setIsWithdraw(true)}
                    date={Date.now() + time}
                  />
                ) : auction.highestBidder.toLowerCase() !==
                  accounts[0].toLowerCase() ? (
                  <MyButton onClick={withdraw}>Withdraw</MyButton>
                ) : (
                  "You will get your money when auction owner will get his nft"
                )}
              </div>
              <div className={cl.timePassed}></div>
              <div className={cl.bidder}>
                <label>
                  bidder
                  <input name="bidder" />
                </label>
              </div>
              <div className={cl.stop}></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MyParticipation;
