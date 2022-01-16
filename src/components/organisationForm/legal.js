import React, { useEffect, useState, useRef } from "react";
import { Button, Col, notification, Row } from "antd";
import { useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { Formik, Form, Field } from "formik";
import appRoutes from "../../constants/app-routes";
import Organisationapi from "../../api/organizationapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
import legal from "../../assets/images/illustrators/document2.png";
import CommonFileUpload from "./../common/common-file-upload";
const auditStatement = [
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];

const Legal = (props) => {
  const history = useHistory();
  const [initialState, setInitialState] = useState("");
  const organisationId = sessionStorage.getItem("organisationId");
  const fileUploadRef = useRef();
  const legalApiMethod = beneficiaryAPI().uplaodImageAndGetURL;

  const legalDocs = [
    {
      label: "Certificate of Incorporation",
      id: "certificateOfIncorporationUrl",
      fileName: "certificateOfIncorporationFileName",
    },
    {
      label: "FCRA Approval Letter",
      id: "fcraApprovalLetter",
      fileName: "fcraApprovalLetterFileName",
    },
    { label: "Trust Deed", id: "trustDeedUrl", fileName: "trustDeedFileName" },
    {
      label: "Memorandum of Association",
      id: "memorandumOfAssociationUrl",
      fileName: "memorandumOfAssociationFileName",
    },
    {
      label: "Articles of Association",
      id: "articlesOfAssociationUrl",
      fileName: "articlesOfAssociationFileName",
    },
    {
      label: "80G/12A/12AA Certificate",
      id: "urlOf80G12A12AACertificate",
      fileName: "FileNameOf80G12A12AACertificate",
    },
    { label: "Form CSR 1", id: "formCSR1Url", fileName: "formCSR1FileName" },
  ];

  useEffect(() => {
    const fetchLegal = async () => {
      const organisationId = sessionStorage.getItem("organisationId");
      if (organisationId) {
        const response = await Organisationapi().fetchLegal(organisationId);
        if (response.data) {
          setInitialState(response.data);

          if (response.data.id != null) {
            sessionStorage.setItem("LegalUpdate", true);
            sessionStorage.setItem("legalId", response.data.id, () => {
              console.log("idset", response.data.id);
            });
            console.log(response.data.id);
          }
        }
      }
    };
    fetchLegal();
  }, []);

  // useEffect(() => {

  // }, [initialState])
  const backClick = () => {
    if (organisationId) history.push(`${appRoutes.ORGANISATION}${appRoutes.DOCUMENTS}/${organisationId}`);
  };

  const savedocument = async (values) => {
    const response = await Organisationapi().addorLegal(values);
    if (response.success) {
      notification.success({ message: "Legal Details Saved..!" });
      history.push(`${appRoutes.ORGANISATION}${appRoutes.ORG_PREVIEW}/${organisationId}`);
    }
  };

  const setState = (id, value) => {
    initialState[id] = value;
  };

  return (
    <>
      <div className="documentpage pb-4 formStyles">
        <p className="benifiheading">Legal</p>
        <p>These documents will help us validate your organisation faster</p>
        <div className="row" style={{ margin: 0 }}>
          <div className="col-md-7 ">
            <Formik
              initialValues={getInitialValues(organisationId, initialState)}
              enableReinitialize={true}
              onSubmit={(values) => savedocument(values)}
            >
              {({ values, touched, submitForm, errors, setFieldValue }) => {
                return (
                  <Form className="beneficiaryForms formStyles">
                    {legalDocs.map((doc) => (
                      <CommonFileUpload
                        label={doc.label}
                        id={doc.id}
                        fileUrl={initialState[doc.id]}
                        fileName={initialState[doc.fileName]}
                        fileProp={doc.fileName}
                        ref={fileUploadRef}
                        setFieldValue={setFieldValue}
                        uploadApiService={legalApiMethod}
                        setState={setState}
                      />
                    ))}
                    <div className="d-flex justify-content-end">
                      <a className="privacy-btn" href={values.formcsr1url} target="_blank">
                        <u>Download Form CSR 1 here</u>
                      </a>
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
                          NEXT : Preview
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="col-md-3">
            <img src={legal} alt="" className="leadership-image" />
          </div>
        </div>
      </div>
    </>
  );
};

const getInitialValues = (organisationId, initialState) => {
  const fcraApprovalValidity = initialState?.fcraApprovalValidity ? moment(initialState.fcraApprovalValidity) : null;
  const articlesOfAssociationValidity = initialState?.articlesOfAssociationValidity
    ? moment(initialState.articlesOfAssociationValidity)
    : null;

  if (!isEmpty(initialState)) {
    const LegalId = sessionStorage.getItem("legalId");

    return {
      id: initialState ? initialState.id : LegalId,
      organisationId: organisationId ? organisationId : "",
      certificateOfIncorporationUrl: initialState ? initialState.certificateOfIncorporationUrl : "",
      fcraApprovalLetter: initialState ? initialState.fcraApprovalLetter : "",
      fcraApprovalValidity: fcraApprovalValidity,
      trustDeedUrl: initialState ? initialState.trustDeedUrl : "",
      memorandumOfAssociationUrl: initialState ? initialState.memorandumOfAssociationUrl : "",
      articlesOfAssociationUrl: initialState ? initialState.articlesOfAssociationUrl : "",
      articlesOfAssociationValidity: articlesOfAssociationValidity,
      urlOf80G12A12AACertificate: initialState ? initialState.urlOf80G12A12AACertificate : "",
      formcsr1url:initialState ? initialState.formCSR1Url : "",
    };
  } else {
    const LegalId = sessionStorage.getItem("legalId");

    return {
      id: initialState ? initialState.id : LegalId,
      organisationId: organisationId ? organisationId : "",
      certificateOfIncorporationUrl: initialState ? initialState.certificateOfIncorporationUrl : "",
      fcraApprovalLetter: initialState ? initialState.fcraApprovalLetter : "",
      fcraApprovalValidity: fcraApprovalValidity,
      trustDeedUrl: initialState ? initialState.trustDeedUrl : "",
      memorandumOfAssociationUrl: initialState ? initialState.memorandumOfAssociationUrl : "",
      articlesOfAssociationUrl: initialState ? initialState.articlesOfAssociationUrl : "",
      articlesOfAssociationValidity: articlesOfAssociationValidity,
      urlOf80G12A12AACertificate: initialState ? initialState.urlOf80G12A12AACertificate : "",
      formcsr1url:initialState ? initialState.formCSR1Url : "",
    };
  }
};

export default Legal;
