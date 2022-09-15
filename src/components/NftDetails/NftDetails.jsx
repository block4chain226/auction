import React from "react";
import cl from "./NftDetails.module.css";
import "../../index.css";

const NftDetails = ({ arr, closeDetails }) => {
  return (
    <>
      {
        <div className={cl.details}>
          <div className={cl.image}>
            <img src={arr[0]}></img>
          </div>
          <div className={cl.info}>
            <div className={cl.name}>
              <p>{arr[1]}</p>
            </div>
            <div className={cl.text}>
              <p>{arr[2]}</p>
            </div>
          </div>
          <div onClick={() => closeDetails()} className="cross"></div>
        </div>
      }
    </>
  );
};

export default NftDetails;
