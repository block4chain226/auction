import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from "./BiddAuction.module.css";
import Countdown from "react-countdown";
import { useContext, useState } from "react";
import "../../index.scss";
import BiddContext from "../../context/BiddContext";
import { useEffect } from "react";
import ProviderContext from "../../context/ProviderContext";
import AuthContext from "../../context/AuthContext";
const ethers = require("ethers");

const BiddAuction = ({ auction, time, closeBidd }) => {
  const { accounts } = useContext(AuthContext);
  const { nftContract, auctionContract } = useContext(ProviderContext);
  const [highestPrice, setHighestPrice] = useState("");
  const { bidd, setBidd } = useContext(BiddContext);
  const [biddChanged, setBiddChanged] = useState(0);
  const [currentBidd, setCurrentBidd] = useState(undefined);

  async function riseBidd(e) {
    if (
      Number(bidd.newBidd) !== undefined &&
      Number(bidd.newBidd) > Number(auction.highestPrice)
    ) {
      const bidded = await auctionContract.riseBid(auction.auctionId, {
        from: accounts[0],
        value: ethers.utils.parseUnits(String(bidd.newBidd), "wei"),
      });
      await bidded.wait();
      console.log("promise done!");
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
      // debugger;
      console.log("getAuctionHighestPrice", bidd.newBidd);
      debugger;
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
                  <input readOnly defaultValue={auction.startPrice} />
                </label>
              </div>
              <div>
                <label>
                  current price
                  {/* <input readOnly value={bidd.newBidd} /> */}
                  <input readOnly value={bidd.newBidd} />
                </label>
              </div>
              <div>
                <label>
                  my Bidd
                  <input
                    onChange={(e) => {
                      setBidd({ newBidd: e.target.value });
                    }}
                  />
                </label>
              </div>
              <MyButton
                data-index={Number(auction.auctionId)}
                onClick={(e) => riseBidd(e)}
              >
                Bidd
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
