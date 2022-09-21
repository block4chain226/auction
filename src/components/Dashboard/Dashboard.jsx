import React from "react";
import cl from "./Dashboard.module.css";

const Dashboard = ({ activeAuctions }) => {
  return (
    <>
      {activeAuctions.map((item, index) => (
        <div className={cl.col}>
          <div className={cl.item}>
            <div className={cl.image}>
              <img src={item.image} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
