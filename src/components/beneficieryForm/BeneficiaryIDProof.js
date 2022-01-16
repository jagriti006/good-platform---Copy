import { Button, Col, message, notification, Radio, Row } from "antd";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { appConfigurations } from "../../utils/constants";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import { snakeCase, isEmpty, first, result } from "lodash";
import { useDispatch } from "react-redux";
import { saveIDProofData, saveKYCStatus } from "../../redux/persisted/persistedActions";
import { useHistory } from "react-router-dom";
import appRoutes from "../../constants/app-routes";
import DatePicker from "../FormikComponents/Date/Date";
import moment from "moment";
import { formErrorTextStyle, getKycStatusFromResponse, useQuery } from "../../utils/utils";
import { Link } from "react-router-dom";

export const ADHARD_CARD_TYPE = "Adhar Card";
export const DRIVING_LICENSE_TYPE = "Driving License";
export const PASSPORT_TYPE = "Passport";
export const VOTERS_ID_CARD_TYPE = "Voter ID";
export const PAN_CARD_TYPE = "PAN card";
const IDProofOptions = [
  { value: DRIVING_LICENSE_TYPE, label: DRIVING_LICENSE_TYPE },
  { value: VOTERS_ID_CARD_TYPE, label: VOTERS_ID_CARD_TYPE },
  { value: PAN_CARD_TYPE, label: PAN_CARD_TYPE },
  // { value: ADHARD_CARD_TYPE, label: ADHARD_CARD_TYPE },
  { value: PASSPORT_TYPE, label: PASSPORT_TYPE },
];

const IDProof = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isPassport, setIsPassport] = useState(false);
  const projectId = useQuery().get("projectId");

  const panCardVerification = async (idProof, idProofNumber) => {
    const response = await beneficiaryAPI().panCardVerification(idProofNumber);
    if (response?.data && !isEmpty(response?.data)) {
      const details = response.data;
      const dataObject = first(details);
      const detailsNeeded = {
        firstName: dataObject?.first_name || "",
        lastName: dataObject?.last_name || "",
        gender: "",
        dateOfBirth: "",
        idProof: idProof,
        idProof_number: idProofNumber,
      };
      dispatch(saveIDProofData(detailsNeeded));
      dispatch(saveKYCStatus(getKycStatusFromResponse(idProof, idProofNumber,response)))
      navigateToBasicInfo()
    } else {
      notification.error({
        message: response.message
          ? response.message
          : appConfigurations.general_error_message,
      });
    }
  };

  const drivingLicenseVerification = async (idProof, idProofNumber) => {
    const response = await beneficiaryAPI().drivingLicenseVerification(
      idProofNumber
    );

    if (response?.result) {
      const details = response.result;

      const detailsNeeded = {
        firstName: details.name || "",
        gender: null, //  gender not available in response
        dateOfBirth: details.dob || "",
        idProof: idProof,
        idProof_number: idProofNumber,
      };
      dispatch(saveIDProofData(detailsNeeded));
      dispatch(saveKYCStatus(getKycStatusFromResponse(idProof, idProofNumber,response)))
      navigateToBasicInfo()
    } else {
      notification.error({
        message:
          response.message || response.response_msg
            ? response.message || response.response_msg
            : appConfigurations.general_error_message,
      });
    }
  };

  const votersIDVerification = async (idProof, idProofNumber) => {
    const response = await beneficiaryAPI().votersIDVerification(idProofNumber);

    if (response?.result) {
      const dataObject = response.result;
      const detailsNeeded = {
        firstName: dataObject?.name || "",
        lastName: "",
        gender: dataObject.gender === "M" ? "Male" : "Female",
        dateOfBirth: "",
        idProof: idProof,
        idProof_number: idProofNumber,
      };
      dispatch(saveIDProofData(detailsNeeded));
      dispatch(saveKYCStatus(getKycStatusFromResponse(idProof, idProofNumber,response)))
      navigateToBasicInfo()
    } else {
      notification.error({
        message: response.message
          ? response.message
          : appConfigurations.general_error_message,
      });
    }
  };

  const passportVerification = async (idProof, idProofNumber, rest) => {
    const payload = {
      dob: moment(rest.dob).format("DD/MM/yyyy"),
      doe: moment(rest.doe).format("DD/MM/yyyy"),
      gender: rest.gender,
      last_name: rest.last_name,
      name: rest.name,
      type: rest.type,
      passport_no: idProofNumber,
      country: "IND",
      consent: "Y",
      consent_text: "Passport verification",
    };

    const response = await beneficiaryAPI().passportVerification(payload);

    if (response?.result) {
      const details = response.result; // Zoop does not provide much information for passport
      const detailsNeeded = {
        firstName: payload.name || "",
        lastName: payload.last_name,
        gender: payload.gender === "M" ? "Male" : "Female",
        dateOfBirth: payload.dob || "",
        idProof: idProof,
        idProof_number: idProofNumber,
      };
      dispatch(saveIDProofData(detailsNeeded));
      dispatch(saveKYCStatus(getKycStatusFromResponse(idProof, idProofNumber,detailsNeeded)))
      navigateToBasicInfo()
    } else {
      notification.error({
        message: response.message
          ? response.message
          : appConfigurations.general_error_message,
      });
    }
  };
  const validateBeneficiaryAPI = ({ idProof, idProof_number, ...rest }) => {
    switch (idProof) {
      case PAN_CARD_TYPE:
        panCardVerification(idProof, idProof_number);
        break;
      case DRIVING_LICENSE_TYPE:
        drivingLicenseVerification(idProof, idProof_number);
        break;

      case VOTERS_ID_CARD_TYPE:
        votersIDVerification(idProof, idProof_number);
        break;
      case PASSPORT_TYPE:
        passportVerification(idProof, idProof_number, rest);
        break;
      default:
        notification.message({ message: "Invalid ID Selected" });
    }
  };

  const getValidationSchema = () => {
    return isPassport
      ? Yup.object().shape({
          idProof: Yup.string().required("ID Proof is required."),
          idProof_number: Yup.string().required("ID Proof number is required."),
          name: Yup.string().required("First Name is required."),
          last_name: Yup.string().required("Last Name is required."),
          gender: Yup.string().required("Gender is required."),
          dob: Yup.mixed().required("Date of birth is required."),
          doe: Yup.mixed().required("Date of expiry is required."),
          type: Yup.mixed().required("Passport type is required."),
        })
      : Yup.object().shape({
          idProof: Yup.string().required("ID Proof is required."),
          idProof_number: Yup.string().required("ID Proof number is required."),
        });
  };

  const navigateToBasicInfo = () =>{
    history.push(`${appRoutes.BENEFICIARY}${appRoutes.BASIC_INFO}?projectId=${projectId}`);
  }
  return (
    <div className="container" style={{paddingTop: "3rem"}}>
      <Formik
        initialValues={{
          idProof: "",
          idProof_number: "",
          name: "",
          last_name: "",
          dob: "",
          doe: "",
          gender: "",
          type: "",
        }}
        validationSchema={getValidationSchema()}
        onSubmit={validateBeneficiaryAPI}
      >
        {({ values, setFieldValue, touched, errors }) => {
          return (
            <Form>
              <Row gutter={[16, 16]} justify="center">
                <Col span={12} className="formCol">
                  <label>Select ID Proof</label>
                  <Field
                    name="idProof"
                    component={SelectBox}
                    placeholder="ID Proof"
                    options={IDProofOptions}
                    onChange={(value) => {
                      setFieldValue("idProof", value);
                      value === PASSPORT_TYPE
                        ? setIsPassport(true)
                        : setIsPassport(false);
                    }}
                    errortext={touched.idProof ? errors.idProof : ""}
                  />
                </Col>
              </Row>

              <Row gutter={[16, 16]} justify="center">
                <Col span={12} className="formCol">
                  <label>ID proof Number</label>
                  <Field
                    name="idProof_number"
                    component={Input}
                    placeholder="ID Proof number"
                    errortext={
                      touched.idProof_number ? errors.idProof_number : ""
                    }
                  />
                </Col>
              </Row>
              {values.idProof === PASSPORT_TYPE && (
                <>
                  <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} lg={8} className="formCol">
                      <label>First Name</label>
                      <Field
                        name="name"
                        component={Input}
                        placeholder="First Name"
                        options={IDProofOptions}
                        errortext={touched.name ? errors.name : ""}
                      />
                    </Col>
                    <Col xs={24} lg={8} className="formCol">
                      <label>Last Name</label>
                      <Field
                        name="last_name"
                        component={Input}
                        placeholder="Last Name"
                        options={IDProofOptions}
                        errortext={touched.last_name ? errors.last_name : ""}
                      />
                    </Col>
                    <Col xs={24} lg={8}>
                      <label>Gender</label>
                      <div style={formErrorTextStyle()}>
                        {touched.gender ? errors.gender : ""}
                      </div>
                      <div>
                        <Radio.Group
                          name="gender"
                          value={values.gender}
                          onChange={(e) =>
                            setFieldValue("gender", e.target.value)
                          }
                        >
                          <Radio value={"M"}>Male</Radio>
                          <Radio value={"F"}>Female</Radio>
                          <Radio value={"T"}>Other</Radio>
                        </Radio.Group>
                      </div>
                    </Col>
                    <Col xs={24} lg={8} className="formCol">
                      <label>Date of Birth</label>
                      <Field
                        name="dob"
                        component={DatePicker}
                        placeholder="Date of Birth"
                        format="DD/MM/YYYY"
                        disabledDate={(d) => !d || d.isAfter(new Date())}
                        errortext={touched.dob ? errors.dob : ""}
                      />
                    </Col>

                    <Col xs={24} lg={8} className="formCol">
                      <label>Passport Type</label>
                      <Field
                        name="type"
                        component={SelectBox}
                        placeholder="Passport Type"
                        options={[
                          { value: "P", label: "Personal" },
                          { value: "D", label: "Diplomatic" },
                          { value: "S", label: "Service" },
                        ]}
                      />
                    </Col>
                    <Col xs={24} lg={8} className="formCol">
                      <label>Date of Expiration</label>
                      <Field
                        name="doe"
                        component={DatePicker}
                        placeholder="Date of Expiration"
                        format="DD/MM/YYYY"
                        errortext={touched.doe ? errors.doe : ""}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {values.idProof === DRIVING_LICENSE_TYPE && (
                <Row gutter={[16, 16]} justify="center">
                  <Col xs={12} lg={12}>
                    <div style={{ fontSize: 12 }}>
                      <p>
                        Driving License Number should be entered in the
                        following format :{" "}
                      </p>
                      <i>
                        SS-RRYYYYNNNNNNN
                        <br />
                        SS - State code
                        <br />
                        RR - RTO code
                        <br />
                        YYYY - Year
                        <br />
                        NNNNNNN - Rest of the Numbers (Add 0's if Number is
                        having less than 7 digits)
                      </i>
                    </div>
                  </Col>
                </Row>
              )}
              <Row gutter={[16, 16]} justify="center">
                <Col xs={12} lg={6} className="formCol beneficiaryForms">
                  <Button htmlType="submit" type="primary">
                    Verify
                  </Button>
                </Col>

                <Col xs={12} lg={6} className="formCol beneficiaryForms">
                    <Button type="primary" onClick={navigateToBasicInfo}>Skip</Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

// TODO :: mock function, delete after correct APi integration
const getAXIOSLikeDummyResponse = (response) => {
  return {
    status: 200,
    data: response,
  };
};

export default IDProof;
