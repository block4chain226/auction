import React from "react";
import { useState } from "react";
import cl from "./Dashboard.module.css";
import Countdown from "react-countdown";
import { useEffect } from "react";
import BiddAuction from "../BiddAuction/BiddAuction";

const Dashboard = ({ activeAuction }) => {
  const [time, setTime] = useState("");
  const [biddAuction, setBiddAuction] = useState(false);
  const [endTime, setEndTime] = useState("");

  function getTimeLeft() {
    const test = 1663522419295;
    const endtime = activeAuction.totalTime * 1000;
    const currentTime = new Date().getTime();
    const leftTime = endtime - currentTime;
    console.log(
      "🚀 ~ file: MyAuctions.jsx ~ line 8 ~ timer ~ endtime",
      leftTime > 0
    );

    leftTime > 0 ? setTime(leftTime + 12000) : setTime(0);
  }

  useEffect(() => {
    getTimeLeft();
  }, [activeAuction]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "100px",
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
              <div className={cl.fl}>
                <div className={cl.overlay}>
                  <div className={cl.text}>{activeAuction.title}</div>
                </div>
                <div className={cl.overlay}>
                  <Countdown className={cl.text} date={Date.now() + time} />
                </div>
              </div>
            </div>
          </div>
        }
        {biddAuction ? <BiddAuction auction={activeAuction} /> : ""}
      </div>
    </>
  );
};

export default Dashboard;
