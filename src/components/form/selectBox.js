import React, { Component } from "react";
import { Select } from "antd";
import {preventCopyPaste} from "../../utils/utils";

export const SelectBox = ({
  id,
  name,
  labelName,
  placeholder,
  spacing,
  optionList,
  background,
  onChange,
  value,
  onClick,
  options,
}) => {
  const { Option } = Select;
  // let value = "";
  // const handleChange = (event) => {
  //   let stateName = event.target.name;
  //   let value = event.target.value;

  //   console.log(stateName);
  //   console.log(value);
  //   console.log(this.state);
  // };

  function handleChange(value) {
    value = `${value}`;
    // this.setState({ value: selectedValue });
    console.log(value);
  }
  // console.log(optionList);
  const spacingClass = `marginBottom3 ${spacing} formStyles`;

  return (
    <div className={spacingClass}>
      <label>{labelName}</label>
      <Select
        showSearch
        // id={id}
        placeholder={placeholder}
        // onChange={handleChange}
        value={value}
        className="selectForm"
        onChange={onChange}
        // onClick={onClick}
        options={options}
        onCopy={(e) => preventCopyPaste(e)}
        
        onCut={(e) => preventCopyPaste(e)}
      >
        {optionList.map((item, index) => {
          return (
            <Option
              id={index}
              value={item.value}
            // key={item.id}
            >
              {item.value}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
