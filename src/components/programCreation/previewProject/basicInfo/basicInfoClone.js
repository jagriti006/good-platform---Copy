import React, {useEffect, useState} from "react";
import "../../../../assets/css/pages.css";
import {appConfigurations} from "../../../../utils/constants";
import {message} from "antd";
import Overview from "../../../../assets/images/Overview.png";
import Icon from "../../../common/Icon";
import {Checkbox, Radio} from "antd";
import "../previewProject.scss";
import "./basicInfo.scss";
import ProgramcreationAPI from "../../../../api/programcreationAPI";
import { useParams } from "react-router";

const fallBackMessage = "No Data";

const BasicInfo = () => {
  const projectId = useParams().programId;
  const [basicInformation, setBasicInformation] = useState(null);

  useEffect(async () => {
    if (projectId){
      const projectDetails = await ProgramcreationAPI().fetchProjectbasicdetail(
        projectId
      );

      if (projectDetails?.success) {
        setBasicInformation(projectDetails?.data);
      }
    }
  }, []);

  return (
    <div id="basic_previews" className="basic_preview">
      <div className="container-fluid p-0">
        <div className="banner-section"/>
        <div className="row">
          <div className="col-md-12 col-sm-12 right-align-section projectcreation-preview">
            <div className="row">
              <div className="content-info col-md-1" style={{marginTop: 0}}>
                <img height="35" src={Overview}/>
              </div>
              <div className="content-info col-md-4" style={{marginTop: 0}}>
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
                  {basicInformation?.name || "-"}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="previewLabel col-md-12">
                <p className="m-0">
                  <b>Field Label</b>
                </p>
              </div>
              <div className="previewData col-md-12">
                <p className="m-0">
                  {basicInformation?.description || "-"}
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
                <p className="m-0">{basicInformation?.duration || 0}</p>
              </div>
              <div className="col-md-6">
                <p className="m-0">{basicInformation?.durationIn || "-"}{basicInformation?.duration && basicInformation?.duration > 1 ? "s" : ""}</p>
              </div>
              <div className="divSpace previewLabel basicfont col-md-12">
                <p className="m-0">
                  <b>Who do you aim to benefit with this program?</b>
                </p>
              </div>
              <div className="previewData col-md-6">
                <p className="m-0">
                  Beneficiary
                </p>
                <Checkbox.Group className="checkproj">
                  <Icon
                    name="/program-creation/team-active"
                    className="ant-radio-icon"
                  />
                  People
                </Checkbox.Group>
                <br/>
                <div className="previewData col-md-10 pl-0">
                  <p className="m-0">Target Category</p>
                  {basicInformation?.typesOfBeneficiaries.length > 0 ? (
                    <Checkbox.Group buttonStyle="solid" className="checkproj">
                      {basicInformation?.typesOfBeneficiaries.map((data, index) => (
                        <>
                          {/* <Checkbox> */}
                          <Icon key={index} name="/program-creation/team-static" className="ant-radio-icon"/>
                          {data}
                          {/* </Checkbox> */}
                        </>
                      ))}
                    </Checkbox.Group>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="duration col-md-12">
                <p className="m-0">Age Range</p>
                <div className="row">
                  <div className="previewLabel col-md-4">
                    <p className="m-0">
                      <b>Lower Limit</b>
                    </p>
                  </div>
                  <div className="previewLabel col-md-4">
                    <p className="m-0">
                      <b>Upper Limit</b>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="m-0">
                      <b>
                        {basicInformation?.minAge || 0} to {basicInformation?.maxAge || 0} years
                      </b>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="m-0">{basicInformation?.minAge || 0}</p>
                  </div>
                  <div className="col-md-4">
                    <p className="m-0">{basicInformation?.maxAge || 0}</p>
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
                <p className="m-0 pb-2">{basicInformation?.totalNumberOfBeneficiaries || 0}</p>
              </div>
            </div>
            <div className="previewData col-md-4 pl-0">
              <p className="m-0">
                Location
              </p>
              <Checkbox.Group className="checkproj">
                <Icon
                  name="/program-creation/team-active"
                  className="ant-radio-icon"
                />
                Peri-Urban
              </Checkbox.Group>
            </div>
            <div className="row">
              <div className="previewLabel col-md-12">
                <p className="m-0">
                  <b>Location</b>
                </p>
              </div>
              <div className="previewdata col-md-9">
                <p className="m-0 pb-2">Raigad, Maharashtra. India</p>
              </div>
              <div className="previewdata col-md-3">
                <p className="m-0 pb-2 location_data">View on Google Maps</p>
              </div>
            </div>
            <div className="row">
              <div className="divSpace previewLabel basicfont col-md-12">
                <p className="m-0">
                  <b>How do you plan to bring about this change? </b>
                </p>
              </div>
              <div className="basic_preview_question_parent">
                <div className="previewData col-md-12">
                  <p className="m-0">
                    <b>Tell us about the problems faced by the community/individual targetted and their needs?</b>
                  </p>
                </div>
                <div className="previewLabel col-md-12 basic_preview_question_child">
                  <p className="m-0">
                    <b>Tell us here</b>
                  </p>
                </div>
                <div className="col-md-12">
                  <p className="m-0">{basicInformation?.problemFacedByTarget || "-"}</p>
                </div>
              </div>
              <div className="basic_preview_question_parent">
                <div className="previewData col-md-12">
                  <p className="m-0">
                    <b>What is unique about this program’s approach with regards to the forementioned needs?</b>
                  </p>
                </div>
                <div className="previewLabel col-md-12 basic_preview_question_child">
                  <p className="m-0">
                    <b>Tell us here</b>
                  </p>
                </div>
                <div className="col-md-12">
                  <p className="m-0">{basicInformation?.uniqueProgramApproach || "-"}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="divSpace previewLabel basicfont col-md-12">
                <p className="m-0">
                  <b>What are the key highlights?</b>
                </p>
              </div>
              <div className="basic_preview_question_parent">
                <div className="previewData col-md-12">
                  <p className="m-0">
                    <b>
                      Tell us about some of the key features, highlights, approaches and goals that this program aims to
                      achieve
                    </b>
                  </p>
                </div>
                {basicInformation?.highlights.map((data, index) => (
                  <>
                    <div className="previewLabel col-md-12 basic_preview_question_child">
                      <p className="m-0">
                        <b>{index + 1}. Highlight</b>
                      </p>
                    </div>
                    <div className="col-md-12">
                      <p className="m-0">
                        {data}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
