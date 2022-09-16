import React, { useEffect } from "react";
import MyButton from "../../Ui/MyButton/MyButton";
// import "./auction.css";
import cl from "./CreateAuction.module.css";

const CreateAuction = ({ index, closeAuction }) => {
  async function startAuction() {}

  useEffect(() => {}, []);

  return (
    <>
      {
        <div style={{ position: "absolute" }} className={cl.auction1}>
          <div className={cl.details1}>
            <div className={cl.image1}>
              <img src={index}></img>
            </div>
            <div className={cl.details1}>
              <div className={cl.price1}>
                <input style={{ border: "1px solid red" }} />
              </div>
              <div className={cl.time1}>
                <input style={{ border: "1px solid red" }} />
                <MyButton onClick={startAuction}>Start Auction</MyButton>
              </div>
            </div>
            <div onClick={() => closeAuction()} className="cross"></div>
          </div>
        </div>
      }
    </>
  );
};

export default CreateAuction;
