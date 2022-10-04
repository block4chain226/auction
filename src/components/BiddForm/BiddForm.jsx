import React from "react";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from "./BiddForm.module.css";
import { useContext, useState } from "react";
import "../../index.scss";
import BiddContext from "../../context/BiddContext";
import { useEffect, useRef } from "react";
import ProviderContext from "../../context/ProviderContext";
import AuthContext from "../../context/AuthContext";
import Loading from "../../Ui/MyButton/Loading/Loading";
const ethers = require("ethers");

const BiddForm = ({ auction, time, showError }) => {
  const { accounts } = useContext(AuthContext);
  const { auctionContract } = useContext(ProviderContext);
  const { bidd, setBidd } = useContext(BiddContext);
  const [bestOffer, setBestOffer] = useState("");
  const [isStillPay, setIsStillPay] = useState(false);
  const inputRef = useRef(null);

  async function riseBidd(e) {
    try {
      if (
        Number(bidd) !== undefined && !sessionStorage.getItem("highestPrice")
          ? Number(bidd) > Number(auction.highestPrice)
          : Number(bidd) > Number(sessionStorage.getItem("highestPrice"))
      ) {
        console.log("high", auction.highestPrice);
        setIsStillPay(true);
        const bidded = await auctionContract.riseBid(auction.auctionId, {
          from: accounts[0],
          value: ethers.utils.parseUnits(String(bidd), "wei"),
        });
        await bidded.wait();
        inputRef.current.value = "";
        await getAuctionHighestPrice(auction.auctionId);
      } else {
        showError("empty offer field or offer value less than highest offer");
        console.log("Enter Bidd!");
      }
    } catch (err) {
      setIsStillPay(false);
    }
  }
  async function getAuctionHighestPrice(auctionId) {
    try {
      const auctionUpdate = await auctionContract.getAuction(auctionId);
      sessionStorage.setItem("highestPrice", auctionUpdate.highestPrice);
      auction = auctionUpdate;

      setBidd(undefined);
      setBestOffer(bidd);
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
    showError("");
  }, [bidd === undefined || bidd === ""]);

  useEffect(() => {
    if (!sessionStorage.getItem(`bidd${auction.auctionId}`)) {
      setBidd(auction.highestPrice);
      setBestOffer(auction.highestPrice);
    }
    if (sessionStorage.getItem(`bidd${auction.auctionId}`)) {
      setBidd(sessionStorage.getItem(`bidd${auction.auctionId}`));
      setBestOffer(sessionStorage.getItem(`bidd${auction.auctionId}`));
    }
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
                <input readOnly value={bestOffer} />
              </div>
              {time > 1 ? (
                <div className={cl.price}>
                  <p> Your offer</p>

                  <input
                    type="number"
                    ref={inputRef}
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
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {isStillPay ? <Loading /> : ""}
    </>
  );
};

export default BiddForm;
