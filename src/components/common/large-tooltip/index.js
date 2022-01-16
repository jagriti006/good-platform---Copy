import React from "react";
import pointer from "../../../assets/images/pointer.png";

import "./index.scss";
const LargeTolltip = ({ title, description, onclose, isToolTipVisible }) => {
  if (isToolTipVisible) {
    return null;
  }
  return (
    <div className="large-tool-tip">
      <div className="tipbox">
        <div className="row arrow_box">
          <img src={pointer} alt="" />
          <h3 className="tooltipHeading">{title}</h3>
          <div className="closebutton">
            <button
              id="popovercloseid"
              type="button"
              class="close"
              onClick={onclose}
            >
              &times;
            </button>
          </div>
          <p className="tooltipInfo pt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LargeTolltip;
