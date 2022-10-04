import React from "react";
import LoadingSpin from "react-loading-spin";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        msTransform: "translate(-50%, -50%)",
        webkitTransform: "translate(-50%, -50%)",
      }}
    >
      <LoadingSpin size="50%" />
    </div>
  );
};

export default Loading;
