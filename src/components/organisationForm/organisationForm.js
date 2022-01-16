import React, { Component } from "react";
import { Steps } from "antd";
import OrganisationSearch from "./search";
import Organisation from "./organisation";
import Leadership from "./leadership";
import Location from "./location";
// import Purpose from "./purpose";
import Purpose from "./purpose/purposeClone";
// import TrackRecords from "./trackRecords";
import TrackRecords from "./trackRecordsClone";
import Beneficiaries from "./beneficiaries";
import Documents from "./document/documents";
import Legal from "./legal";
import { Redirect, Route } from "react-router";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import iconoverview from "../../assets/images/soOnboardingIcons/overviewActive.png";
import iconoverviewInactive from "../../assets/images/soOnboardingIcons/overviewInactive.png";
import iconleadership from "../../assets/images/soOnboardingIcons/leadershipInactive.png";
import iconlocations from "../../assets/images/soOnboardingIcons/locationInactive.png";
import iconpurpose from "../../assets/images/soOnboardingIcons/purposeInactive.png";
import iconTrackRecord from "../../assets/images/soOnboardingIcons/trackRecordInactive.png";
import iconDocument from "../../assets/images/soOnboardingIcons/documentInactive.png";

const { Step } = Steps;

// const [current, setCurrent] = React.useState(0);
const steps = [
  {
    title: "Organisation12345",
    link: "organisation",
    heading: "Overview",
    description: "Add your organisation details below",
    icon: <img src={iconoverview} alt="" />,
    iconInactive: <img src={iconoverviewInactive} alt="" />,
  },
  {
    title: "Leadership",
    link: "leadership",
    heading: "Leadership",
    description: "Tell us about your founder and other leadership members",
    icon: <img src={iconleadership} alt="" className="leadership" />,
    iconInactive: <img src={iconoverviewInactive} alt="" />,
  },
  {
    title: "Location",
    link: "location",
    heading: "Headquarters",
    description: "",
    icon: <img src={iconlocations} alt="" />,
    iconInactive: <img src={iconoverviewInactive} alt="" />,
  },
  {
    title: "Your Purpose",
    link: "purpose",
    heading: "Purpose",
    description: "",
    icon: <img src={iconpurpose} alt="" />,
    iconInactive: <img src={iconoverviewInactive} alt="" />,
  },

  {
    title: "Your Track Records",
    link: "trackRecord",
    heading: "History",
    description:
      "Add your organisation’s past program budgets and donors",
    icon: <img src={iconTrackRecord} alt="" />,
    iconInactive: <img src={iconoverviewInactive} alt="" />,
  },

  {
    title: "Beneficiaries",
    link: "beneficiaries",
    heading: "Impact of your Organisation",
    description: "",
    icon: <img src={iconleadership} alt="" />,
    iconInactive: <img src={iconoverviewInactive} alt="" />,
  },

  {
    title: "Documents",
    link: "documents",
    heading: "",
    description: "",
    icon: <img src={iconDocument} alt="" />,
    iconInactive: <img src={iconoverviewInactive} alt="" />,
  },
  {
    title: "Legal",
    link: "legal",
    heading: "",
    description: "",
    icon: <img src={iconleadership} alt="" />,
    iconInactive: <img src={iconoverviewInactive} alt="" />,
  },
];

class OrganisationForm extends Component {
  documentData;

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      responseData: "",
      organisationId: "",
      success: "",
      message: "",
      error: "",
    };
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    // console.log(steps[current].link);
    this.setState({ current });
  };

  render() {
    const { current } = this.state;

    const access = sessionStorage.getItem("access_token");
    let header = sessionStorage.getItem("headerVisibility");

    if (access === null) {
      return <Redirect to="/login" />;
    }
    const isActive = (link) => {
      return steps[current].link === link ? true : false;
    };
    
    return (
      <>
        <div className=" OrganisationForm">
          <div className="row">
            <div className="col-sm-12 pt-4 bgcoloroverview">
              {/* <div className="col-sm-9 pad-top-2 pad-right-10"> */}
              <div className="row justify-content-center sosidebar ">
                <div className="col-sm-10">
                  <Steps current={current} direction="horizontal">
                    {steps.map((item) => (
                      <Step
                        key={item.title}
                        title={item.title}
                        // icon={item.icon}
                        icon={
                          isActive(item.link) ? item.icon : item.iconInactive
                        }
                      />
                    ))}
                  </Steps>
                </div>
                {/* </div> */}
              </div>
            </div>
            <div className="col-sm-12 pad-top-2 pad-right-10">
              <div className="steps-content">
                <div className="row justify-content-center">
                  <div className="col-sm-8 pt-5 pl-0 bar">
                    {/* Condition to check if heading is there add h4 tag otherwise don't add anything */}
                    {steps[current].heading !== "" && (
                      <h5 className="formHeading">{steps[current].heading}</h5>
                    )}
                    {/* Condition to check if description is available for the tab then show */}
                    {steps[current].description !== "" && (
                      <p className="marginBottom10">
                        {steps[current].description}
                      </p>
                    )}

                    {steps[current].link === "search" && (
                      <OrganisationSearch parentMethod={() => this.next()} />
                    )}
                    {steps[current].link === "organisation" && (
                      <Organisation parentMethod={() => this.next()} />
                    )}
                    {steps[current].link === "leadership" && (
                      <Leadership
                        parentMethod={() => this.next()}
                        parentBackMethod={() => this.prev()}
                      />
                    )}
                    {steps[current].link === "location" && (
                      <Location
                        parentMethod={() => this.next()}
                        parentBackMethod={() => this.prev()}
                      />
                    )}
                    {steps[current].link === "purpose" && (
                      <Purpose
                        parentMethod={() => this.next()}
                        parentBackMethod={() => this.prev()}
                      />
                    )}
                    {steps[current].link === "trackRecord" && (
                      <TrackRecords
                        parentMethod={() => this.next()}
                        parentBackMethod={() => this.prev()}
                      />
                    )}
                    {steps[current].link === "beneficiaries" && (
                      <Beneficiaries
                        parentMethod={() => this.next()}
                        parentBackMethod={() => this.prev()}
                      />
                    )}
                    {steps[current].link === "documents" && (
                      <Documents
                        parentMethod={() => this.next()}
                        parentBackMethod={() => this.prev()}
                      />
                    )}
                    {steps[current].link === "legal" && (
                      <Legal
                        parentMethod={() => this.next()}
                        parentBackMethod={() => this.prev()}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default OrganisationForm;
