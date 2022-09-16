import React from "react";
import { useState } from "react";
import NftDetails from "../NftDetails/NftDetails";
import MyButton from "../../Ui/MyButton/MyButton";
import cl from "./NftItem.module.css";
import CreateAuction from "../CreateAuction/CreateAuction";
import { useEffect } from "react";

const NftItem = ({ arr, links, tokensId }) => {
  const [index, setIndex] = useState("");
  const [createAuction, setCreateAuction] = useState(false);
  const [tokenId, setTokenId] = useState("");

  function details(e) {
    setIndex(e.currentTarget.attributes.getNamedItem("data-index").value);
  }

  function startAuction(e) {
    console.log("startAuction");
    setIndex(e.currentTarget.attributes.getNamedItem("data-index").value);
    setTokenId(e.currentTarget.attributes.getNamedItem("data-id").value);

    setCreateAuction(true);
  }

  function closeDetails() {
    setIndex("");
  }

  function closeAuction() {
    setIndex("");
    setCreateAuction(false);
  }
  useEffect(() => {
    console.log("tokid", tokensId);
  }, [tokensId]);

  return (
    <>
      {links &&
        tokensId &&
        links.map((item, index) => (
          <div key={tokensId[index]} className={cl.col}>
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
            <MyButton
              data-id={tokensId[index]}
              data-index={index}
              onClick={(e) => {
                startAuction(e);
              }}
            >
              Start Auction
            </MyButton>
          </div>
        ))}
      {index.length && !createAuction > 0 ? (
        <NftDetails
          arr={[links[index][1], links[index][0], links[index][2]]}
          closeDetails={closeDetails}
        />
      ) : (
        ""
      )}
      {createAuction ? (
        <CreateAuction
          tokenId={tokenId}
          arr={[links[index][1], links[index][0], links[index][2]]}
          closeAuction={closeAuction}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default NftItem;
