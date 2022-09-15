import React from "react";
import cl from "./CreateAuction.module.css";

const CreateAuction = ({ closeDetails }) => {
  return (
    <>
      {
        <div className={cl.details}>
          <div className={cl.image}>
            <img></img>
          </div>
          <div className={cl.info}>
            <div className={cl.price}></div>
            <div className={cl.time}></div>
          </div>
          <div onClick={() => closeDetails()} className="cross"></div>
        </div>
      }
    </>
  );
};

export default CreateAuction;
