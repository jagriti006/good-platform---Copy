import { ArrowRightOutlined, DotChartOutlined, ProjectFilled } from "@ant-design/icons";
import { Avatar, Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import validatorAPI from "../../api/validatorAPI";
import { sidebarActions } from "../../redux/ui/uiActions";
import Icon from "../common/Icon";

const ValidatorDashboard = () => {
  const [orgCount, setOrgCount] = useState("");
  const [progCount, setProgCount] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const response = await validatorAPI().fetchDashboardOrganisationCounts();
      const responseProg = await validatorAPI().fetchDashboardProjectCounts();
      if (response.data) {
        setOrgCount(response.data);
      }
      if (responseProg.data) {
        setProgCount(responseProg.data);
      }
    };
    fetchData();
    dispatch(sidebarActions.showSidebar());
  }, []);
  return (
    <>
      <Row gutter={(16, 16)}>
        <Col xs={24} className="p-3 d-flex">
          <div className="welcome-banner p-5">
            <h1>Welcome to</h1>
            <h1>The Good Platform</h1>
            <h6>Your profile will be validated in 48 hours</h6>
            <p>Once you recieve your validation you can start creating programs and build your network</p>
          </div>
        </Col>
        <Col xs={24} className="px-5 my-1">
          <Row gutter={[16, 16]}>
            <ValidatorDashboardCard
              background={"#B0D1D8"}
              icon={<Icon name={`/validator/proposals-in-review`} />}
              iconBackground={"#10A3BF"}
              count={orgCount.reviewCount || 0}
              text={"Organisations in review"}
            />
            <ValidatorDashboardCard
              background={"#E5DFF7"}
              icon={<Icon name={`/validator/approved-proposals`} />}
              iconBackground={"#BDB0EB"}
              count={orgCount.approvedCount || 0}
              text={"Approved Organisation"}
            />
            <ValidatorDashboardCard
              background={"#FFEEB5"}
              icon={<Icon name={`/validator/rejected-proposals`} />}
              iconBackground={"#FFD447"}
              count={orgCount.rejectedCount || 0}
              text={"Rejected Organisation"}
            />
          </Row>
        </Col>
        <Col xs={24} className="px-5 my-1">
          <Row gutter={[16, 16]}>
            <ValidatorDashboardCard
              background={"#B0D1D8"}
              icon={<Icon name={`/validator/proposals-in-review`} />}
              iconBackground={"#10A3BF"}
              count={progCount.reviewCount || 0}
              text={"Proposals in review"}
            />
            <ValidatorDashboardCard
              background={"#E5DFF7"}
              icon={<Icon name={`/validator/approved-proposals`} />}
              iconBackground={"#BDB0EB"}
              count={progCount.approvedCount || 0}
              text={"Approved Proposals"}
            />
            <ValidatorDashboardCard
              background={"#FFEEB5"}
              icon={<Icon name={`/validator/rejected-proposals`} />}
              iconBackground={"#FFD447"}
              count={progCount.rejectedCount || 0}
              text={"Rejected Proposals"}
            />
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="py-5 px-5">
        <ProgramCard
          title="Currently Reviewing"
          programName={"Pathways to Progress"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
          categories={["Education", "Employment", "Financial Inclusion"]}
        />
      </Row>
      <Row gutter={[16, 16]} align="middle" className="p-5 dashboard-image-row">
        <Col xs={16}>
          <Icon name={`/validator/dashboard-image`} />
        </Col>
        <Col xs={8}>
          <div>
            <div>
              <Icon name={`/validator/help`} />
            </div>
            <h6>How The Good Platform Works?</h6>
            <p>
              You will receive proposals from social organisations prior to the donation cycle. Your validation will
              help ensure a smooth, transparent experience for the prospective donors.
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

const ValidatorDashboardCard = ({ background, icon, iconBackground, count, text }) => {
  return (
    <Col xs={24} lg={8}>
      <div className="validator-card px-4" style={{ backgroundColor: background }}>
        <div className="d-flex justify-content-between align-items-center">
          <h1>{count}</h1>
          <div style={{ backgroundColor: iconBackground }} className="card-icon">
            {icon}
          </div>
        </div>
        <div>{text}</div>
      </div>
    </Col>
  );
};

const ProgramCard = ({ title, programName, logoUrl, categories }) => {
  return (
    <>
      <Col xs={12}>
        <h5 className="program-status-title">{title}</h5>
      </Col>
      <Col xs={24} className="project-card  d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column p-4 h-100 justify-content-between">
          <Avatar size={50} icon={<ProjectFilled />} src={logoUrl} className="mx-1" />
          <h6 className="m-0 py-2">{programName}</h6>
          <div>
            {categories.map((item, index) => {
              return (
                item &&
                item !== null && (
                  <Button className="impact-category-item" key={index}>
                    <DotChartOutlined />
                    {item}
                  </Button>
                )
              );
            })}
          </div>
        </div>
        <div className="pr-4 d-flex align-items-center">
          Continue where you left off <ArrowRightOutlined className="ml-1" />
        </div>
      </Col>
    </>
  );
};

export default ValidatorDashboard;
