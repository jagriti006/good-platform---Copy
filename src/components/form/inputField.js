import React from "react";
import { Input } from "antd";
import {preventCopyPaste} from "../../utils/utils";

export const InputField = ({
  id,
  name,
  labelName,
  placeholder,
  spacing,
  prefix,
  background,
  value,
  onChange,
  maxLength,
  onInput,
  type,
  validate,
  disabled
}) => {
  var prefixValue = { prefix };
  const spacingClass = `marginBottom3 ${spacing} formStyles`;
  const inputspacingClass = `${background} `;

  return (
    <div className={spacingClass}>
      <label>{labelName}</label>

      {prefixValue == "" && (
        <Input
          name={name}
          id={id}
          className={inputspacingClass}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          validate={validate}
          onCopy={(e) => preventCopyPaste(e)}
          
          onCut={(e) => preventCopyPaste(e)}
        />
      )}

      {prefixValue !== "" && (
        <Input
          addonBefore={prefix}
          name={name}
          id={id}
          maxLength={maxLength}
          type={type}
          className={inputspacingClass}
          placeholder={placeholder}
          value={value}
          type={type}
          onInput={onInput}
          onChange={onChange}
          disabled={disabled}
          onCopy={(e) => preventCopyPaste(e)}
          
          onCut={(e) => preventCopyPaste(e)}
        />
      )}

      {/* {type == "number" && (
        <Input
          addonBefore={prefix}
          name={name}
          id={id}
          maxLength={maxLength}

          className={inputspacingClass}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={onChange}
        />
      )} */}
    </div>
  );
};

