import React, { useEffect, useState } from "react";
import { OverviewBox } from "../../organisationForm/overviewBox/overviewBox";
import appRoutes from "../../../constants/app-routes";
import ProgramcreationAPI from "../../../api/programcreationAPI";
import { fetchUserData } from "../../../redux/user/userActions";
import { useDispatch } from "react-redux";
import "./programOverviewMain.scss";
import timer from "../../../assets/images/program-creation/timer.svg";
import Ellipse55 from "../../../assets/images/Ellipse55.png";
import Line165 from "../../../assets/images/program-creation/Line 165.png";
import education from "../../../assets/images/program-creation/education.png";
import Employment from "../../../assets/images/program-creation/Employment.png";
import Financial from "../../../assets/images/program-creation/Financial services.png";
import Group1843 from "../../../assets/images/program-creation/Group 1843.png";
import Vector62 from "../../../assets/images/program-creation/Vector 62.png";
import { sidebarActions } from "../../../redux/ui/uiActions";
import validatorAPI from "../../../api/validatorAPI";
import { STATUS } from "../../../constants/strings";
import { camelCased } from "../../../utils/utils";
import { useParams } from "react-router";

const ProgramOverviewMain = () => {
  const dispatch = useDispatch();
  const { programId } = useParams();
  const [sector, setSector] = useState("");
  const [sectionStatuses, setSectionStatuses] = useState("");
  const [projectStatus, setProjectStatus] = useState();

  useEffect(() => {
    const fetchSectionwiseStatus = async () => {
      const response = await validatorAPI().fetchProjectSectionwiseStatus(programId);
      if (response.data) {
        setSectionStatuses(response.data);
      }
    };
    const fetchOrganisationApprovalStatus = async () => {
      const response = await validatorAPI().fetchProjectApprovalStatus(programId);
      if (response.data) {
        setProjectStatus(response.data);
      }
    };
    fetchOrganisationApprovalStatus();
    fetchSectionwiseStatus();
  }, []);

  const getLink = (item) => {
    const status = sectionStatuses[`${camelCased(item.name)}Status`];
    if (projectStatus?.status === STATUS.APPROVED) {
      return `${appRoutes.PROGRAM_CREATION}${appRoutes.PROGRAM_PREVIEW}/${programId}`;
    } else {
      if (!status || status === null || status === STATUS.REJECTED) {
        return `${item.link}/${programId}`;
      }
      else if (status === STATUS.APPROVED) {
        return `${appRoutes.PROGRAM_CREATION}${appRoutes.PROGRAM_PREVIEW}/${programId}`;
      }
    }
  };

  const fetchPercent = async () => {
    if (programId) {
      const response = await ProgramcreationAPI().fetchPercent(programId);
      if (response.data) {
        setSector(response.data);
      }
    }
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchUserData());
    };    
    fetchData();
    fetchPercent();
    dispatch(sidebarActions.showSidebar())
  }, []);

  const programSteps = [
    {
      id: 1,
      title: "Basic",
      name:"basics",
      description: "All the General details",
      percent: `${sector.basicPercentageCompletion}`,
      time: "approx 25 mins",
      link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_BASIC}`,
      heading: "Basic",
    },
    {
      id: 2,
      title: "Team",
      name:"team",
      description: "Primary contact and the core team",
      percent: `${sector.teamPercentageCompletion}`,
      time: "approx 25 mins",
      link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_TEAM}`,
      heading: "Team",
    },
    {
      id: 3,
      title: "Key Indicators",
      name:"key-indicators",
      description: "Data and metrics as per IRIS",
      percent: `${sector.metricsPercentageCompletion}`,
      time: "approx  25 mins",
      link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_METRICS}`,
      heading: "Key Indicators",
    },
    {
      id: 4,
      title: "Budget",
      name:"budget",
      description: "Budget and breakdown",
      percent: `${sector.budgetPercentageCompletion}`,
      time: "approx 15 mins",
      link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_BUDGET}`,
      heading: "Budget",
    },
    {
      id: 5,
      title: "Donor",
      name:"donor",
      description: "Individuals or companies funding the program",
      percent: `${sector.donorPercentageCompletion}`,
      time: "approx 15 mins",
      link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_DONOR}`,
      heading: "Donor",
    },
    {
      id: 6,
      title: "Reporting",
      budget:"reporting",
      description: "Internal and external monitoring and reporting standards",
      percent: `${sector.monitoringReportingPercentageCompletion}`,
      time: "approx 15 mins",
      link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_REPORTING}`,
      heading: "Reporting",
    },
    {
      id: 7,
      title: "Organisational approval",
      description: "Add 2 members of your team who will approve the proposal",
      percent: "0%",
      time: "approx 15 mins",
      link: `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_ORGANIZATIONAL_APPROVAL}`,
      heading: "Monitoring and Reporting",
    },
  ];

  return (
    <div className="containerfluid pad-top-4 programbgcoloroverview">
      <div className="row">
        {/* <div className="col-md-1" /> */}
        <div className="col-md-8">
          <div className="pad-left-14">
            <h1 className="programgreetText">We've set up your program!</h1>
          </div>

          <div className="pad-left-14">
            <div className="row">
              <div className="col-md-8">
                <span className="programgreetMessage">
                  Add all details of your program to get it validated before publishing
                </span>
              </div>
            </div>
          </div>

          <div className="col-sm-12 pad-top-4">
            {programSteps.map((item, index) => {
              return (
                <OverviewBox
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  percent={item.percent}
                  time={item.time}
                  link={getLink(item)}
                  click={() => {}}
                  hasButton={item.hasButton || false}
                  buttonTitle={item.buttonTitle || ""}
                />
              );
            })}
          </div>
        </div>
        <div className="col-md-4 programContainer">
          <div className="card-container" style={{ margin: "1rem" }}>
            <div className="programContentDiv">
              <h5 className="cardHeading previewProgramName">Pathways to Progress</h5>
              <img src={Ellipse55} alt="" className="inprogess_image" />
            </div>
            <div className="inprogress_div">
              <img src={timer} alt="" className="programoverviewimage" />
              <p className="inprogress_div_text">In Progress</p>
            </div>
            <div className="programContent">
              <h5 className="programCardHeading">Overview</h5>
              <p className="programCardLoc pt-3">Date</p>
              <div className="overview_div">
                <img src={Line165} alt="" className="overview_div_img" />
                <p className="overview_div_p">Months</p>
              </div>
              <hr style={{ width: "100%" }} />
              <p className="programCardLoc pt-3">Category</p>
              <div className="overview_div">
                <img src={education} alt="" className="overview_div_img" />
                <p className="overview_div_p">Education</p>
              </div>
              <div className="overview_div">
                <img src={Employment} alt="" className="overview_div_img" />
                <p className="overview_div_p">Employment</p>
              </div>
              <div className="overview_div">
                <img src={Financial} alt="" className="overview_div_img" />
                <p className="overview_div_p">Financial Inclusion</p>
              </div>
              <hr style={{ width: "100%" }} />
              <p className="programCardLoc">Primary Contact</p>
              <div className="overview_div">
                <img src={Line165} alt="" className="overview_div_img" />
              </div>
              <div className="form-group textCenter programForm">
                <button type="submit" className="btn programButton">
                  SUBMIT FOR VALIDATION
                </button>
              </div>
            </div>

            <div className="programContent">
              <img src={Group1843} alt="" />
              <div className="programContentDiv">
                <h5 className="programCardHeading programCardHeadingText">Want to know how to ace your proposal?</h5>
                <img src={Vector62} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramOverviewMain;
