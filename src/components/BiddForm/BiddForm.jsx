import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import LoadingSpin from "react-loading-spin";
import cl from "./BiddForm.module.css";
import Countdown from "react-countdown";
import { useContext, useState } from "react";
import "../../index.scss";
import BiddContext from "../../context/BiddContext";
import { useEffect } from "react";
import ProviderContext from "../../context/ProviderContext";
import AuthContext from "../../context/AuthContext";
const ethers = require("ethers");

const BiddForm = ({ auction }) => {
  const { accounts } = useContext(AuthContext);
  const { auctionContract } = useContext(ProviderContext);
  const { bidd, setBidd } = useContext(BiddContext);
  const [isStillPay, setIsStillPay] = useState(false);

  async function riseBidd(e) {
    if (
      Number(bidd) !== undefined &&
      Number(bidd) > Number(auction.highestPrice)
    ) {
      setIsStillPay(true);
      const bidded = await auctionContract.riseBid(auction.auctionId, {
        from: accounts[0],
        value: ethers.utils.parseUnits(String(bidd), "wei"),
      });
      await bidded.wait();
      await getAuctionHighestPrice(auction.auctionId);
    } else {
      console.log("Enter Bidd!");
    }
  }
  async function getAuctionHighestPrice(auctionId) {
    try {
      const auctionUpdate = await auctionContract.getAuction(auctionId);
      auction = auctionUpdate;
      setBidd(auctionUpdate.highestPrice);
      sessionStorage.setItem(
        `bidd${auction.auctionId}`,
        auctionUpdate.highestPrice
      );
      setIsStillPay(false);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem(`bidd${auction.auctionId}`)) {
      setBidd(auction.highestPrice);
    }
    if (sessionStorage.getItem(`bidd${auction.auctionId}`)) {
      setBidd(sessionStorage.getItem(`bidd${auction.auctionId}`));
    }
    console.log(sessionStorage.getItem(`bidd${auction.auctionId}`));
  }, []);
  return (
    <>
      <div key={auction.auctionId} className={cl.bidd}>
        <div className={cl.item}>
          <div className={cl.info}>
            <div className={cl.biddInfo}>
              <div className={cl.price}>
                <p> Start price</p>

                <input readOnly defaultValue={auction.startPrice} />
              </div>
              <div className={cl.price}>
                <p> Best offer</p>
                <input readOnly value={bidd} />
                {/* <p>{bidd}</p> */}
                {/* {isStillPay ? <LoadingSpin /> : ""} */}
              </div>
              <div className={cl.price}>
                <p> Your offer</p>
                <input
                  onChange={(e) => {
                    setBidd(e.target.value);
                  }}
                />
                <MyButton
                  data-index={Number(auction.auctionId)}
                  onClick={(e) => riseBidd(e)}
                >
                  Offer
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiddForm;
