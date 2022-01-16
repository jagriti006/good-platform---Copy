import { Button, Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import programcreationAPI from "../../../../api/programcreationAPI";
import appRoutes from "../../../../constants/app-routes";
import { PROGRAM_STATUS } from "../../../../constants/strings";
import { sidebarActions } from "../../../../redux/ui/uiActions";
import ProgramCard from "./ProgramCard";
import "./programlist.scss";
import frame1 from "../../../../assets/images/program-creation/Frame1.png";
import frame2 from "../../../../assets/images/program-creation/Frame2.png";
import frame3 from "../../../../assets/images/program-creation/Frame3.png";

const dummyStatus = ["ACTIVE", "DRAFTS", "ACHIEVED"];

const dummyData = [
  {
    id: `ID_${Math.random() * 2000}`,
    name: `NAME_${Math.random() * 2000}`,
    implementation_partner: `PARTNER_NAME_${Math.random() * 2000}`,
    logoUrl: "",
    description: `DESCRIPTION_${Math.random() * 2000}`,
    status: `${dummyStatus[Math.floor(Math.random() * dummyStatus.length)]}`,
    createdOn: "10/12/2020",
    percentageOfCompletion: `${Math.random() * 100}`,
    primaryImpact: "",
    secondaryImpact1: "",
    secondaryImpact2: ""
  }
];

const ProgramList = (props) => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   sessionStorage.setItem("projectId", "");
  //   const fetchData = async () => {
  //     dispatch(sidebarActions.showSidebar());
  //     const organisationId = sessionStorage.organisationId;
  //     const response = await programcreationAPI().fetchProgramList(organisationId);
  //     if (response?.data) {
  //       setProjects(response.data);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleProgramOverview = (project) => {
    sessionStorage.setItem("projectId", project.id);
    history.push(`${appRoutes.PROGRAM_OVERVIEW_MAIN}`);
  };

  const getProjecstByStatus = (status) => {
    // const filteredProjects = projects.filter((item) => item.status === status);
    const filteredProjects = props.data.filter((item) => item.status === status);
    // return <ProgramCard data={filteredProjects}/>
    return <ProgramCard data={filteredProjects}/>

    // return filteredProjects.map(
    //   (item) =>
    //     item.id && (
    //       <ProgramCard
    //         key={item.id}
    //         program={item.name}
    //         logoUrl={item.logoUrl}
    //         categories={[item.primaryImpact, item.secondaryImpact1, item.secondaryImpact2]}
    //         description={item.description}
    //         status={item.status}
    //         percentage={item.percentageOfCompletion}
    //         createdOn={item?.createdOn}
    //         onProgramClick={() => handleProgramOverview(item)}
    //       />
    //     )
    // );
  };

  const getTabLength = (type) => {
    // const filteredProjects = projects.filter((item) => item.status === type);
    const filteredProjects = props.data.filter((item) => item.status === type);
    return filteredProjects.length || 0;
  };

  return (
    <Row className="program-list">
      <Col xs={24} className="">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <span className="d-flex align-items-center">
                <img src={frame3} alt="" className="pad-right-5" />
                Active ({getTabLength(PROGRAM_STATUS.ACTIVE)})
              </span>
            }
            key="1"
          >
            <Row gutter={[24, 24]}>{getProjecstByStatus(PROGRAM_STATUS.ACTIVE)}</Row>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span className="d-flex align-items-center">
                <img src={frame2} alt="" className="pad-right-5" />
                Drafts ({getTabLength(PROGRAM_STATUS.DRAFT)})
              </span>
            }
            key="2"
          >
            <Row gutter={[16, 16]}>{getProjecstByStatus(PROGRAM_STATUS.DRAFT)}</Row>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span className="d-flex align-items-center">
                <img src={frame1} alt="" className="pad-right-5" />
                Achived ({getTabLength(PROGRAM_STATUS.ACHIEVED)})
              </span>
            }
            key="3"
          >
            <Row gutter={[16, 16]}>{getProjecstByStatus(PROGRAM_STATUS.ACHIEVED)}</Row>
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ProgramList;
