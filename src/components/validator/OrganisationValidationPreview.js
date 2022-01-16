import { notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import validatorAPI from "../../api/validatorAPI";
import { STATUS } from "../../constants/strings";
import { camelCased } from "../../utils/utils";
import { componentArr } from "../organisationForm/preview";
import ValidationPreview from "./ValidationPreview";
import ValidatorFinalSection from "./ValidatorFinalSection";

const orgPreviewComponents = [...componentArr]
orgPreviewComponents.push({
  link: "#validator_final",
  component: <ValidatorFinalSection />,
  title: "Validators Recommendation",
  name: "validators_recommendations",
});
const OrganisationValidationPreview = () => {
  const [current, setCurrent] = useState("#organisation_preview");
  const [reWorkComment, setReWorkComment] = useState("");
  const { organisationId } = useParams();
  const [sectionStatuses, setSectionStatuses] = useState("");

  const fetchSectionwiseStatus = async () => {
    const response = await validatorAPI().fetchSectionwiseStatus(organisationId);
    if (response.data) {
      setSectionStatuses(response.data);
    }
  };

  useEffect(() => {
    if (current !== "#validator_final") fetchSectionwiseStatus();
  }, [current]);

  const onApprove = (section) => {
    const formData = {
      [`${camelCased(section)}Status`]: STATUS.APPROVED,
      [`${camelCased(section)}Comment`]: "",
    };
    const saveData = async () => {
      const response = await validatorAPI().reviewSection(section, organisationId, formData);
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
      const response = await validatorAPI().reviewSection(section, organisationId, formData);
      if (response?.data?.id) {
        notification.success({ message: `${section.toUpperCase()} status updated..!` });
        setReWorkComment("");
        fetchSectionwiseStatus();
      }
    };
    saveData();
  };
  const getImagePath = (image) => {
    return <img style={{ width: 30 }} src={require(`../../assets/images/preview/${image}.png`).default} />;
  };
  const getApprovalCardData = (currentSection = current) => {
    switch (currentSection) {
      case "#organisation_preview": {
        return {
          icon: getImagePath("overview"),
          title: "Overview",
          name: "overview",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("overview"),
          onRework: () => onRework("overview"),
        };
      }
      case "#leadership_preview": {
        return {
          icon: getImagePath("profile1"),
          title: "Leadership",
          name: "leadership",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("leadership"),
          onRework: () => onRework("leadership"),
        };
      }
      case "#location_preview": {
        return {
          icon: getImagePath("location"),
          title: "Location",
          name: "location",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("location"),
          onRework: () => onRework("location"),
        };
      }
      case "#purpose_preview": {
        return {
          icon: getImagePath("purpose"),
          title: "Purpose",
          name: "purpose",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("purpose"),
          onRework: () => onRework("purpose"),
        };
      }
      case "#track_preview": {
        return {
          icon: getImagePath("trackrecord"),
          title: "Track Record",
          name: "track-record-history",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("track-record-history"),
          onRework: () => onRework("track-record-history"),
        };
      }
      case "#document_preview": {
        return {
          icon: getImagePath("documents"),
          title: "Documnets",
          name: "financial-documents",
          checklist: (
            <ul>
              <li>Make sure all the facts mentioned are accurate</li>
              <li> Check if all the sections are complete</li>
              <li>Double check uploaded documents</li>
            </ul>
          ),
          onApprove: () => onApprove("financial-documents"),
          onRework: () => onRework("financial-documents"),
        };
      }
    }
  };

  return (
    <ValidationPreview
      current={current}
      setCurrent={setCurrent}
      componentArr={orgPreviewComponents}
      getApprovalCardData={getApprovalCardData}
      reWorkComment={reWorkComment}
      setReWorkComment={setReWorkComment}
      sectionStatuses={sectionStatuses}
    />
  );
};

export default OrganisationValidationPreview;
