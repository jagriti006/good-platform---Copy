import React, { useState } from "react";
import "./index.scss";

const FloatLabel = (props) => {
  const [focus, setFocus] = useState(false);
  const { children, label, value, prefix = ''  } = props;

  const labelClass =
    label && (focus || (value && value.length !== 0) || prefix)
      ? "label label-float"
      : "label";

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
