import { Button, Col, Row, notification, Typography, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Collapse, message } from "antd";
import { Formik, Form, Field } from "formik";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import { isEmpty } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import ProgramcreationAPI from "../../api/programcreationAPI";
import appRoutes from "../../constants/app-routes";
import reporting from "../../assets/images/reporting.png";
import * as Yup from "yup";

const ReportingDetails = (props) => {
  const history = useHistory();
  const organisationId = sessionStorage.getItem("organisationId");
  const projectId = useParams().programId;
  
  const [initialState, setInitialState] = useState("");
  const [frequency, setFrequency] = useState([]);

  useEffect(() => {
    const fetchProjectbasicdetail = async () => {
      if (projectId) {
        const response = await ProgramcreationAPI().getReportFrequency();
        if (response.data) {
          const newArrayOfObj = response.data.map(({ id: value, frequency: label }) => ({
            value,
            label,
          }));
          setFrequency(newArrayOfObj);
        }
      }
    };
    const fetchReportDetails = async () => {
      if (projectId) {
        const response = await ProgramcreationAPI().getReportDetail(projectId);
        if (response.data) {
          setInitialState(response.data);
        }
      }
    };
    fetchProjectbasicdetail();
    fetchReportDetails();
  }, []);

  const backClick = () => {
    history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_DONOR}/${projectId}`);
  };

  const saveBasicdetails = async (values) => {
    const response = await ProgramcreationAPI().addReportDetails(values);
    if (response.success) {
      notification.success({ message: "Reports Details Saved..!" });
      history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_ORGANIZATIONAL_APPROVAL}/${projectId}`);
    } else {
      message.error("Reports Details not added");
    }
  };
  const ReportingSchema = Yup.object().shape({
    internalSystemDurationId: Yup.string().required('Required'),
    internalSystemReportDetail: Yup.string()
              .max(248, "Maximum 248 characters allowed.")
              .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^.")
              .required('Required'),
    donorSystemDurationId: Yup.string().required('Required'),        
    donorSystemReportDetail: Yup.string()
              .max(248, "Maximum 248 characters allowed.")
              .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^.")
              .required('Required'),
  });

  return (
    <Row justify="center">
      <Col xs={24} lg={20}>
        <Row gutter={[16, 16]}>
          <Col sm={12} lg={16}>
            <Formik
              initialValues={getInitialValues(projectId, initialState)}
              enableReinitialize={true}
              onSubmit={(values) => saveBasicdetails(values)}
              validationSchema={ReportingSchema}
            >
              {({ values, touched, errors, setFieldValue }) => {
                return (
                  <Form>
                    <Space
                      size="middle"
                      direction="vertical"
                      className="projectcreationstyle"
                      style={{ display: "flex" }}
                    >
                      <div className="projectcreationstyle  internal">Internal System</div>
                      <Row gutter={[16, 8]}>
                        <Col xs={24}>
                          <Field
                            name="internalSystemDurationId"
                            placeholder="Duration"
                            component={SelectBox}
                            options={frequency}
                            showSearch={false}
                            errortext={touched.internalSystemDurationId ? errors.internalSystemDurationId : ""}
                          />
                        </Col>
                        <Col xs={24}>
                          <Field
                            name="internalSystemReportDetail"
                            placeholder="Key Activities Reported"
                            component={Input}
                            errortext={touched.internalSystemReportDetail ? errors.internalSystemReportDetail : ""}
                          />
                        </Col>
                      </Row>

                      <div className="projectcreationstyle  internal">Donor System</div>
                      <Row gutter={[16, 8]} className="projectcreationstyle">
                        <Col xs={24}>
                          <Field
                            name="donorSystemDurationId"
                            placeholder="Duration"
                            component={SelectBox}
                            options={frequency}
                            showSearch={false}
                            errortext={touched.donorSystemDurationId ? errors.donorSystemDurationId : ""}
                          />
                        </Col>
                        <Col xs={24}>
                          <Field
                            name="donorSystemReportDetail"
                            placeholder="Key Activities Reported"
                            component={Input}
                            errortext={touched.donorSystemReportDetail ? errors.donorSystemReportDetail : ""}
                          />
                        </Col>
                      </Row>

                      <Row gutter={[16, 16]} justify="end" className="pt-4">
                        <div className="floatRight displayFlex formStyles repor">
                          <Button className="ant-btn-back" onClick={() => backClick()}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                            &nbsp; Previous Step
                          </Button>
                        </div>
                        <div className=" floatRight displayFlex formStyles repor">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="pl-4 pr-4"
                            disabled={
                              !!(
                                errors.internalSystemReportDetail ||
                                errors.donorSystemReportDetail
                              )
                            }
                          >
                            NEXT: ORGANIZATIONAL APPROACH
                          </Button>
                        </div>
                      </Row>
                    </Space>
                  </Form>
                );
              }}
            </Formik>
          </Col>
          <Col sm={12} lg={8}>
            <Space size={48} direction="vertical">
              <div style={{ paddingLeft: "1rem" }}>
                <img src={reporting} />
              </div>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const getInitialValues = (projectId, initialState) => {
  if (!isEmpty(initialState)) {
    return {
      projectId: projectId,
      update: true,
      internalReportId: initialState ? initialState.internalReportId : "",
      donorReportId: initialState ? initialState.donorReportId : "",
      internalSystemReportDetail: initialState ? initialState.internalSystemReportDetail : "",
      internalSystemDurationId: initialState ? initialState.internalSystemDurationId : "",
      donorSystemDurationId: initialState ? initialState.donorSystemDurationId : "",
      donorSystemReportDetail: initialState ? initialState.donorSystemReportDetail : "",
    };
  } else {
    return {
      projectId: projectId,
      internalSystemReportDetail: initialState ? initialState.internalSystemReportDetail : "",
      internalSystemDurationId: initialState ? initialState.internalSystemDurationId : "",
      donorSystemDurationId: initialState ? initialState.donorSystemDurationId : "",
      donorSystemReportDetail: initialState ? initialState.donorSystemReportDetail : "",
    };
  }
};

export default ReportingDetails;
