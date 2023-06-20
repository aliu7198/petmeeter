import React from "react";
import catCircle from "../../assets/cat-circle.png";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <img
        className="spinner"
        src={catCircle}
        alt="Cat loading circle"
        onError={(e) => {
          e.currentTarget.src =
            "https://cdn.discordapp.com/attachments/1118675490870399017/1120479857046990958/icon-image-not-found-free-vector.png";
        }}
      />
    </div>
  );
};

export default Loading;
