import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Table } from "antd";
import { Button, Col, Modal, notification, Row, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import cowinAPI from "../../api/cowinAPI";
import OtpInput from "react-otp-input";
import { formErrorTextStyle } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import covinAPI from "../../api/cowinAPI";
import { saveVaccinationDetails } from "../../redux/persisted/persistedActions";

const SCREENS = {
  BEFORE_OTP: "beforeOtp",
  OTP: "otp",
  AFTER_OTP: "afterOtp",
};
const BeneficiaryCoWINModal = ({ isModalVisible, setIsModalVisible, formData, submitBasicDetails }) => {
  const [screenType, setScreenType] = useState(SCREENS.BEFORE_OTP);
  const [txnId, setTxnId] = useState("");
  const [token, setToken] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("");
  const { idProofDetails } = useSelector((state) => state.persisted);
  const dispatch = useDispatch();

  useEffect(() => {
    verifyData();
  }, []);

  const verifyData = () => {
    let isDataValid = true;
    if (idProofDetails === null) {
      isDataValid = false;
      notification.error({ message: "ID proof deatils not found" });
      // history.push(`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_ID_PROOF}`);
    }
    if (formData.mobile === "" || formData.firstName === "") {
      isDataValid = false;
      notification.error({ message: "Some data is missing" });
    }
    return isDataValid;
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const submitDataToCoWIN = async (authToken) => {
    // console.log(authToken);
    const values = {
      authorization: authToken ? authToken : token,
      name: formData.firstName,
      birthYear: new Date(formData.dob).getFullYear().toString(),
      gender: formData.gender,
      photoIdType: idProofDetails.idProof || "",
      photoIdNumber: idProofDetails.idProof_number || "",
      comorbityInd: "Y",
      consentVersion: "1",
    };
    const response = await covinAPI().createNewBeneficiary(values);
    console.log("response data value", values);
    if (response.statusCode === 200) {
      const beneficiaryReferenceId = JSON.parse(response.data).beneficiary_reference_id;
      const values = {
        ...formData,
        beneficiaryReferenceId: beneficiaryReferenceId,
      };
      notification.success({
        message: `CoWIN Beneficiary Created - ${beneficiaryReferenceId}`,
        duration: 0,
      });
      submitBasicDetails(values);
    } else {
      if (response.data) {
        const error = JSON.parse(response.data).error;
        const errorCode = JSON.parse(response.data).errorCode;
        if (error && errorCode) {
          notification.error({
            message: "Something went wrong",
            description: `${errorCode} - ${error}`,
            duration: 0,
          });
        }
      }
    }
  };

  const columns = [
    {
      key: "1",
      title: "Beneficiary ID",
      dataIndex: "beneficiary_reference_id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Gender",
      dataIndex: "gender",
    },
  ];

  const getModalContent = (screenType) => {
    switch (screenType) {
      case SCREENS.BEFORE_OTP:
        return (
          <>
            <Row justify="center">
              <Col span={24}>
                <Typography.Title
                  level={4}
                >{`Click 'Send OTP' to start registartion on CoWIN using Mobile number:  ${formData.mobile}`}</Typography.Title>
              </Col>
            </Row>
            <Row justify="end" className="beneficiaryForms">
              <Col xs={12} lg={6}>
                <Button
                  type="primary"
                  onClick={async () => {
                    const response = await cowinAPI().generateOTP({
                      mobile: formData.mobile,
                    });
                    if (response.statusCode === 200 && response.data) {
                      setTxnId(JSON.parse(response.data).txnId);
                      notification.success({
                        message: `OTP sent to ${formData.mobile}`,
                      });
                      setScreenType(SCREENS.OTP);
                    } else {
                      notification.error({
                        message: "Something went wrong",
                      });
                    }
                  }}
                >
                  Send OTP
                </Button>
              </Col>
              <Col xs={12} lg={6}>
                <Button
                  type="primary"
                  onClick={() => {
                    submitBasicDetails(formData);
                  }}
                >
                  Skip
                </Button>
              </Col>
            </Row>
          </>
        );
      case SCREENS.OTP:
        return (
          <Formik
            initialValues={{
              otp: "",
              txnId: txnId,
            }}
            validationSchema={Yup.object().shape({
              otp: Yup.number().typeError("Invalid OTP").required("OTP is required..!"),
            })}
            onSubmit={async (values) => {
              const response = await cowinAPI().confirmOTP(values);
              if (response.statusCode === 200 && response.authData) {
                const token = JSON.parse(response.authData).token;
                const authToken = JSON.parse(response.authData).token;
                setToken(authToken);
                const list = JSON.parse(response.data).beneficiaries;
                setToken(token);
                if (list && list.length > 0) {
                  setBeneficiaries(list);
                  setScreenType(SCREENS.AFTER_OTP);
                } else {
                  if (verifyData()) submitDataToCoWIN(authToken);
                }
              } else {
                const error = JSON.parse(response.authData).error;
                const errorCode = JSON.parse(response.authData).errorCode;
                if (error && errorCode) {
                  notification.error({
                    message: "Something went wrong",
                    description: `${errorCode} - ${error}`,
                    duration: 0,
                  });
                }
              }
            }}
          >
            {({ values, touched, errors, setFieldValue }) => {
              return (
                <Form className="beneficiaryForms">
                  <Typography.Title level={4}>{`Enter the OTP sent to ${formData.mobile}`}</Typography.Title>
                  <Row justify="center">
                    <Col span={24}>
                      <Field name="otp">
                        {({ field: { value, name }, form: { setFieldValue } }) => (
                          <>
                            <OtpInput
                              value={value}
                              onChange={(otp) => {
                                setFieldValue(name, otp);
                              }}
                              numInputs={6}
                              inputStyle="inputWidth"
                              separator={<span> </span>}
                            />
                            <span style={formErrorTextStyle()}>{touched.otp ? errors.otp : ""}</span>
                          </>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Col xs={12} lg={6}>
                      <Button type="primary" htmlType="submit">
                        Next
                      </Button>
                    </Col>
                    <Col xs={12} lg={6}>
                      <Button
                        type="primary"
                        onClick={() => {
                          setScreenType(SCREENS.BEFORE_OTP);
                        }}
                      >
                        Back
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        );

      case SCREENS.AFTER_OTP:
        return (
          <>
            <Row justify="center">
              <Col span={24}>
                <Typography.Title level={4}>{`Beneficiaries found for Mobile:  ${formData.mobile}`}</Typography.Title>
              </Col>
              <Col span={24}>
                <>
                  <Table
                    rowSelection={{
                      type: "radio",
                      onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedBeneficiary(selectedRows[0]);
                      },
                    }}
                    columns={columns}
                    dataSource={beneficiaries}
                    pagination={false}
                  />
                  <Row justify="end" className="beneficiaryForms">
                    <Col xs={12} lg={12}>
                      <Button
                        type="primary"
                        disabled={selectedBeneficiary === ""}
                        onClick={() => {
                          const values = {
                            ...formData,
                            beneficiaryReferenceId: selectedBeneficiary.beneficiary_reference_id,
                          };
                          dispatch(saveVaccinationDetails(selectedBeneficiary));
                          submitBasicDetails(values);
                        }}
                      >
                        Submit Selected
                      </Button>
                    </Col>
                    <Col xs={12} lg={12}>
                      <Button
                        type="primary"
                        onClick={() => {
                          if (verifyData()) submitDataToCoWIN();
                        }}
                      >
                        Create New
                      </Button>
                    </Col>
                  </Row>
                </>
              </Col>
            </Row>
          </>
        );
    }
  };
  return (
    <Modal
      title="CoWIN Registartion"
      visible={isModalVisible}
      onCancel={handleCancel}
      destroyOnClose
      okText="Invite UserForm"
      cancelText="Cancel"
      footer={[]}
      maskClosable={false}
    >
      {getModalContent(screenType)}
    </Modal>
  );
};

export default BeneficiaryCoWINModal;
