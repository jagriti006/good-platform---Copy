import { DotChartOutlined, DownloadOutlined, ProjectFilled, RightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Progress } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Text from "antd/lib/typography/Text";
import React from "react";
import { PROGRAM_STATUS } from "../../../constants/strings";
import forwardIcon from "../../../assets/images/preview/vector.png";

const programCard = ({ program, categories, description, status, logoUrl, percentage, createdOn, onProgramClick }) => (
  <Col xs={22} lg={22} className="cardProperty p-4">
    {/* <div className="project-card d-flex p-4 h-100 justify-content-between align-items-center" onClick={onProgramClick}>
      <h6 className="m-0 py-2">{program}</h6>
      <div style={{ width: "12%" }}>
        <Progress percent={percentage} size="small" />
      </div>
      <div>
        {categories.map((item, index) => {
          return (
            item &&
            item !== null && (
              <Button className="impact-category-item" key={index} style={{ marginRight: "2%", marginBottom: "2%" }}>
                {item}
              </Button>
            )
          );
        })}
      </div>
      {status !== PROGRAM_STATUS.ACTIVE && <Text className="py-4 description">{description}</Text>}

      {status === PROGRAM_STATUS.ACTIVE && (
        <>
          <Row>
            <Col xs={24}>
              <div
                className="d-flex align-items-center justify-content-between my-1 p-3 rounded"
                style={{ backgroundColor: "#FFE0E0" }}
              >
                <Text>Milestone 1: Report ready!</Text>
                <RightOutlined />
              </div>
            </Col>
          </Row>
        </>
      )}
      {status === PROGRAM_STATUS.DRAFT && (
        <div className="d-flex align-items-center justify-content-between draft-footer">
          <Text>Continue with:</Text>
          <Text>
            Donor <RightOutlined />
          </Text>
        </div>
      )}
      {status === PROGRAM_STATUS.ACHIEVED && (
        <Row gutter={[16, 16]} justify="center">
          <Col xs={12}>
            <Button className="archived-button" icon={<DownloadOutlined />}>
              Final Report
            </Button>
          </Col>
          <Col xs={12}>
            <Button className="archived-button">View Case Study</Button>
          </Col>
          <Col xs={24} className="align-self-end">
            <Text className="py-4 font-weight-bold">Completed: 01 July 2010</Text>
          </Col>
        </Row>
      )}
    </div> */}
    <div className="row align-items-center" onClick={onProgramClick}>
      <div className="col">
        <h6 className="m-0 py-2">{program}</h6>
      </div>
      {status !== PROGRAM_STATUS.ACHIEVED && (
        <div className="col">
          <div className="row flex-column">
            <div className="col">{percentage}% Completed</div>
            <div className="col pr-5">
              <Progress strokeColor="#3A8D9D" strokeWidth={8} percent={percentage} size="small" showInfo={false} />
            </div>
          </div>
        </div>
      )}
      <div className="col">{createdOn}</div>
      <div className="col">
        {categories.map((item, index) => {
          return (
            item &&
            item !== null && (
              <Button className="rounded" key={index} style={{ marginRight: "2%", marginBottom: "2%" }}>
                {item}
              </Button>
            )
          );
        })}
      </div>
      {/* <div className="col"></div> */}
      <img className="pr-2 pointer" src={forwardIcon} alt="" />
    </div>
  </Col>
);

export default programCard;
