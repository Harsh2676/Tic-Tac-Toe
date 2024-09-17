import React from "react";

import "./ResetButton.css";

export const ResetButton = ({ resetBoard, text }) => {
  return (
    <div className="div-btn">
      <button className="reset-btn" onClick={resetBoard}>
        {text}
      </button>
    </div>
  );
};
