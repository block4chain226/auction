import React from "react";
import { useState } from "react";
import NftDetails from "../NftDetails/NftDetails";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from "./NftItem.module.css";
import CreateAuction from "../CreateAuction/CreateAuction";

const NftItem = ({ links, tokensId }) => {
  const [index, setIndex] = useState("");
  const [createAuction, setCreateAuction] = useState(false);
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
            key={tokensId[index]}
            className={cl.col}
          >
            <div
              onClick={(e) => {
                details(e);
              }}
              data-index={index}
              className={cl.item}
            >
              <div className={cl.image}>
                <img src={item[1]}></img>
              </div>
            </div>
            <MyButton>Start Auction</MyButton>
          </div>
        ))}
      {index.length > 0 && !createAuction ? (
        <NftDetails
          arr={[links[index][1], links[index][0], links[index][2]]}
          closeDetails={closeDetails}
        />
      ) : (
        ""
      )}
      {createAuction && index.length < 1 ? <CreateAuction arr={links[index][1]} closeDetails={closeDetails} /> : ""}
    </>
  );
};

export default NftItem;
