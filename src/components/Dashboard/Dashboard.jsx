import React from "react";
import { useState } from "react";
import cl from "./Dashboard.module.css";
import Countdown from "react-countdown";
import { useEffect } from "react";
import BiddAuction from "../BiddAuction/BiddAuction";

const Dashboard = ({ activeAuction }) => {
  const [time, setTime] = useState("");
  const [biddAuction, setBiddAuction] = useState(false);

  function getTimeLeft() {
    const endtime = activeAuction.totalTime * 1000;
    const currentTime = new Date().getTime();
    const leftTime = endtime - currentTime;
    leftTime > 0 ? setTime(leftTime + 12000) : setTime(0);
  }

  function closeBidd() {
    setBiddAuction(false);
  }

  useEffect(() => {
    getTimeLeft();
  }, [activeAuction]);
  return (
    <>
      {time > 0 ? (
        <div
          style={{
            display: "flex",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {
            <div
              className={cl.col}
              onClick={() => {
                setBiddAuction(true);
              }}
            >
              <div className={cl.container}>
                <img src={activeAuction.image} className={cl.image}></img>
                <div className={cl.overlay}>
                  <Countdown className={cl.text} date={Date.now() + time} />
                </div>
              </div>
            </div>
          }
          {biddAuction ? (
            <BiddAuction
              auction={activeAuction}
              time={time}
              closeBidd={closeBidd}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
