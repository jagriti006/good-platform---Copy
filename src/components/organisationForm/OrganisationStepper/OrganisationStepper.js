import React, { useEffect, useState } from "react";
import { Col, Row, Steps, Popover, Divider } from "antd";
import { useHistory, useLocation } from "react-router-dom";
// import { organisationSteps } from "../organisationOverview";
import "./OrganisationStepper.scss";

const { Step } = Steps;

const overviewLandingHeading = "Want to save time? Enter the name or the registration number of your company (e.g....) and retrieve your company details";

const OrganisationStepper = ({ children, sector, stepList }) => {
  const history = useHistory();
  const location = useLocation();
  // console.log("stepList ==> ", stepList);
  const steps = [
    ...stepList.filter((isNotHideStep) => isNotHideStep.isHide === undefined),
  ];
  const displaySteps = [...stepList];
  const [current, setcurrent] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const customDot = (dot, { status, index }) => (
    <Popover content={<span>Step {index}</span>}>{dot}</Popover>
  );
  // const organisationId = "";
  const organisationId = sessionStorage.getItem("organisationId");

  const getOrganisationId = () => {
    const organisationId = sessionStorage.getItem("organisationId");
    return organisationId || "";
  };
  useEffect(() => {
    setIsHidden(false);
    const index = steps.find(
      (item) => location.pathname.indexOf(item.link) > -1
    );

    if (index) {
      setcurrent(steps.indexOf(index));
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }, [location.pathname]);

  const onChangeStepper = (itemIndex) => {
    const step = steps[itemIndex];
    const organisationId = getOrganisationId();
    if (organisationId) history.push(`${step.link}/${organisationId}`);
  };

  const isActive = (link) => {
    return steps[current].link === link ? true : false;
  };

  return (
    <>
      <div className="formStyles OrganisationForm soStyle">
        <div className="row soStyle">
          <div className="col-sm-12 pt-4 bgcoloroverview">
            <div className="row justify-content-center sosidebar">
              <div className="col-sm-10">
                <Steps
                  direction="horizontal"
                  current={current}
                  // progressDot={customDot}
                  // icon={item.icon}
                  onChange={onChangeStepper}
                  className="stepper_content_center"
                >
                  {steps.map((step) => {
                    return (
                      <Step
                        key={step.id}
                        title={step.title}
                        icon={
                          isActive(step.link) ? step.icon : step.iconInactive
                        }
                        disabled={getOrganisationId() ? false : true}
                      />
                    );
                  })}
                </Steps>
              </div>
            </div>
          </div>

          <div className="col-sm-12 pad-top-2 sobackgrocolor">
            <div className="steps-content">
              <div className="row justify-content-center">
                <div className="col-md-9 col-sm-12">
                  {steps[current]?.heading1 !== "" && (
                    <React.Fragment>
                      <h3 className="formHeading">
                        {steps[current]?.heading1 || ""}
                      </h3>
                      <Divider className={"organisationFormDivider"} />
                    </React.Fragment>
                  )}
                  {/* {steps[current].heading1 !== "" && <div><hr /></div>} */}
                  <div className="col-md-7 formPaddingZero">
                    {steps[current]?.heading !== "" && (
                      <h3 className="formHeading">
                        {isHidden
                          ? displaySteps[
                              current === 4
                                ? current + 1
                                : current === 5
                                ? current + 2
                                : current
                            ]?.heading
                          // : steps[current]?.heading}
                          : steps[current]?.id === 1 && !organisationId ? "Search for your company" : steps[current]?.heading}
                      </h3>
                    )}

                    {/* {steps[current]?.description !== "" && (
                      <p className="formInfo">{steps[current]?.description}</p>
                    )}
                     {steps[current]?.description1 !== "" && (
                      <p className="formInfo">{steps[current]?.description1}</p>
                    )} */}
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganisationStepper;
