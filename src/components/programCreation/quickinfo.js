import React, { useState, useEffect } from "react";
import { List, Tabs, Typography } from "antd";
import { Anchor } from "antd";
import axios from "axios";
import { getProjectManagementUrl } from "../../api/config";
import { appConfigurations } from "../../utils/constants";
import { message } from "antd";

import Ellipse55 from "../../assets/images/Ellipse55.png";
import Ellipse38 from "../../assets/images/Ellipse38.png";
import Ellipse39 from "../../assets/images/Ellipse39.png";
import Ellipse157 from "../../assets/images/Ellipse157.png";
import Ellipse158 from "../../assets/images/Ellipse158.png";
import ProgramcreationAPI from "../../api/programcreationAPI";

import "./previewProject/previewProject.scss";
import { useParams } from "react-router";

const { Link } = Anchor;

const { TabPane } = Tabs;
const fallBackMessage = "No Data";

const QuickInfo = (props) => {
  const [basicInformation, setBasicInformation] = useState(null);
  const [projectTeamDetails, setProjectTeamDetails] = useState(null);
  const projectId = useParams().programId;

  const [cartIsShow, setCartIsShow] = useState(false);
  const [sector, setSector] = useState("");
  const [founder, setFounder] = useState("");
  const [data, setData] = useState({
    name: "",
  });
  const showCartHAndler = () => {
    setCartIsShow(true);
  };
  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  useEffect(() => {
    const fetchBasicInformation = async () => {
      const token = sessionStorage.getItem("access_token");
      try {
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
        if (projectDetails?.data?.success && projectTeamDetails?.data?.success) {
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
    <div className="customsidebar projectcreationstyle containerfluid previewbgcoloroverview">
      <div className="row">
        <div className="col-md-12 previewbg projectcreationstyle">
          {basicInformation && projectTeamDetails ? (
            <>
              <div className="container-fluid p-0">
                <div className="banner-section"></div>
                <div className="row justify-content-end">
                  <div className="col-md-11 col-sm-12 right-align-section projectcreation-preview">
                    <div className="row">
                      <div className="content-info col-md-4"></div>
                    </div>
                    <div className="row">
                      <div className="col-md-5">
                        <p className="m-0 quickviewdura">
                          <b>Duration</b>
                        </p>
                      </div>
                      <p className="m-0 pl-3">
                        <b>{basicInformation.duration || fallBackMessage}</b>
                      </p>
                      <p className="m-0 pl-2">
                        <b>
                          {basicInformation.durationIn || fallBackMessage}
                          {basicInformation.duration && basicInformation.duration > 1 ? "s" : ""}
                        </b>

                        <sub className="mandatorydet">*these dates may be tentative</sub>
                      </p>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="duration col-md-5">
                        <p className="m-0 quickviewdura">
                          <b>Beneficiary information</b>
                        </p>
                      </div>

                      <div className="previewLabel plan col-md-2 pt-4">
                        <p className="m-0">
                          <b>Total</b>
                        </p>
                      </div>
                      <div className="previewData col-md-2 pt-4">
                        <p className="m-0">{basicInformation.totalNumberOfBeneficiaries} individuals</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="duration col-md-5"></div>
                      <div className="previewLabel plan col-md-2">
                        <p className="m-0">
                          <b>Locations</b>
                        </p>
                      </div>
                      <div className="previewData col-md-2">
                        <p className="m-0">
                          {basicInformation?.geographyModel?.[0]?.city && basicInformation?.geographyModel?.[0]?.state
                            ? `${basicInformation?.geographyModel?.[0]?.city},${basicInformation?.geographyModel?.[0]?.state}`
                            : fallBackMessage}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="duration col-md-5"></div>
                      <div className="previewLabel  plan col-md-2">
                        <p className="m-0">
                          <b>Age Range</b>
                        </p>
                      </div>
                      <div className="previewData col-md-2">
                        <p className="m-0">
                          {basicInformation.minAge && basicInformation.maxAge
                            ? `${basicInformation.minAge}-${basicInformation.maxAge} years`
                            : fallBackMessage}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="duration plan col-md-5">
                        <p className="m-0 ">
                          <b className="quickviewdura">Our Plan</b>
                          <p className="previewLabel m-0 pb-2">
                            <b>Here are the problems faced by the community/individual targetted and their needs</b>
                          </p>
                        </p>
                      </div>
                      <div className="duration plan col-md-7">
                        <p className="m-0">{basicInformation.problemFacedByTarget || fallBackMessage}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="duration plan col-md-4">
                        <p className=" previewLabel m-0 pb-2">
                          <b>These are our unique points,with regards to this program</b>
                        </p>
                      </div>
                      <div className="duration col-md-7 pb-3">
                        <p className="m-0">{basicInformation.uniqueProgramApproach || fallBackMessage}</p>
                      </div>
                      <div className="duration plan col-md-4">
                        <p className=" previewLabel m-0 pb-2">
                          <b>Key Highlights</b>
                        </p>
                      </div>
                      <div className="duration col-md-7 pb-3">
                        <p className="m-0">
                          {basicInformation.highlights &&
                          Array.isArray(basicInformation.highlights) &&
                          basicInformation.highlights.length > 0 ? (
                            basicInformation.highlights.map((highLightItem) => {
                              return <p className="m-0 pb-3">{highLightItem}</p>;
                            })
                          ) : (
                            <p className="m-0 pb-3">{fallBackMessage}</p>
                          )}
                        </p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="duration col-md-4">
                        <p className="m-0">
                          <b>Budget</b>
                        </p>
                      </div>
                      <div className="previewLabel col-md-3 pt-4">
                        <p className="m-0"/>
                      </div>
                      <div className="previewData col-md-2 pt-4">
                        <p className="m-0">
                          <img src={Ellipse38} className="pr-3" />
                          00%
                        </p>
                        <br />
                        <p className="m-0">
                          <img src={Ellipse39} className="pr-3" />
                          00%
                        </p>
                        <br />
                        <p className="m-0">
                          <img src={Ellipse157} className="pr-3" />
                          00%
                        </p>
                        <br />
                        <p className="m-0">
                          <img src={Ellipse158} className="pr-3" />
                          00%
                        </p>
                      </div>

                      <div className="previewLabel desc col-md-2 pt-4">
                        <p className="m-0">Programme Total</p>
                        <br />
                        <p className="m-0">Communication</p>
                        <br />
                        <p className="m-0">Travel</p>
                        <br />
                        <p className="m-0">Administrative</p>
                      </div>
                      <div className="row"/>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickInfo;
