import { Formik, Form, Field } from "formik";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import { Col, Button, Row, notification } from "antd";
import "./BeneficiaryStyles.scss"; //
import beneficiaryAPI from "../../api/beneficiaryAPI";
import {
  toLowercaseAndReplaceSpaces,
  trasformToValueAndLabel,
} from "../../utils/utils.js";
import { useEffect, useState } from "react";
import Text from "antd/lib/typography/Text";
import { appConfigurations } from "../../utils/constants";
import { useHistory, useParams } from "react-router-dom";
import appRoutes from "../../constants/app-routes";

const primaryEducationRuleArray = [
  toLowercaseAndReplaceSpaces("Primary Education", "_"),
  toLowercaseAndReplaceSpaces("HSC", "_"),
  toLowercaseAndReplaceSpaces("SSC", "_"),
  toLowercaseAndReplaceSpaces("Graduation", "_"),
  toLowercaseAndReplaceSpaces("Post Graduation", "_"),
];
const collegeRuleArray = [
  toLowercaseAndReplaceSpaces("Graduation", "_"),
  toLowercaseAndReplaceSpaces("Post Graduation", "_"),
];
const postGraduationRuleArray = [
  toLowercaseAndReplaceSpaces("Post Graduation", "_"),
];

/* 
  If Graduation is selected after filling post graduation, value of post graduation should be nullified 
*/
const nullifyOtherFields = (setFieldValue, value, educationStatuses) => {
  const primaryEducation =
    educationStatuses.find((item) => item.label === "Primary Education") || {};
  const HSC = educationStatuses.find((item) => item.label === "HSC") || {};
  const SSC = educationStatuses.find((item) => item.label === "SSC") || {};
  const graduation =
    educationStatuses.find((item) => item.label === "Graduation") || {};

  if (value === graduation["value"]) {
    setFieldValue("highestDegree", "");
  } else if (
    value === primaryEducation["value"] ||
    value === HSC["value"] ||
    value === SSC["value"]
  ) {
    setFieldValue("highestDegree", "");
    setFieldValue("collegeName", "");
    setFieldValue("collegePassOutYear", 0);
  }
};

const BeneficiaryEducation = () => {
  const { beneficiaryId } = useParams();
  const history = useHistory();
  const [initialState, setInitialState] = useState("");
  const [educationStatuses, setEducationStatuses] = useState([
    { value: "", label: "" },
  ]);

  useEffect(() => {
    const fetchBeneficiaryEducation = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryEducation(
          beneficiaryId
        );
        if (response.data) {
          setInitialState(response.data);
        }
      }
    };
    fetchBeneficiaryEducation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await beneficiaryAPI().getAllEducationStatus();
      setEducationStatuses(trasformToValueAndLabel(response.data, "status"));
    };
    fetchData();
  }, []);

  const saveBeneficiaryEducationDetails = async (values) => {
    console.log(values);
    const response = await beneficiaryAPI().saveBeneficiaryEducation(values);
    if (response.success) {
      notification.success({ message: "Education Details Saved..!" });
      history.push(
        `${appRoutes.BENEFICIARY}${appRoutes.FINANCIAL}/${response.data.id}`
      );
    }
  };

  const populateYears = () => {
    const year = new Date().getFullYear();
    return Array.from(new Array(50), (v, i) => {
      return { value: `${year - i}`, label: `${year - i}` };
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          beneficiariesId: beneficiaryId ? beneficiaryId : "",
          educationStatusId: initialState
            ? (initialState.educationalStatus &&
                initialState.educationalStatus.id) ||
              null
            : "",
          schoolName: initialState ? initialState.schoolName : "",
          schoolPassOutYear: initialState
            ? initialState.schoolPassoutYear === null
              ? 0
              : initialState.schoolPassoutYear
            : 0,
          collegeName: initialState ? initialState.collegeName : "",
          collegePassOutYear: initialState
            ? initialState.collegePassoutYear === null
            ? 0
            : initialState.collegePassoutYear
          : 0,
          highestDegree: initialState
            ? initialState.highestEducationalQualification
            : "",
        }}
        enableReinitialize={true}
        onSubmit={saveBeneficiaryEducationDetails}
      >
        {({ values, touched, errors, setFieldValue }) => {
          const educationStatusSelected =
            educationStatuses &&
            educationStatuses.find(
              (item) => item.value === values.educationStatusId
            );
          const educationLabel = educationStatusSelected
            ? toLowercaseAndReplaceSpaces(educationStatusSelected.label, "_")
            : "";
          return (
            <Form className="beneficiaryForms educationForm">
              <h4>Education Details</h4>
              <div className="formSection">
                <Row gutter={[16, 16]}>
                  <Col span={24} className="formCol">
                    <label>Education Status</label>
                    <Field
                      name="educationStatusId"
                      component={SelectBox}
                      placeholder="Education Status"
                      options={educationStatuses}
                    />
                  </Col>
                </Row>
              </div>
              {primaryEducationRuleArray.includes(educationLabel) && (
                <div className="formSection">
                  <h4>Primary Education</h4>
                  <Row>
                    <Col span={24} className="formCol">
                      <label>School Name</label>
                      <Field
                        name="schoolName"
                        component={Input}
                        placeholder="School Name"
                      />
                    </Col>
                    <Col span={24} className="formCol">
                      <label>School pass out year</label>
                      <Field
                        name="schoolPassOutYear"
                        component={SelectBox}
                        placeholder="School pass out year"
                        picker="year"
                        options={populateYears()}
                      />
                    </Col>
                  </Row>
                </div>
              )}
              {collegeRuleArray.includes(educationLabel) && (
                <div className="formSection">
                  <h4>College</h4>
                  <Row>
                    <Col span={24} className="formCol">
                      <label>College Name</label>
                      <Field
                        name="collegeName"
                        component={Input}
                        placeholder="College Name"
                      />
                    </Col>
                    <Col span={24} className="formCol">
                      <label>College Pass out year</label>
                      <Field
                        name="collegePassOutYear"
                        component={SelectBox}
                        placeholder="College Name"
                        options={populateYears()}
                      />
                    </Col>
                  </Row>
                </div>
              )}
              {postGraduationRuleArray.includes(educationLabel) && (
                <div className="formSection">
                  <h4>Post Graduation</h4>
                  <Row>
                    <Col span={24} className="formCol">
                      <label>Highest Degree/Class Attended</label>
                      <Field
                        name="highestDegree"
                        component={Input}
                        placeholder="Highest Degree/Class Attended"
                      />
                    </Col>
                  </Row>
                </div>
              )}
              <Row justify="end">
                <Col xs={12} lg={6}>
                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BeneficiaryEducation;
