import React, { useEffect, useRef, useState } from "react";
import { Button, Col, notification, Row } from "antd";
import { Collapse } from "antd";
import { Formik, Form, Field } from "formik";
import { Checkbox } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { bytesToSize, getNextStepLink, useQuery } from "../../utils/utils";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { useParams, useHistory } from "react-router-dom";
import appRoutes from "../../constants/app-routes";

/* 
  validation is done with extension from path of file
*/
const acceptedFileFormats = ["jpg", "jpeg", "png"];
const maxFileSizeInBytes = "2097152"; // 2MB
const validateFileFormat = (file) => {
  const extension = file.lastIndexOf(".") + 1;
  if (extension === undefined || extension === "" || extension == null)
    return false;
  const extFile = file.substr(extension, file.length).toLowerCase();
  if (acceptedFileFormats.includes(extFile)) {
    return true;
  }
  return false;
};

const validateFileSize = (file) => {
  const currentFileSize = file.size;
  if (currentFileSize > maxFileSizeInBytes) {
    return false;
  }
  return true;
};

const BeneficiarySelfDeclaration = () => {
  const history = useHistory();
  const { beneficiaryId } = useParams();
  const projectId = useQuery().get("projectId");
  const [fileError, setFileError] = useState(null);
  const fileUploadRef = useRef();
  const [initialState, setInitialState] = useState("");

  useEffect(() => {
    const fetchBeneficiaryAgreement = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryAgreement(
          beneficiaryId
        );
        if (response.data) {
          setInitialState(response.data);
        }
      }
    };
    fetchBeneficiaryAgreement();
  }, []);

  const triggerFileUploadClick = () => {
    if (!fileUploadRef.current) return;
    fileUploadRef.current.click();
  };

  const handleFileUpload = (e, setFieldValue) => {
    const pathValue = e.target.value;
    const file = e.target.files?.[0];
    if (!file || !pathValue) return;
    const isFileFormatValid = validateFileFormat(pathValue);
    const isFileSizeValid = isFileFormatValid ? validateFileSize(file) : false;
    if (isFileFormatValid && isFileSizeValid) {
      setFileError(null);
      setImageUrl(file, "digitalSignatureUrl", setFieldValue);
    } else {
      setFieldValue("digitalSignatureUrl", null);
      const errorMessage = `Please check file selected, allowed files are : ${acceptedFileFormats.join(
        ", "
      )}. and max file size is ${bytesToSize(maxFileSizeInBytes)}.`;
      setFileError(errorMessage);
    }
  };

  const handleFileRemove = (setFieldValue) => {
    setFieldValue("digitalSignatureUrl", null);
    setFileError(null);
  };

  const setImageUrl = async (file, field, setFieldValue) => {
    // console.log("Beneficiary ID Image Change")
    const response = await beneficiaryAPI().uplaodImageAndGetURL(file);
    if (response.data) setFieldValue(field, response.data);
  };

  return (
    <Formik
      initialValues={{
        beneficiaryId: beneficiaryId ? beneficiaryId : "",
        consented: initialState ? initialState.consented : false,
        termsAndCondition: initialState
          ? initialState.termsAndConditions
          : true,
        digitalSignatureUrl: initialState
          ? initialState.digitalSignatureUrl
          : "",
      }}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const response = await beneficiaryAPI().saveBeneficiarySelfDeclaration(
          values
        );
        if (response.data) {
          notification.success({ message: "Agrrement Details Saved..!" });
          history.push(`${getNextStepLink()}/${beneficiaryId}?projectId=${projectId}`);
        }
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="beneficiaryForms beneficiarySelfDeclarationForm">
            <Row justify="space-between">
              <Col span="24">
                <div className="formSection">
                  <Checkbox
                    checked={values.consented}
                    name="consented"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFieldValue("consented", checked);
                      if (!checked) {
                        setFieldValue("digitalSignatureUrl", undefined);
                      }
                    }}
                  >
                    This information is true and correct to the best of my
                    knowledge
                  </Checkbox>
                </div>
              </Col>
              {values.consented && (
                <Col span="12" offset="6">
                  <div className="formSection">
                    <div className="declarationBoxWrapper">
                      <input
                        ref={fileUploadRef}
                        id="fileName"
                        type="file"
                        className="fileUploadInput"
                        onChange={(e) => handleFileUpload(e, setFieldValue)}
                      />
                      <p>Verify with E-signature</p>
                      <Tooltip placement="top" title="Remove file">
                        <CloseCircleOutlined
                          className="removeIcon"
                          onClick={() => handleFileRemove(setFieldValue)}
                        />
                      </Tooltip>

                      <div
                        className="declarationBox"
                        onClick={triggerFileUploadClick}
                      >
                        <p>Signature of the Beneficiary</p>
                        <div className="declarationMeta">
                          <p>Upload e-signature</p>
                          <p>2mb png, jpeg</p>
                        </div>
                      </div>
                    </div>
                    {fileError && (
                      <p className="fileErrorMessage">{fileError}</p>
                    )}
                  </div>
                  {values.signature && (
                    <p className="selectedFile">
                      File selected : {values.signature.name}
                    </p>
                  )}
                  {values.digitalSignatureUrl && (
                    <img
                      src={values.digitalSignatureUrl}
                      width="100%"
                      height="200"
                    />
                  )}
                </Col>
              )}
              <Col span="24">
                <Button>Biometric Verification</Button>
              </Col>
            </Row>

            <Row justify="end">
              <Col xs={12} lg={6}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!values.consented}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BeneficiarySelfDeclaration;
