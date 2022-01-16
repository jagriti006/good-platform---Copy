import React, { useEffect, useState } from "react";
import "../../../../assets/css/pages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { getProjectManagementUrl } from "../../../../api/config";
import { appConfigurations } from "../../../../utils/constants";
import { message } from "antd";
import { isArray, isEmpty } from "lodash";
import Overview from "../../../../assets/images/people.png";
import Icon from "../../../common/Icon";
import {
  Checkbox,
  Radio
} from "antd"; 
const fallBackMessage = "No Data";

const TeamInfo = () => {
  // const projectId = sessionStorage.getItem("projectId");
  const [basicInformation, setBasicInformation] = useState(null);
  const [projectTeamDetails, setProjectTeamDetails] = useState(null);
  useEffect(() => {
    const fetchBasicInformation = async () => {
      const token = sessionStorage.getItem("access_token");
      try {
        const projectId = sessionStorage.getItem("projectId");
        const projectDetails = await axios({
          method: "get",
          url: getProjectManagementUrl(`project/${projectId}`),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        const projectTeamDetails = await axios({
          method: "get",
          url: getProjectManagementUrl(`project-team-details/${projectId}`),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (
          projectDetails?.data?.success &&
          projectTeamDetails?.data?.success
        ) {
          setBasicInformation(projectDetails.data?.data);
          setProjectTeamDetails(projectTeamDetails.data?.data);
        } else {
          message.error(appConfigurations.general_error_message);
        }
      } catch (err) {
        message.error(appConfigurations.general_error_message);
      }
    };
    fetchBasicInformation();
  }, []);
  return (
    <>
      {basicInformation && projectTeamDetails ? (
        <>
                  <div id="team_preview">
          <div className="container-fluid p-0">
            <div className="banner-section">
            </div>
            <div className="row">
              <div className="col-md-10 col-sm-12 right-align-section projectcreation-preview">
                <div className="row">
                <div className="content-info col-md-1">
                  <img height="35" src={Overview} />
                  </div>
                  <div className="content-info col-md-4">
                  <h1 className="previewHeading">Teams</h1>
                  </div>
                </div>
              
                         <div className="row">
                  <div className="previewLabel col-md-12">
                    <p className="m-0">
                      <b>Full Name</b>
                    </p>
                  </div>
                  <div className="previewData col-md-12">
                    <p className="m-0">
                    <b>{projectTeamDetails.projectPrimaryContactRequest.fullName || fallBackMessage}</b></p>
                  </div>
                </div>
                <div className="row">
                  <div className="previewLabel col-md-12">
                    <p className="m-0">
                      <b>EmailId</b>
                    </p>
                  </div>
                  <div className="previewData col-md-12">
                    <p className="m-0">
                    {projectTeamDetails.projectPrimaryContactRequest.emailId || fallBackMessage}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="previewLabel col-md-12">
                    <p className="m-0">
                      <b>Phone Number</b>
                    </p>
                  </div>
                  <div className="previewData col-md-12">
                    <p className="m-0">
                    {projectTeamDetails.projectPrimaryContactRequest.phoneNumber || fallBackMessage}
                        </p>
                  </div>
                </div>
               
                {projectTeamDetails.projectCoreTeamRequest.map(
                    (teamItem) => {
                      return (
                        <>
                         <div className="row">
                  <div className="previewLabel col-md-12">
                    <p className="m-0">
                      <b>Full Name</b>
                    </p>
                  </div>
                  <div className="previewData col-md-12">
                    <p className="m-0">
                    <b>{teamItem.fullName || fallBackMessage}</b></p>
                  </div>
                </div>
                <div className="row">
                  <div className="previewLabel col-md-12">
                    <p className="m-0">
                      <b>EmailId</b>
                    </p>
                  </div>
                  <div className="previewData col-md-12">
                    <p className="m-0">
                    {teamItem.emailId || fallBackMessage}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="previewLabel col-md-12">
                    <p className="m-0">
                      <b>Phone Number</b>
                    </p>
                  </div>
                  <div className="previewData col-md-12">
                    <p className="m-0">
                    {teamItem.phoneNumber || fallBackMessage}
                        </p>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="previewLabel col-md-12">
                    <p className="m-0">
                      <b>Key Roles</b>
                    </p>
                  </div>
                  <div className="previewData col-md-12">
                    <p className="m-0">
                    {teamItem.keyRoleId || fallBackMessage}
                        </p>
                  </div>
                </div> */}
                <div className="row">
                  <div className="previewLabel col-md-12">
                    <p className="m-0">
                      <b>About</b>
                    </p>
                  </div>
                  <div className="previewData col-md-12">
                    <p className="m-0">
                    {teamItem.about || fallBackMessage}
                        </p>
                  </div>
                </div> 
                        </>
                      );
                    }
                  )
                  }
              </div>
            </div>
          </div>
          </div>
        </>
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
};

export default TeamInfo;
