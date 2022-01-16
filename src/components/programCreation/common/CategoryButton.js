import { Button, Col, Row } from "antd";
import React from "react";

const CategoryButton = React.forwardRef(
  ({ icon, text, added, ...rest }, ref) => (
    <Row
      direction="vertical"
      justify="center"
      align="middle"
      className="impact-category"
    >
      <Col xs={24} className="d-flex justify-content-center">
        <Button
          shape="circle"
          icon={icon}
          size="large"
          className={added ? "draggable-button-added" : "draggable-button"}
          {...rest}
          ref={ref}
        />
      </Col>
      <Col xs={24}>
        <div className="text-center item-text py-1">{text}</div>
      </Col>
    </Row>
  )
);

export default CategoryButton;
