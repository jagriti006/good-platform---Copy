import { Alert, Anchor } from "antd";
import React, { useState } from "react";
import { STATUS } from "../../../constants/strings";
import { camelCased } from "../../../utils/utils";
import BasicInfo from "./basicInfo/basicInfoClone";
import BudgetInfo from "./budgetInfo/budgetInfo";
import DonorInfo from "./donorInfo/donorInfo";
import MetricInfo from "./metricInfo/metricInfo";
import "./previewProject.scss";
import ReportingInfo from "./reportingInfo/reportingInfo";
import TeamInfo from "./teamInfo/teaminfoClone";

const { Link } = Anchor;

export const componentArr = [
  { link: "#basic_previews", component: <BasicInfo />, title: "Basics" },
  { link: "#team_previews", component: <TeamInfo />, title: "Team" },
  { link: "#metrics_previews", component: <MetricInfo />, title: "Key Indicators" },
  { link: "#budget_previews", component: <BudgetInfo />, title: "Budget" },
  { link: "#donor_previews", component: <DonorInfo />, title: "Donor" },
  { link: "#reporting_previews", component: <ReportingInfo />, title: "Reporting" },
];

const Detailview = (props) => {
  const [sectionStatuses, setSectionStatuses] = useState("");
  const handleClick = (e, link) => {
    e.preventDefault();
  };

  const getComponents = () => {
    const getAlertColor = (status) => {
      if (status === STATUS.APPROVED) return "success";
      if (status === STATUS.REJECTED) return "error";
      return "info";
    };
    return componentArr.map((item) => {
      const verificationStatus = sectionStatuses[`${camelCased(item.name)}Status`] || "";
      const verificationComment = sectionStatuses[`${camelCased(item.name)}Comment`] || "";
      return (
        <>
          {item.component}
          <Alert
            message={`Approval Status of ${item.title} : ${verificationStatus || "No Data Available"}`}
            description={`Comments : ${verificationComment || "No Data Available"}`}
            type={getAlertColor(verificationStatus)}
            showIcon
          />
        </>
      );
    });
  };

  return (
    <div className="containerfluid previewbgcoloroverview">
      <div className="row">
        <div className="col-md-3 anchorContainer anchorContainerMenu">
          <Anchor
            getContainer={() => document.getElementById("my-scroll-layout")}
            showInkInFixed={true}
            affix={false}
            onClick={handleClick}
          >
            {componentArr.map((item) => (
              <Anchor.Link href={item.link} title={item.title} key={item.title} />
            ))}
          </Anchor>
        </div>
        <div className="col-md-9 scroll mrg-l-a" id="my-scroll-layout">
          {getComponents()}
        </div>
      </div>
    </div>
  );
};

export default Detailview;
