import React, { useEffect, useState } from "react";
import { Collapse, Button, notification} from "antd";
import Profile1 from "../../assets/images/preview/profile1.png";
import Organisationapi from "../../api/organizationapi";
import mailbox from "../../assets/images/preview/mailbox.png";
import phone from "../../assets/images/preview/telephone.png";
import profile from "../../assets/images/preview/profile.png";
import { useParams } from "react-router";
import {SecurityScanOutlined} from "@ant-design/icons"
const { Panel } = Collapse;

function LeadershipPreview(props) {
  const [businessuserprofile, setbusinessuserprofile] = useState("");
  const [amlList, setAmlList] = useState([]);
  const user = JSON.parse(window.localStorage.getItem("user"));
  const organisationId = useParams().organisationId;
  useEffect(() => {
    handleleadership();
  }, []);

  const handleleadership = async () => {
    if (organisationId !== "") {
      Organisationapi().fetchLeadership(organisationId).then(res => {
        if (res.data) {
          setbusinessuserprofile(res.data);
          amlCheck(res.data?.organisationMembersList);
        }
      });
    }
  };

  const amlCheck = async (memList) => {
    let requests = [];
    memList &&
    memList.forEach((member) => {
          requests.push(Organisationapi().getAmlStatus(member.memberId));
        });
        const responses = await Promise.all(requests);
        if (responses.length > 0) {
          if (responses.errorCode) return;
            const arr = [];
          for (let i = 0; i < responses.length; i++) {
            arr.push(responses[i]?.data);
          }
          setAmlList(arr);
        }
  };

  const verifyAndUpdateAml = async (id) => {
    Organisationapi().verifyAml(id).then(res => {
      const result = res?.result;
      if (result) {
        const defaulter = result?.defaulterList.found && JSON.parse(result.defaulterList.found);
        const dormant = result?.dormantList.found && JSON.parse(result.dormantList.found);
        if (defaulter && dormant) {
          updateAml(id, "FAILED");
        } else {
          updateAml(id, "PASSED");
        }
      } else {
        return;
      };
    });
  };

  const updateAml = async (id, status) => {
    const orgId = window.location.pathname.split("/").pop();
    Organisationapi().updateAmlById(id, status, orgId).then(res => {
      const result = res?.result;
      if (result) {
        amlCheck(businessuserprofile?.organisationMembersList);
      } else {
        notification.warning({message: "AML Update Failed."});
      };
    });
  };

  return (
    <div id="leadership_preview">
      <div className="row">
        <img height="35" src={Profile1} />
        <h1 className="previewHeading">Leadership</h1>
      </div>
      {businessuserprofile.organisationMembersList &&
        businessuserprofile.organisationMembersList.map((memberlist, index) => (
          <div className="divSpace">
            <div className="userDetailscard">
              <h4>
                <span className="userDetailName">{memberlist.name}</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span className="userDetailType">{memberlist.type}</span>
              </h4>
              <div className="row">
                <div className="col-sm-1">
                  <img src={mailbox} />
                </div>
                <div className="col-sm-11 userDetailData">{memberlist.email}</div>
              </div>
              <div className="row">
                <div className="col-sm-1">
                  <img src={phone} />
                </div>
                <div className="col-sm-11 userDetailData">
                  {`+91 - ${memberlist.phone || "-"}`.replace(/.(?=.{3})/g, "X")}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-1">
                  <img src={profile} />
                </div>
                <div className="col-sm-11 userDetailData">
                  <span className="userDetailData">{memberlist.idProof}</span>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <span className="userDetailData">
                    {`${memberlist.idProofNumber || "-"}`.replace(/.(?=.{3})/g, "X")}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-1">
                <SecurityScanOutlined style={{ fontSize: '18px', color: '#0D3B3F' }}/>
                </div>
                <div className="col userDetailData">
                  <span className="userDetailData">
                    {`Aml Check: ${amlList[index] || "-"}`.replace("_", " ")}
                  </span>
                </div>
                {props.isValidator && (amlList[index] && amlList[index] === "NOT_CHECKED") &&
                  (<div className="col">
                    <Button size="small" onClick={() => verifyAndUpdateAml(memberlist.memberId)} >Check</Button>
                  </div>)
                }
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default LeadershipPreview;
