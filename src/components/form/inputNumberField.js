import React from "react";
import {Form, Input, Select, InputNumber} from "antd";
import {preventCopyPaste} from "../../utils/utils";

export const InputNumberField = ({
                                   id,
                                   name,
                                   labelName,
                                   placeholder,
                                   spacing,
                                   prefix,
                                   background,
                                   value,
                                   onChange,
                                 }) => {
  var prefixValue = {prefix};
  const spacingClass = `marginBottom3 ${spacing} formStyles`;
  const inputspacingClass = `${background} `;
  const [form] = Form.useForm();
  const {Option} = Select;

  // const onFinish = (values: any) => {
  //   console.log('Received values of form: ', values);
  // };
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="86">+86</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );
  // const type = "number";

  return (
    <div className={spacingClass}>
      <label>{labelName}</label>
      <InputNumber
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onCopy={(e) => preventCopyPaste(e)}
        
        onCut={(e) => preventCopyPaste(e)}
      />
    </div>
    // <div className="col-sm-12">
    //   <div className={spacingClass}>

    //     <Form
    //       initialValues={{
    //         prefix: '+91',
    //       }}
    //       scrollToFirstError
    //     >
    //       <Form.Item
    //         name="number"
    //         id={id}
    //         label={labelName}
    //         rules={[
    //           { min: 10, message: "maximum is 10" }
    //         ]}
    //       >
    //         <Input addonBefore={prefixSelector} name={name} value={value} onChange={onChange} />
    //       </Form.Item>
    //     </Form>
    //   </div>
    // </div>
  );
};
