import { Button, Col, notification, Row } from "antd";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { projectIdorName } from "../../api/config";
import { PROJECT } from "../../constants/strings";
import { getNextStepLink, trasformToValueAndLabel, useQuery } from "../../utils/utils";
import Input from "../FormikComponents/Input/Input";
import InputFile from "../FormikComponents/InputFile/InputFile";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";

const BeneficiaryIdentification = () => {
  const history = useHistory();
  const { beneficiaryId } = useParams();
  const projectId = useQuery().get("projectId");
  const [initialState, setInitialState] = useState("");
  const [rationCardTypes, setRationCardTypes] = useState([]);
  const [rationCenters, setRationCenters] = useState([]);
  const programSettings = useSelector((state) => state.persisted.programSettings);

  useEffect(() => {
    const fetchBeneficiaryOther = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryOther(beneficiaryId);
        const kycResponse = await beneficiaryAPI().fetchKYCdetails(beneficiaryId);
        if (response.data) {
          setInitialState({
            ...response.data,
            idType: kycResponse?.data?.content[0]?.idType || "",
            idNumber: kycResponse?.data?.content[0]?.idNumber || "",
            kycId: kycResponse?.data?.content[0]?.id || "",
          });
        }
      }
    };
    fetchBeneficiaryOther();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cardTyperesponse = await beneficiaryAPI().fetchRationTypes();
      const centersResponse = await beneficiaryAPI().getVaccinationCenters(projectId, getFilterParams());
      if (cardTyperesponse?.data) setRationCardTypes(trasformToValueAndLabel(cardTyperesponse.data, "title"));
      if (centersResponse?.data) setRationCenters(trasformToValueAndLabel(centersResponse.data, "title"));
    };
    fetchData();
  }, []);
  const setImageUrl = async (file, field, setFieldValue) => {
    const response = await beneficiaryAPI().uplaodImageAndGetURL(file);
    if (response.data) setFieldValue(field, response.data);
  };

  const getFilterParams = () => {
    let filterParams = "";
    if (programSettings) {
      const { state, district, taluk } = programSettings;
      if (state) filterParams += `&state=${state}`;
      if (district) filterParams += `&district=${district}`;
      if (taluk) filterParams += `&taluk=${taluk}`;
    }
    return filterParams;
  };

  const saveKYCData = async (values) => {
    const formData = {
      idNumber: values.idNumber,
      idType: values.idType,
      userReferenceId: beneficiaryId,
    };
    if (values.kycId) formData["id"] = values.kycId;
    await beneficiaryAPI().saveKYCdetails(formData);
  };
  return (
    <>
      <Formik
        initialValues={{
          beneficiaryId: beneficiaryId ? beneficiaryId : "",
          idImageUrl: initialState ? initialState.idImageUrl : "",
          selfImageUrl: initialState ? initialState.selfImageUrl : "",
          otherImageUrl: initialState ? initialState.otherImageUrl : "",
          mnregaCardNo: initialState ? initialState.mnregaCardNo : "",
          rationCardTypeId: initialState ? initialState.rationCardTypeId : "",
          rationCardNo: initialState ? initialState.rationCardNo : "",
          centerId: initialState ? initialState.centerId : "",
          kycId: initialState ? initialState.kycId : "",
          idNumber: initialState ? initialState.idNumber : "",
          idType: initialState ? initialState.idType : "",
          projectId,
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
          const response = await beneficiaryAPI().addBeneficiaryOther(values);
          if (response.data) {
            if (projectIdorName("", projectId) === PROJECT.ARPAN) {
              await saveKYCData(values);
            }
            notification.success({ message: "Identification Details Saved..!" });
            history.push(`${getNextStepLink()}/${beneficiaryId}?projectId=${projectId}`);
          }
        }}
      >
        {({ values, touched, errors, setFieldValue }) => {
          return (
            <Form className="beneficiaryForms">
              <Row justify="space-between" gutter={[16, 8]}>
                {/* <Col span={11}>
                  <Field
                    name="idImageUrl"
                    component={InputFile}
                    label="Beneficiary ID"
                    beforeUpload={(file) => {
                      setImageUrl(file, "idImageUrl", setFieldValue);
                      return false;
                    }}
                  />
                </Col> */}
                <Col xs={24} lg={12}>
                  <Field
                    name="selfImageUrl"
                    component={InputFile}
                    label="Self Image"
                    beforeUpload={(file) => {
                      setImageUrl(file, "selfImageUrl", setFieldValue);
                      return false;
                    }}
                  />
                  {values.selfImageUrl && (
                    <img
                      src={values.selfImageUrl}
                      alt="Self Image"
                      style={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover",
                        padding: "1rem",
                      }}
                    />
                  )}
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    name="otherImageUrl"
                    component={InputFile}
                    label="Other Image"
                    beforeUpload={(file) => {
                      setImageUrl(file, "otherImageUrl", setFieldValue);
                      return false;
                    }}
                  />
                  {values.otherImageUrl && (
                    <img
                      src={values.otherImageUrl}
                      alt="Other Image"
                      style={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover",
                        padding: "1rem",
                      }}
                    />
                  )}
                </Col>
                <Col xs={24} lg={12}>
                  <Field name="mnregaCardNo" component={Input} placeholder="Mnrega Card No" />
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                    name="rationCardTypeId"
                    component={SelectBox}
                    placeholder="Ration Card Type"
                    options={rationCardTypes}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                    name="rationCardNo"
                    component={Input}
                    placeholder="Ration Card Number"
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                    name="centerId"
                    component={SelectBox}
                    placeholder="Ration Center"
                    options={rationCenters}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                    name="idType"
                    component={SelectBox}
                    placeholder="ID Card Type"
                    options={[
                      { label: "Driving License", value: "Driving License" },
                      { label: "Voter ID", value: "Voter ID" },
                      { label: "PAN Card", value: "PAN card" },
                    ]}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                    name="idNumber"
                    component={Input}
                    placeholder="ID Proof Number"
                  />
                </Col>
              </Row>
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

export default BeneficiaryIdentification;
