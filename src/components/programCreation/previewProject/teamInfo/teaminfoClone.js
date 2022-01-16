import React, {useEffect, useState} from "react";
import "../../../../assets/css/pages.css";
import {appConfigurations} from "../../../../utils/constants";
import {message} from "antd";
import Overview from "../../../../assets/images/people.png";
import {FormOutlined, MailOutlined, PhoneOutlined, ScanOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text";
import ProgramcreationAPI from "../../../../api/programcreationAPI";
import "../previewProject.scss";
import "./teamInfo.scss";
import { useParams } from "react-router";
import adhaarIcon from "../../../../assets/images/Adhaar.png";
import callIcon from "../../../../assets/images/callIcon.png";
import emailIcon from "../../../../assets/images/emailIcon.png";

const fallBackMessage = "No Data";

const TeamInfo = () => {
  const projectId = useParams().programId;
  const [projectTeamDetails, setProjectTeamDetails] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(async () => {
    if (projectId){
      const projectTeamDetails = await ProgramcreationAPI().fetchProjectteamdetails(projectId);

      if (projectTeamDetails?.data) {
        setProjectTeamDetails(projectTeamDetails.data);
      }
    }
  }, []);

  useEffect(() => {
    const fetchAsyncData = async () => {
      const response = await ProgramcreationAPI().fetchProjetcKeyRoles();
      if (response?.data?.projectTeamAllRolesResponse) {
        const roles = response?.data.projectTeamAllRolesResponse.map((item) => {
          return {
            value: item.id,
            label: item.role,
          };
        });
        setRoles(roles);
      }
    };
    fetchAsyncData();
  }, []);

  return (
    <div id="team_previews" className="team_preview">
      <div className="container-fluid p-0">
        <div className="banner-section"/>
        <div className="row">
          <div className="col-md-12 col-sm-12 right-align-section projectcreation-preview">
            <div className="row">
              <div className="content-info col-md-1">
                <img height="35" src={Overview}/>
              </div>
              <div className="content-info col-md-4">
                <h1 className="previewHeading">Teams</h1>
              </div>
            </div>

            {projectTeamDetails?.projectCoreTeamRequest.map((data, index) => (
              <div className="row" key={index}>
                <div className="m-2 p-4 team_preview_card">
                  <div className={"displayFlex justify-content-between"}>
                    <Text className={"font-weight-bold"}>{`${data.firstName} ${data.lastName}`}</Text>
                    <div>
                      <FormOutlined className="team_preview_card_edit"/>
                    </div>
                  </div>
                  <div className={"my-2"}>
                    <img src={emailIcon} alt={""}/>
                    <Text className={"ml-3"}>{data.emailId}</Text>
                  </div>
                  <div className={"my-2"}>
                    <img src={callIcon} alt={""}/>
                    <Text className={"ml-3"}>{`+91 - ${data.phoneNumber || "-"}`.replace(/.(?=.{3})/g, "X")}</Text>
                  </div>
                  <div className={"my-2"}>
                    <img src={adhaarIcon} alt={""}/>
                    <Text
                      className={"ml-3"}>{roles && roles.filter((roleData) => roleData.value === data.positionId)[0]?.label}</Text>
                  </div>
                </div>
              </div>
            ))}

            {projectTeamDetails && (
              <>
                {projectTeamDetails?.projectPrimaryContactRequest && (
                  <div className="row justify-content-center team_preview_heirarchy_fparent">
                    <div className="col-md-4 team_preview_heirarchy_fpchild">
                      {projectTeamDetails?.projectPrimaryContactRequest?.fullName}
                    </div>
                  </div>
                )}

                {projectTeamDetails?.projectCoreTeamRequest.length && (
                  <div className={"row justify-content-around team_preview_heirarchy_sparent"}>
                    {projectTeamDetails?.projectCoreTeamRequest.map((data, index) => {
                      return (
                        <div className={"col-md-6"}>
                          <div
                            className="team_preview_heirarchy_spchild1"
                            style={{
                              marginRight: `${index % 2 === 0 ? "3rem" : 0}`,
                              marginLeft: `${index % 2 !== 0 ? "3rem" : 0}`,
                              borderRightWidth: index % 2 === 0 ? "1px" : 0,
                              borderLeftWidth: index % 2 !== 0 ? "1px" : 0,
                            }}
                          />
                          <div
                            className="team_preview_heirarchy_spchild2"
                            style={{
                              background: `${index % 2 === 0 ? "#B0D1D8" : "#fce0e0"}`,
                            }}
                          >
                            {data.firstName}
                          </div>
                        </div>
                      );
                    })}
                    {projectTeamDetails?.projectCoreTeamRequest.length % 2 !== 0 && <div className={"col-md-6"}/>}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
