import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Col, Progress, Row } from "antd";
import "./overviewBox.scss";

export const OverviewBox = ({
  id,
  title,
  description,
  percent,
  name,
  click,
  link,
  hasButton = false,
  buttonTitle = "",
  borderColorValue,
}) => {
  
  return (
    <div
      className="formStyles notice notice-info pt-3 pb-4 overview"
      onClick={() => (!hasButton ? click(link) : null)}
      style={{
        borderLeft:
          title !== "Validation" ? `8px solid ${borderColorValue}` : "0px",
      }}
    >
      <Link to={link} gutter={[16, 16]}>
        <Row align="middle" justify="center">
          {title !== "Validation" && (
            <Col xs={24} lg={2} className="d-flex justify-content-center">
              <Progress
                type="circle"
                percent={percent}
                width={50}
                strokeColor={borderColorValue}
              />
            </Col>
          )}
          <Col
            xs={24}
            lg={title !== "Validation" ? 20 : 19}
            className="p-left"
            style={{ paddingLeft: title !== "Validation" ? "25px" : "0.9rem" }}
          >
            <strong className="noticeHeading">{title} </strong>
            <br />
            <span className="noticeText"> {description}</span>
          </Col>
          <Col
            xs={24}
            lg={title !== "Validation" ? 2 : 5}
            className="d-flex justify-content-center"
          >
            {hasButton ? (
              <Button
                className={"steps-action formStyles nextbutton"}
                onClick={() => click(link)}
                style={{
                  marginRight: title !== "Validation" ? "5rem" : "1rem",
                  marginTop: "0px",
                }}
              >
                {buttonTitle}
              </Button>
            ) : (
              <div className="noticeArrow">
                <FontAwesomeIcon icon={faAngleRight} className="arrowicons" />
              </div>
            )}
          </Col>
        </Row>
      </Link>
    </div>
  );
};
