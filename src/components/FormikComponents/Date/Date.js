import React from "react";
import { DatePicker as AntDatePicker } from "antd";
import "./Date.scss";
import { formErrorTextStyle, preventCopyPaste } from "../../../utils/utils";
import FloatLabel from "../../common/float-label";


const DatePicker = ({
  visible = true,
  field: { name, value },
  form: { setFieldValue, setFieldTouched },
  onChange: customOnChange,
  onChangeRaw: onChangeRaw,
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <>
     
      <FloatLabel label={placeholder} name={name} value={value}>
        <AntDatePicker
          value={value}
          name={name}
          onChange={(value, option) => {
            setFieldValue(name, value);
            // Running the custom on change function if passed
            if (customOnChange) {
              customOnChange(value, option);
            }
          }}
          onChangeRaw={(e) => e.preventDefault()}
          onBlur={() => setFieldTouched(name, true)}
          inputprops={{ shrink: true }}
          {...props}
          onCopy={(e) => {
            preventCopyPaste(e)
          }}
          onCut={(e) => {
            preventCopyPaste(e)
          }}
        />
      </FloatLabel>
      {(props.errortext || props.errorText) && (
        <span style={formErrorTextStyle()}>{props.errortext || props.errorText}</span>
      )}
    </>
  );
};

export default DatePicker;
