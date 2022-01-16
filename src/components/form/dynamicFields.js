import React from "react";
import { InputField } from "./inputField";
import { SelectBox } from "./selectBox";
import { DateField } from "./dateField";
import { RadioButton } from "./radioButton";
import { Form, Input, Button, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {preventCopyPaste} from "../../utils/utils";

const { TextArea } = Input;

export const DynamicFields = ({ arrayList }) => {
  const onChangedemo = (value, id, e) => {

    console.log(value, "demo");
  };

  return (
    <div className="col-sm-12">
      <Form name="dynamic_form_nest_item" autoComplete="off">
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, value, fieldKey, ...restField }) => (
                <>
                  <hr />

                  <Space
                    key={key}
                    style={{ display: "block", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div style={{ float: "right" }}>
                      <MinusOutlined onClick={() => remove(name)} />
                    </div>
                    {arrayList.map((additem, index) => {
                      return (
                        <Form.Item
                          {...restField}
                          name={[name, additem.name]}
                          fieldKey={[fieldKey, additem.name]}
                        // value={[value, additem.value]}
                        >
                          {additem.type === "text" && (
                            <InputField
                              placeholder={additem.placeholder}
                              labelName={additem.labelName}
                              name={additem.name}
                              prefix={additem.prefix}
                              background={additem.background}
                              spacing={additem.spacing}
                              value={additem.value}
                              onChange={(e, id) => onChangedemo(e, id)}
                            />
                          )}

                          {additem.type === "radio" && (
                            <RadioButton
                              placeholder={additem.placeholder}
                              labelName={additem.labelName}
                              spacing={additem.spacing}
                              name={additem.name}
                              optionList={additem.optionList}
                              background={additem.background}
                              value={additem.value}
                            />
                          )}

                          {additem.type === "select" && (
                            <SelectBox
                              key={additem.id}
                              id={additem.id}
                              name={additem.name}
                              placeholder={additem.placeholder}
                              labelName={additem.labelName}
                              spacing={additem.spacing}
                              optionList={additem.optionList}
                              value={additem.value}

                            />
                          )}

                          {additem.type === "textbox" && (
                            <TextArea
                              placeholder=""
                              maxLength={80}
                              autoSize={{ minRows: 3, maxRows: 5 }}
                              onCopy={(e) => preventCopyPaste(e)}
                              
                              onCut={(e) => preventCopyPaste(e)}
                            />
                          )}
                        </Form.Item>
                      );
                    })}
                  </Space>
                </>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};
