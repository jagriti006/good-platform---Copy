import { Space } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";

export default ({ step, title, description }) => (
  <Space direction="vertical">
    <h5>{step}</h5>
    <h3>{title}</h3>
    <Text disabled>{description}</Text>
  </Space>
);
