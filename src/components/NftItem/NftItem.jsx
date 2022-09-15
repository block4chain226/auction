import React, { useEffect } from "react";
import { useState } from "react";
import NftDetails from "../NftDetails/NftDetails";
import cl from "./NftItem.module.css";

const NftItem = ({ links, tokensId }) => {
  const [index, setIndex] = useState("");
  function details(e) {
    setIndex(e.currentTarget.attributes.getNamedItem("data-index").value);
  }
  function closeDetails() {
    setIndex("");
  }
  return (
    <>
      {links &&
        tokensId &&
        links.map((item, index) => (
          <div
            data-id={tokensId[index]}
            data-index={index}
            onClick={(e) => {
              details(e);
            }}
            key={item[1].toString()}
            className={cl.col}
          >
            <div className={cl.item}>
              <div className={cl.image}>
                <img src={item[1]}></img>
              </div>
              <div className={cl.info}>
                <div className={cl.name}>
                  <p>{item[0]}</p>
                </div>
                <div className={cl.price}>
                  <p>{item[2]}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      {index.length > 0 ? (
        <NftDetails
          arr={[links[index][1], links[index][0], links[index][2]]}
          closeDetails={closeDetails}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default NftItem;
