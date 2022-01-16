import React, { useEffect, useState, useRef } from "react";
import { Button, Col, notification, Row } from "antd";
import { useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../../api/beneficiaryAPI";
import { Formik, Form, Field, getIn } from "formik";
import Input from "../../FormikComponents/Input/Input";
import appRoutes from "../../../constants/app-routes";
import Organisationapi from "../../../api/organizationapi";
import { UploadFile } from "../../form/uploadFile";
import SelectBox from "../../FormikComponents/SelectBox/SelectBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "lodash";
import document from "../../../assets/images/illustrators/document.png";
import CommonFileUpload from "./../../common/common-file-upload";
import { documentkyc } from "../../../api/config";
import * as Yup from "yup";
import { SearchOutlined } from "@ant-design/icons";
import "./document.scss";
import moment from "moment";

const auditStatementYears = () => {
  const years = [];
  const dateStart = moment();
  const dateEnd = moment().subtract(20, "y");
  while (dateEnd.diff(dateStart, "years") <= 0) {
    years.push({ label: dateStart.format("YYYY"), value: dateStart.format("YYYY") });
    dateStart.subtract(1, "year");
  }
  return years;
};

const Documents = (props) => {
  const history = useHistory();
  const [initialState, setInitialState] = useState("");
  const organisationId = sessionStorage.getItem("organisationId");
  const fileUploadRef = useRef();
  const benificiaryApiMethod = beneficiaryAPI().uplaodImageAndGetURL;
  const [hires, sethire] = useState([]);

  useEffect(() => {
    const fetchDocument = async () => {
      const organisationId = sessionStorage.getItem("organisationId");

      if (organisationId) {
        const response = await Organisationapi().fetchDocument(organisationId);
        if (response.data) {
          setInitialState(response.data);
          if (response.data.id != null) {
            sessionStorage.setItem("documentUpdate", true);
            sessionStorage.setItem("documentId", response.data.id);
            sessionStorage.setItem("cancelledChequeUrl", response.data.cancelledChequeUrl);
            sessionStorage.setItem("companyPanCardUrl", response.data.companyPanCardUrl);
            sessionStorage.setItem("auditedStatementUrl", response.data.lastAuditedStatements[0].auditedStatementUrl);
          }
        }
      }
    };
    fetchDocument();
  }, []);

  const dockyc = async (values, formValues) => {
    const response = await Organisationapi().addordocumentkyc(values);
    if (response.success) {
      notification.success({ message: "ifsc code fetched ..!" });
    } else {
      notification.error({ message: "Limit exceeded.." });
    }
  };

  const setState = (id, value) => {
    if (typeof id == "number") {
      if (initialState["lastAuditedStatements"]?.length) {
        initialState["lastAuditedStatements"][id].auditedStatementFileName = value;
        if (!value) {
          initialState["lastAuditedStatements"][id].auditedStatementUrl = null;
        }
      }
      return;
    } else {
      initialState[id] = value;
    }
  };

  const backClick = () => {
    if (organisationId) history.push(`${appRoutes.ORGANISATION}${appRoutes.ORG_BENEFICIARIES}/${organisationId}`);
  };

  const savedocument = async (values) => {
    const response = await Organisationapi().addorDocument(values);
    if (response.success) {
      notification.success({ message: "Document Details Saved..!" });
      history.push(`${appRoutes.ORGANISATION}${appRoutes.LEGAL}/${organisationId}`);
    }
  };

  return (
    <>
      <div className="documentpage pb-4 formStyles">
        <p className="benifiheading">Financial</p>
        <p>These documents will help us validate your organisation faster</p>

        <div className="row">
          <div className="col-md-7 ">
            <Formik
              initialValues={getInitialValues(organisationId, initialState)}
              enableReinitialize={true}
              validationSchema={Yup.object().shape({
                branchName: Yup.string()
                  .max(246, "Too Long Allowed 246 Charctors.!")
                  .matches(/^[A-Za-z ]*$/, "Only Alphabits!"),
                ifscCode: Yup.string().matches(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/, "Invalid IFSCCode!"),
              })}
              onSubmit={(values) => savedocument(values)}
            >
              {({ values, touched, submitForm, errors, setFieldValue }) => {
                return (
                  <Form className="beneficiaryForms">
                    <div className="row pt-3 formStyles justify-content-between">
                      <div className="col-md-10 col-sm-10">
                        <Field
                          name="ifscCode"
                          formStyles
                          component={Input}
                          class="form-control"
                          placeholder="IFSC Code"
                          errortext={getIn(touched, `ifscCode`) && getIn(errors, `ifscCode`)} 
                        />
                      </div>
                      <div className="col-md-2 col-sm-2 displayFlex justify-content-center align-items-center">
                        <div className="search_div">
                          <SearchOutlined className={"searchIcon"} onClick={() => dockyc(values)} />
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-md-12 col-sm-12">
                        <Field
                          name="accountNumber"
                          component={Input}
                          placeholder="Bank Account Number"
                          class="form-control"
                          type="number"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-md-12 col-sm-12">
                        <Field
                          name="branchName"
                          class="form-control"
                          component={Input}
                          placeholder="Branch Name"
                          errortext={
                            getIn(touched, `branchName`) && getIn(errors, `branchName`) && getIn(errors, `branchName`)
                          }
                        />
                      </div>
                    </div>

                    <CommonFileUpload
                      label="Upload Cancelled Cheque"
                      id="cancelledChequeUrl"
                      fileUrl={initialState["cancelledChequeUrl"]}
                      fileName={initialState["cancelledChequeFilename"]}
                      fileProp="cancelledChequeFilename"
                      ref={fileUploadRef}
                      setFieldValue={setFieldValue}
                      uploadApiService={benificiaryApiMethod}
                      setState={setState}
                    />

                    <div className="formStyles locationhr">
                      <hr />
                    </div>

                    <CommonFileUpload
                      label="Company PAN Card"
                      id="companyPanCardUrl"
                      fileUrl={initialState["companyPanCardUrl"]}
                      fileName={initialState["companyPanCardFilename"]}
                      fileProp="companyPanCardFilename"
                      ref={fileUploadRef}
                      setFieldValue={setFieldValue}
                      uploadApiService={benificiaryApiMethod}
                      setState={setState}
                    />

                    <div className="formStyles locationhr">
                      <hr />
                    </div>

                    <CommonFileUpload
                      label="Last Audited Statement"
                      id="lastAuditedStatements.0.auditedStatementUrl"
                      fileUrl={initialState && initialState["lastAuditedStatements"]?.[0]?.auditedStatementUrl}
                      fileName={initialState && initialState["lastAuditedStatements"]?.[0]?.auditedStatementFileName}
                      fileProp={0}
                      ref={fileUploadRef}
                      setFieldValue={setFieldValue}
                      uploadApiService={benificiaryApiMethod}
                      setState={setState}
                    />

                    <div className="row pt-4">
                      <div className="col-md-6 col-sm-6">
                        <Field
                          className="dropaudit"
                          name={`lastAuditedStatements.0.auditedYear`}
                          placeholder="Year"
                          component={SelectBox}
                          options={auditStatementYears()}
                        />
                      </div>

                      <div className="col-md-6 col-sm-6">
                        <Field
                          name={`lastAuditedStatements.0.auditor`}
                          component={Input}
                          placeholder="Auditor"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div className="formStyles locationhr">
                      <hr />
                    </div>

                    <CommonFileUpload
                      label="Last Audited Statement"
                      id="lastAuditedStatements.1.auditedStatementUrl"
                      fileUrl={initialState && initialState["lastAuditedStatements"]?.[1]?.auditedStatementUrl}
                      fileName={initialState && initialState["lastAuditedStatements"]?.[1]?.auditedStatementFileName}
                      fileProp={1}
                      ref={fileUploadRef}
                      setFieldValue={setFieldValue}
                      uploadApiService={benificiaryApiMethod}
                      setState={setState}
                    />

                    <div className="row pt-4">
                      <div className="col-md-6 col-sm-6">
                        <Field
                          className="dropaudit"
                          name={`lastAuditedStatements.1.auditedYear`}
                          placeholder="Year"
                          component={SelectBox}
                          options={auditStatementYears()}
                        />
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <Field
                          name={`lastAuditedStatements.1.auditor`}
                          component={Input}
                          placeholder="Auditor"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div className="formStyles locationhr">
                      <hr />
                    </div>

                    <CommonFileUpload
                      label="Last Audited Statement"
                      id="lastAuditedStatements.2.auditedStatementUrl"
                      fileUrl={initialState && initialState["lastAuditedStatements"]?.[2]?.auditedStatementUrl}
                      fileName={initialState && initialState["lastAuditedStatements"]?.[2]?.auditedStatementFileName}
                      fileProp={2}
                      ref={fileUploadRef}
                      setFieldValue={setFieldValue}
                      uploadApiService={benificiaryApiMethod}
                      setState={setState}
                    />

                    <div className="row p-3">
                      <div className="col-md-6 col-sm-6" style={{ paddingLeft: 0 }}>
                        <Field
                          className="dropaudit"
                          name={`lastAuditedStatements.2.auditedYear`}
                          placeholder="Year"
                          component={SelectBox}
                          options={auditStatementYears()}
                        />
                      </div>

                      <div className="col-md-6 col-sm-6" style={{ paddingRight: 0 }}>
                        <Field
                          name={`lastAuditedStatements.2.auditor`}
                          component={Input}
                          placeholder="Auditor"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div style={{display: 'flex',justifyContent: 'flex-end',alignItems: 'center'}}>
                      <div className="previous">
                        <Button
                          className="ant-btn-back"
                          // style={{ margin: "0 8px" }}
                          onClick={() => backClick()}
                        >
                          <FontAwesomeIcon icon={faAngleLeft} />
                          &nbsp; Previous Step
                        </Button>
                      </div>
                      <div>
                        <Button onClick={submitForm} className="steps-action  formStyles nextbutton">
                          NEXT: DOCUMENTS-LEGAL
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="col-md-3">
            <img src={document} alt="" className="leadership-image" />
          </div>
        </div>
      </div>
    </>
  );
};

const getInitialValues = (organisationId, initialState) => {
  if (!isEmpty(initialState)) {
    return {
      organisationId: organisationId ? organisationId : "",
      ifscCode: initialState ? initialState.ifscCode : "",
      accountNumber: initialState ? initialState.accountNumber : "",
      branchName: initialState ? initialState.branchName : "",
      cancelledChequeUrl: initialState ? initialState.cancelledChequeUrl : "",
      companyPanCardUrl: sessionStorage.getItem("companyPanCardUrl"),
      lastAuditedStatements: initialState
        ? initialState.lastAuditedStatements
        : [
            {
              id: "",
              auditedYear: initialState ? initialState.auditedYear : "",
              auditor: "",
              auditedStatementUrl: sessionStorage.getItem("auditedStatementUrl"),
            },
            {
              id: "",
              auditedYear: parseInt(initialState ? initialState.auditedYear : ""),
              auditor: "",
              auditedStatementUrl: sessionStorage.getItem("auditedStatementUrl"),
            },
            {
              id: "",
              auditedYear: parseInt(initialState ? initialState.auditedYear : ""),
              auditor: "",
              auditedStatementUrl: sessionStorage.getItem("auditedStatementUrl"),
            },
          ],
    };
  } else {
    return {
      organisationId: organisationId ? organisationId : "",
      ifscCode: initialState ? initialState.ifscCode : "",
      accountNumber: initialState ? initialState.accountNumber : "",
      branchName: initialState ? initialState.branchName : "",
      cancelledChequeUrl: sessionStorage.getItem("cancelledChequeUrl"),
      companyPanCardUrl: sessionStorage.getItem("companyPanCardUrl"),
      lastAuditedStatements: initialState
        ? initialState.lastAuditedStatements
        : [
            {
              id: "",
              auditedYear: initialState ? initialState.auditedYear : "",
              auditor: "",
              auditedStatementUrl: sessionStorage.getItem("auditedStatementUrl"),
            },
            {
              id: "",
              auditedYear: parseInt(initialState ? initialState.auditedYear : ""),
              auditor: "",
              auditedStatementUrl: sessionStorage.getItem("auditedStatementUrl"),
            },
            {
              id: "",
              auditedYear: parseInt(initialState ? initialState.auditedYear : ""),
              auditor: "",
              auditedStatementUrl: sessionStorage.getItem("auditedStatementUrl"),
            },
          ],
    };
  }
};

export default Documents;
