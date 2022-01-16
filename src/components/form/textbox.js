import React, { Component } from "react";
import { Input } from "antd";
import {preventCopyPaste} from "../../utils/utils";

export const TextBoxField = ({
  id,
  name,
  labelName,
  placeholder,
  spacing,
  size,
  onChange,
  background,
}) => {
  const { TextArea } = Input;
  const handleChange = (e) => {
    console.log(e.target.value);
    sessionStorage.setItem([e.target.name], e.target.value)
  }
  const spacingClass = `marginBottom3 ${spacing}`;
  const inputspacingClass = `${background} `;

  return (
    <div className={spacingClass}>
      <label>{labelName}</label>

      {size === "small" && <TextArea showCount maxLength={80} autoSize />}

      {size === "big" && (
        <TextArea
          name={name}
          placeholder={placeholder}
          className={inputspacingClass}
          maxLength={80}
          autoSize={{ minRows: 3, maxRows: 5 }}
          onChange={handleChange}
          onCopy={(e) => preventCopyPaste(e)}
          
          onCut={(e) => preventCopyPaste(e)}
        />
      )}
    </div>
  );
};
