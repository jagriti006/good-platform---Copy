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
import Overview from "../../../../assets/images/Overview.png";
import Icon from "../../../common/Icon";
import { Checkbox, Radio } from "antd";
const fallBackMessage = "No Data";

const BasicInfo = () => {
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
          <div id="basic_preview">
            <div className="container-fluid p-0">
              <div className="banner-section"></div>
              <div className="row">
                <div className="col-md-10 col-sm-12 right-align-section projectcreation-preview">
                  <div className="row">
                    <div className="content-info col-md-1">
                      <img height="35" src={Overview} />
                    </div>
                    <div className="content-info col-md-4">
                      <h1 className="previewHeading">Basics</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="previewLabel col-md-12">
                      <p className="m-0">
                        <b>Program Name</b>
                      </p>
                    </div>
                    <div className="previewData col-md-12">
                      <p className="m-0">
                        <b>{basicInformation.name || fallBackMessage}</b>
                      </p>
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="previewLabel col-md-12">
                      <p className="m-0">
                        <b>Field Label</b>
                      </p>
                    </div>
                    <div className="previewData col-md-12">
                      <p className="m-0">
                        <b>{basicInformation.description || fallBackMessage}</b>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="divSpace previewLabel basicfont col-md-12">
                      <p className="m-0">
                        <b>What is the duration for this program?</b>
                      </p>
                    </div>
                    <div className="previewLabel col-md-12">
                      <p className="m-0">
                        <b>Duration</b>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="m-0">{basicInformation.duration}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="m-0">{basicInformation.durationIn}{basicInformation.duration && basicInformation.duration > 1 ? "s" : ""}</p>
                    </div>
                    <div className="divSpace previewLabel basicfont col-md-12">
                      <p className="m-0">
                        <b>Who do you aim to benefit with this program?</b>
                      </p>
                    </div>
                    <div className="previewData col-md-6">
                      <p className="m-0">
                        <b>Beneficiary</b>
                      </p>
                      <Radio.Group className="checkproj">
                        <Radio>
                          <Icon
                            name="/program-creation/team-active"
                            className="ant-radio-icon"
                          />
                          People
                        </Radio>
                      </Radio.Group>
                      <br />
                      <div className="previewData col-md-10 pl-0 pt-3">
                        <p className="m-0">
                          <b>Target Category</b>
                        </p>
                        <Checkbox.Group
                          buttonStyle="solid"
                          className="checkproj"
                        >
                          {/* <Checkbox> */}
                          <Icon
                            name="/program-creation/team-static"
                            className="ant-radio-icon"
                          />
                          {basicInformation.typesOfBeneficiaries}
                          {/* </Checkbox> */}
                        </Checkbox.Group>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="duration col-md-12">
                      <p className="m-0">
                        <b>Age Range</b>
                      </p>
                      <div className="row">
                        <div className="previewLabel col-md-6">
                          <p className="m-0">
                            <b>Lower Limit</b>
                          </p>
                        </div>
                        <div className="previewLabel col-md-6">
                          <p className="m-0">
                            <b>Upper Limit</b>
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="m-0">{basicInformation.maxAge}</p>
                        </div>
                        <div className="col-md-6">
                          <p className="m-0">{basicInformation.minAge}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="previewLabel col-md-12">
                      <p className="m-0">
                        <b>Total Number Planned</b>
                      </p>
                    </div>
                    <div className="previewdata col-md-7">
                      <p className="m-0 pb-2">
                        {basicInformation.totalNumberOfBeneficiaries}
                      </p>
                    </div>
                  </div>
                  <div className="previewData col-md-4 pl-0 pt-3">
                    <p className="m-0">
                      <b>Location</b>
                    </p>
                    <Radio.Group className="checkproj">
                      <Radio>
                        <Icon
                          name="/program-creation/team-active"
                          className="ant-radio-icon"
                        />
                        Peri-Urban
                      </Radio>
                    </Radio.Group>
                  </div>
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

export default BasicInfo;
