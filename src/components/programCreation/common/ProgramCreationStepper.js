import { Col, Row, Steps } from "antd";
import { useEffect, useState } from "react";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import appRoutes from "../../../constants/app-routes";
import Icon from "../../common/Icon";

const { Step } = Steps;

const steps = [
  {
    title: "Basics",
    heading: "Basics",
    // description: "Add your Basic details below",
    icon: "basic-details",
    link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_BASIC}`,
  },
  {
    title: "Team",
    heading: "Team",
    // description: "Add your Team details below",
    icon: "team",
    link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_TEAM}`,
  },
  {
    title: "Key Inidcators",
    heading: "Key Inidcators",
    icon: "matrics",
    link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_METRICS}`,
  },
  {
    title: "BUDGET",
    heading: "Budget",
    icon: "budget",
    link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_BUDGET}`,
  },
  {
    title: "Donor",
    heading: "Donor",
    icon: "donor",
    link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_DONOR}`,
  },
  {
    title: "Reporting",
    heading: "Reporting",
    icon: "reporting",
    link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_REPORTING}`,
  },
  {
    title: "Organizational Approval",
    heading: "Organizational Approval",
    description: "Add team members who will be approving your proposal",
    icon: "org-approval",
    link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_ORGANIZATIONAL_APPROVAL}`,
  },
];

const ProgramCreationStepper = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [current, setcurrent] = useState(0);

  const getProjectId = () => {
    const getStringFromUrl = (path) => {
      return path.substring(
        path.indexOf(`${appRoutes.PROGRAM_CREATION}/`) +
          `${appRoutes.PROGRAM_CREATION}/`.length,
        path.lastIndexOf("/")
      );
    };
    const match = matchPath(location.pathname, {
      path: `${appRoutes.PROGRAM_CREATION}/${getStringFromUrl(
        location.pathname
      )}/:programId`,
    });

    return match && match.params.programId ? match.params.programId : "";
  };

  useEffect(() => {
    const index = steps.find(
      (item) => location.pathname.indexOf(item.link) > -1
    );

    if (index) setcurrent(steps.indexOf(index));
  }, [location.pathname]);

  const onChangeStepper = (itemIndex) => {
    const step = steps[itemIndex];
    const projectId = getProjectId();
    if (projectId) history.push(`${step.link}/${projectId}`);
  };

  const isActive = (link) => {
    return steps[current].link === link ? true : false;
  };
  return (
    <div className="program-creation-form">
      <Row justify="center" className="pt-2 program-creation-stepper">
        <Col sm={24} lg={20}>
          <Steps
            direction="horizontal"
            current={current}
            onChange={onChangeStepper}
          >
            {steps.map((step) => {
              return (
                <Step
                  key={step.title}
                  title={step.title}
                  icon={
                    <Icon
                      name={
                        isActive(step.link)
                          ? `/program-creation/${step?.icon}-active`
                          : `/program-creation/${step?.icon}-static`
                      }
                    />
                  }
                  disabled={getProjectId() ? false : true}
                />
              );
            })}
          </Steps>
        </Col>
      </Row>
      <Row justify="space-between" gutter={[16, 16]} className="form-container">
        <Col sm={24} className="pt-2">
          <Row justify="center">
            <Col xs={24} lg={20}>
              {steps[current].heading !== "" && (
                <h4 style={{
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "25px",
                  lineHeight: "37px",
                  letterSpacing: "0.01em",
                  color: "#39364F"
                }}>{steps[current].heading}</h4>
              )}
              {/*<br />*/}
              {steps[current].description !== "" && (
                <p className="headdesc">{steps[current].description}</p>
              )}
            </Col>
            <Col xs={24} lg={24}>
              {children}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProgramCreationStepper;
