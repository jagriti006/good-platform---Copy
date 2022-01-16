import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import validatorAPI from "../../api/validatorAPI";
import "../../assets/css/newdesign.css";
import overview from "../../assets/images/illustrators/overview.png";
import appRoutes from "../../constants/app-routes";
import { STATUS } from "../../constants/strings";
import { camelCased } from "../../utils/utils";
import LargeTolltip from "../common/large-tooltip";
import { OverviewBox } from "./overviewBox/overviewBox";

const OrganisationOverview = ({ sector, steps }) => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const organisationId = sessionStorage.getItem("organisationId");
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const [sectionStatuses, setSectionStatuses] = useState("");
  const [orgStatus, setOrgStatus] = useState();

  useEffect(() => {
    const fetchSectionwiseStatus = async () => {
      const response = await validatorAPI().fetchSectionwiseStatus(organisationId);
      if (response.data) {
        setSectionStatuses(response.data);
      }
    };
    const fetchOrganisationApprovalStatus = async () => {
      const response = await validatorAPI().fetchOrganisationApprovalStatus(organisationId);
      if (response.data) {
        setOrgStatus(response.data);
      }
    };
    if(organisationId.length !== 0){

      fetchOrganisationApprovalStatus();
      fetchSectionwiseStatus();
    }
  }, []);

  const getLink = (item) => {
    const status = sectionStatuses[`${camelCased(item.name)}Status`];
    if (orgStatus?.approvalStatus === STATUS.APPROVED) {
      return `${appRoutes.ORGANISATION}${appRoutes.ORG_PREVIEW}/${organisationId}`;
    } else {
      if (!status || status === null || status === STATUS.REJECTED) {
        return `${item.link}/${organisationId}`;
      }
      else if (status === STATUS.APPROVED) {
        return `${appRoutes.ORGANISATION}${appRoutes.ORG_PREVIEW}/${organisationId}`;
      }
    }
  };
  return (
    <div className="containerfluid pad-top-4 bgcoloroverview">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-6">
          <div className="pad-left-14">
            <h3 className="greetText">Hi {userDetails.firstName}</h3>
            {/* <p>Welcome to the Good Platform</p> */}
          </div>

          <div className="pad-left-14">
            <div className="row">
              <div className="col-md-8">
                <span className="greetMessage">Get Started by setting up your organization </span>
              </div>
              <div className="col-md-4">
                <span className="marginLeft10">
                  <span className="greetInfo">Last save 10 min ago</span>
                </span>
              </div>
            </div>
          </div>

          <div className="col-sm-12 pad-top-4">
            {steps.map((item, index) => {
              return (
                <OverviewBox
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  percent={item.percent}
                  name={item.name}
                  link={getLink(item)}
                  click={() => {}}
                  hasButton={item.hasButton || false}
                  buttonTitle={item.buttonTitle || ""}
                  borderColorValue={item.borderColorValue || ""}
                />
              );
            })}
          </div>
        </div>
        <div className="col-sm-4 mt-6 pad-right-5">
          <LargeTolltip
            title="Organization Summary"
            description="You can view the status of your account creation process here,
              once all the sections are complete you can submit it for validation!"
            onclose={() => setIsToolTipVisible(true)}
            isToolTipVisible={isToolTipVisible}
          />
          <img src={overview} alt="" className="overviewimage" />
        </div>
      </div> 
    </div>
  );
};

export default OrganisationOverview;
