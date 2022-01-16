import React from "react";
import { Switch as AntSwitch } from "antd";

const switchStyle = {
  margin: "0 0.25rem"
};
const Switch = ({
  field: { name, value },
  form: { setFieldValue, setFieldTouched },
  onChange = () => null,
  size = "default",
  className = "",
  ...props
}) => {
  return (
    <AntSwitch
      className={`customSwitch ${className}`}
      checked={value}
      size={size}
      onChange={(checked, e) => {
        setFieldTouched(name, true);
        setFieldValue(name, checked);
        // Running the custom on change function if passed
        if (onChange) {
          onChange(checked, e);
        }
      }}
      style={switchStyle}
      {...props}
    />
  );
};

export default Switch;
