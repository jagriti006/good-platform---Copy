import { Anchor, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import validatorAPI from "../../api/validatorAPI";
import { STATUS } from "../../constants/strings";
import { camelCased } from "../../utils/utils";
import Icon from "../common/Icon";
import { componentArr } from "../programCreation/previewProject/detailviewClone";
import "../programCreation/previewProject/previewProject.scss";
import ValidationPreview from "./ValidationPreview";
import ValidatorFinalSection from "./ValidatorFinalSection";

const { Link } = Anchor;

const proposalPreviewComponents = [...componentArr];
proposalPreviewComponents.push({
  link: "#validator_final",
  component: <ValidatorFinalSection />,
  title: "Validators Recommendation",
  name: "validators_recommendations",
});

const ProposalValidationPreview = () => {
  const [current, setCurrent] = useState("#basic_previews");
  const [sectionStatuses, setSectionStatuses] = useState("");
  const [reWorkComment, setReWorkComment] = useState("");
  const { programId } = useParams();

  useEffect(() => {
    if (current !== "#validator_final") fetchSectionwiseStatus();
  }, [current]);

  const fetchSectionwiseStatus = async () => {
    const response = await validatorAPI().fetchProjectSectionwiseStatus(programId);
    if (response.data) {
      setSectionStatuses(response.data);
    }
  };

  const onApprove = (section) => {
    const formData = {
      [`${camelCased(section)}Status`]: STATUS.APPROVED,
      [`${camelCased(section)}Comment`]: "",
    };
    const saveData = async () => {
      const response = await validatorAPI().reviewProjectSection(section, programId, formData);
      if (response?.data?.id) {
        notification.success({ message: `${section.toUpperCase()} Approved..!` });
        setReWorkComment("");
        fetchSectionwiseStatus();
      }
    };
    saveData();
  };

  const onRework = (section) => {
    const formData = {
      [`${camelCased(section)}Status`]: STATUS.REJECTED,
      [`${camelCased(section)}Comment`]: reWorkComment,
    };
    const saveData = async () => {
      const response = await validatorAPI().reviewProjectSection(section, programId, formData);
      if (response?.data?.id) {
        notification.success({ message: `${section.toUpperCase()} status updated..!` });
        setReWorkComment("");
        fetchSectionwiseStatus();
      }
    };
    saveData();
  };

  const getApprovalCardData = (currentSection = current) => {
    switch (currentSection) {
      case "#basic_previews": {
        return {
          icon: <Icon name="/program-creation/basic-details-active" />,
          title: "Basic",
          name:"basics",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("basics"),
          onRework: () => onRework("basics"),
        };
      }
      case "#team_previews": {
        return {
          icon: <Icon name="/program-creation/team-active" />,
          title: "Team",
          name:"team",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("team"),
          onRework: () => onRework("team"),
        };
      }
      case "#metrics_previews": {
        return {
          icon: <Icon name="/program-creation/matrics-active" />,
          title: "Key Indicators",
          name:"key-indicators",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("key-indicators"),
          onRework: () => onRework("key-indicators"),
        };
      }
      case "#donor_previews": {
        return {
          icon: <Icon name="/program-creation/budget-active" />,
          title: "Budget",
          name:"donor",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("donor"),
          onRework: () => onRework("donor"),
        };
      }
      case "#budget_previews": {
        return {
          icon: <Icon name="/program-creation/donor-active" />,
          title: "Budget",
          name:"budget",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("budget"),
          onRework: () => onRework("budget"),
        };
      }
      case "#reporting_previews": {
        return {
          icon: <Icon name="/program-creation/reporting-active" />,
          title: "Budget",
          budget:"reporting",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("reporting"),
          onRework: () => onRework("reporting"),
        };
      }
    }
  };

  return (
    <ValidationPreview
      current={current}
      setCurrent={setCurrent}
      componentArr={proposalPreviewComponents}
      getApprovalCardData={getApprovalCardData}
      reWorkComment={reWorkComment}
      setReWorkComment={setReWorkComment}
      sectionStatuses={sectionStatuses}
    />
  );
};

export default ProposalValidationPreview;
