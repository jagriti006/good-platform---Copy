import React, { Component } from "react";
import { Steps, Button, Popover } from "antd";
import { Link } from "react-router-dom";
import BasicDetails from "./basicDetails";
// import TeamDetails from "./teamDetails/teamDetails";
import TeamDetails from "./teamDetails/teamDetailsClone";
import ReportingDetails from "./reportingDetails";
import DonorDetailsClone from "./donorDetails/donorDetailsClone";
import BudgetDetails from "./budgetDetails";
import OrganizationalApproval from "./organizationalApproval";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Redirect, Route } from "react-router";
import "../../assets/css/newdesign.css";
import DonorDetails from "./donorDetails/donorDetails";
const { Step } = Steps;

const steps = [
  {
    title: "Basic",
    link: "basicDetails",
    heading: "Basics",
    description: "Add your Basic details below",
  },
  {
    title: "Team",
    link: "teamDetails",
    heading: "Team",
    // description: "Add your Team details below",
  },
  {
    title: "Metrics",
    content: "Last-content",
  },
  {
    title: "BUDGET",
    link: "donorDetails",
    heading: "Budget",
  },
  {
    title: "Donor",
    link: "donorDetails",
    heading: "Donor",
  },
  {
    title: "Reporting",
    link: "reportingDetails",
    heading: "Reporting",
    // description: "Add your Team details below",
  },
  {
    title: "Organizational Approval",
    link: "organizationApproval",
    heading: "Organization Approval",
    // content: "Last-content",
  },
];

class ProgramCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      responseData: "",
      projectId: "",
      success: "",
      message: "",
      error: "",
    };
  }

  next = () => {
    const current = this.state.current + 1;
    // console.log(steps[current].link);
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    // console.log(steps[current].link);
    this.setState({ current });
  };

  // customDot = (dot, { status, index }) => (
  //   <Popover content={<span>Step {index}</span>}>{dot}</Popover>
  // );

  render() {
    const { current } = this.state;

    const access = sessionStorage.getItem("access_token");
    let header = sessionStorage.getItem("headerVisibility");

    if (access === null) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <div className="row">
          <div className="col-12 pt-4 bgcoloroverview">
            <div className="row justify-content-center sosidebar">
              <div className="col-sm-10">
                <Steps
                  direction="horizontal"
                  current={current}
                  // progressDot={customDot}
                  // icon={item.icon}
                  // onChange={onChangeStepper}
                >
                  {steps.map((step) => {
                    return (
                      <Step key={step.id} title={step.title} icon={step.icon} />
                    );
                  })}
                </Steps>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="steps-content width60">
              {steps[current].title === "Basic" && (
                <BasicDetails parentMethod={() => this.next()} />
              )}
              {steps[current].title === "Team" && (
                <TeamDetails
                  parentMethod={() => this.next()}
                  parentBackMethod={() => this.prev()}
                />
              )}
               {steps[current].title === "BUDGET" && (
                <BudgetDetails
                  parentMethod={() => this.next()}
                  parentBackMethod={() => this.prev()}
                />
              )}
               {steps[current].title === "DONOR" && (
                // <DonorDetails
                <DonorDetailsClone
                  parentMethod={() => this.next()}
                  parentBackMethod={() => this.prev()}
                />
              )}
              {steps[current].title === "Reporting" && (
                <ReportingDetails
                  parentMethod={() => this.next()}
                  parentBackMethod={() => this.prev()}
                />
              )}
              {steps[current].title === "Organizational Approval" && (
                <OrganizationalApproval
                  parentMethod={() => this.next()}
                  parentBackMethod={() => this.prev()}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProgramCreationForm;
