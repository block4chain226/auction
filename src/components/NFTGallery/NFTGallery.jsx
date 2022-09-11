import React from "react";
import cl from "./NFTGallery.module.css";

const NFTGallery = () => {
  return (
    <>
      <div className={cl.container}>
        <div className={cl.col}>
          <div className={cl.item}>
            <div className={cl.image}></div>
            <div className={cl.info}>
              <div className={cl.name}></div>
              <div className={cl.price}></div>
            </div>
          </div>
        </div>
        <div className={cl.col}>
          <div className={cl.item}>
            <div className={cl.image}></div>
            <div className={cl.info}>
              <div className={cl.name}></div>
              <div className={cl.price}></div>
            </div>
          </div>
        </div>
        <div className={cl.col}>
          <div className={cl.item}>
            <div className={cl.image}></div>
            <div className={cl.info}>
              <div className={cl.name}></div>
              <div className={cl.price}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTGallery;
