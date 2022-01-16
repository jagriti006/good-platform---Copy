import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import {preventCopyPaste} from "../../utils/utils";

export const DateField = ({
  id,
  name,
  labelName,
  placeholder,
  spacing,
  value,
  background,
  onChange,
  disabledDate
}) => {
  const spacingClass = `marginBottom3 ${spacing} formStyles`;
  console.log("date value", value);
  return (
    <div className={spacingClass}>
      <label>{labelName}</label>
      {value == "" && (
        <DatePicker
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabledDate={disabledDate}
          clearIcon={null}
          onCopy={(e) => preventCopyPaste(e)}
          
          onCut={(e) => preventCopyPaste(e)}
        />
      )}

      {value != "" && (
        <DatePicker
          name={name}
          id={id}
          placeholder={placeholder}
          value={moment(value)}
          onChange={onChange}
          disabledDate={disabledDate}
          clearIcon={null}
          onCopy={(e) => preventCopyPaste(e)}
          
          onCut={(e) => preventCopyPaste(e)}
        />
      )}
    </div>
  );
};
