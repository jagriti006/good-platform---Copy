import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Col, Modal, notification, Row, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import Input from "../../FormikComponents/Input/Input";
import userAPI from "../../../api/userAPI";
import { useSelector } from "react-redux";
import SelectBox from "../../FormikComponents/SelectBox/SelectBox";
import { trasformToValueAndLabel } from "../../../utils/utils";
import { remove } from "lodash-es";
import successBg from "../../../assets/images/illustrators/invite-success.png";

const { Text, Title } = Typography;

const UserForm = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const userDetails = useSelector((state) => state.user.userDetails);
  const projects = userDetails.projects;
  const [roles, setRoles] = useState([]);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  useEffect(() => {
    setIsModalVisible(true);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await userAPI().fetchRoles();
      if (response.data) {
        const notSocialAdmin = remove(
          response.data,
          (item) => item.role !== "SOCIAL-ADMIN"
        );
        setRoles(trasformToValueAndLabel(notSocialAdmin, "role"));
      }
    };
    fetchData();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    props.closeModal();
    // history.push("/dashboard");
  };
  //
  // DEV env id's
  // const ummeedProjectId = "2c9f92237ad3bc59017ae3101ff00043";
  // const rationProjectId = "2c9f92237b739d2b017b76a264250005";

  // const arpanOrgId = "2c9f92237b739e55017b82b8a80a0064";
  // const ummeedOrgId = "2c9f92237ae37b9a017ae391d3390009";

  // TEST env id's
  // const ummeedProjectId = "2c9f888c7ad45a44017ae709f1370010";
  // const rationProjectId = "2c9f888c7b97797d017b97898d410000";

  // const arpanOrgId = "2c9f888c7b864715017b976dbce80008";
  // const ummeedOrgId = "2c9f888c7adc0efa017ae251c2e20079";

  // test env kolkata team id
  // const arpanProjectId = "2c9f888c7baa5008017bde0f8a650000";
  // const arpanOrgId = "2c9f888c7bc371d1017bd3bc6e47000d";

  // test env Pune team id
  // const arpanProjectId = "2c9f888c7baa5008017bde12e8120006";
  // const arpanOrgId = "2c9f888c7bc371d1017bd3c04bc50012";

  // Production server id's
  // const ummeedProjectId="8a8b803a7b9847b3017ba62e17670000";
  // const ummeedOrgId="8a8b803a7b98333f017b9d3706d5001d";

  // const rationProjectId = "8a8b803a7beda952017c02abcbaf0000";
  // const arpanOrgId = "8a8b803a7bf37aa5017bf84f99e60003";

  const organisationidValue = userDetails?.organisationId;

  const renderProjects = () => {
    const project = [];

    projects && projects.map((data) => {
      project.push({
        label: data.project,
        value: data.id
      });
    });

    return project;
  }

  return (
    <Modal
      title={inviteSuccess ? null : "Invite User"}
      visible={isModalVisible}
      onCancel={handleCancel}
      destroyOnClose
      okText="Invite User"
      cancelText="Cancel"
      footer={null}
      centered
      bodyStyle={inviteSuccess ? { paddingRight: 15, paddingBottom: 0 } : null}
    >
      {/* dev env role id */}
      {/* 2c9f92237a9ee530017a9eee1c47000c */}
      {/* test env role id */}
      {/* 62d251f4e48a11ebba800242ac130004 */}

      {/* production env role id */}
      {/* 8a8b803a7b98333f017b9b21ab960002 */}

      {!inviteSuccess && (
        <Formik
          initialValues={{
            firstName: "",
            middleName: "",
            lastName: "",
            emailId: "",
            contactNumber: "",
            organisationId: userDetails?.organisationId || "",
            password: "agent@1234",
            addressModel: null,
            projectId: "",
            educationQualification: "",
            educationDetails: null,
            userRoleId: "",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First Name is required."),
            emailId: Yup.string()
              .email("Invalid Email")
              .required("Email is required."),
            contactNumber: Yup.mixed().required("Contact Number is required."),
            projectId: Yup.string().required("Program is required."),
            userRoleId: Yup.string().required("Role is required."),
          })}
          onSubmit={async (values) => {
            const newValues = { ...values, projectId: [values.projectId] };
            const response = await userAPI().inviteUser(newValues);
            if (response.success) {
              setInviteSuccess(true);
              // notification.success({
              //   message: "Invitation Sent..!",
              // });
              // history.push("/dashboard");
              // handleCancel();
            }
          }}
        >
          {({ values, touched, errors, setFieldValue }) => {
            console.log("values projectId ==> ",values.projectId);
            return (
              <Form>
                <Row justify="space-between" gutter={[16, 8]}>
                  <Col span={24}>
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="First Name"
                      errortext={touched.firstName ? errors.firstName : ""}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name="middleName"
                      component={Input}
                      placeholder="Middle Name"
                      errortext={touched.middleName ? errors.middleName : ""}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="Last Name"
                      errortext={touched.lastName ? errors.lastName : ""}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name="emailId"
                      component={Input}
                      placeholder="Email Address"
                      errortext={touched.emailId ? errors.emailId : ""}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name="contactNumber"
                      component={Input}
                      placeholder="Phone Number"
                      errortext={
                        touched.contactNumber ? errors.contactNumber : ""
                      }
                    />
                  </Col>
                  <Col span={24}>
                    {/*<Field*/}
                    {/*  name="projectId"*/}
                    {/*  component={SelectBox}*/}
                    {/*  placeholder="Program"*/}
                    {/*  errortext={touched.projectId ? errors.projectId : ""}*/}
                    {/*  options={[*/}
                    {/*    {*/}
                    {/*      label: `${*/}
                    {/*        organisationidValue ==*/}
                    {/*          "2c9f92237b739e55017b82b8a80a0064" ||*/}
                    {/*        organisationidValue ==*/}
                    {/*          "2c9f888c7bc371d1017bd3c04bc50012" ||*/}
                    {/*        organisationidValue ==*/}
                    {/*          "2c9f888c7bc371d1017bd3bc6e47000d"*/}
                    {/*          ? "Arpan"*/}
                    {/*          : "Ummeed"*/}
                    {/*      }`,*/}
                    {/*      value: `${*/}
                    {/*        organisationidValue ==*/}
                    {/*        "2c9f92237b739e55017b82b8a80a0064"*/}
                    {/*          ? "2c9f92237b739d2b017b76a264250005"*/}
                    {/*          : organisationidValue ==*/}
                    {/*            "2c9f888c7bc371d1017bd3c04bc50012"*/}
                    {/*          ? "2c9f888c7baa5008017bde12e8120006"*/}
                    {/*          : organisationidValue ==*/}
                    {/*            "2c9f888c7bc371d1017bd3bc6e47000d"*/}
                    {/*          ? "2c9f888c7baa5008017bde0f8a650000"*/}
                    {/*          : "2c9f92237ad3bc59017ae3101ff00043"*/}
                    {/*      }`,*/}
                    {/*    },*/}
                    {/*    // {*/}
                    {/*    //   label: "Arpan",*/}
                    {/*    //   value: "2c9f92237b739d2b017b76a264250005",*/}
                    {/*    // },*/}
                    {/*  ]}*/}
                    {/*/>*/}
                    <Field
                      name="projectId"
                      component={SelectBox}
                      placeholder="Program"
                      errortext={touched.projectId ? errors.projectId : ""}
                      options={renderProjects()}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name="userRoleId"
                      component={SelectBox}
                      placeholder="Role"
                      errortext={touched.userRoleId ? errors.userRoleId : ""}
                      options={roles}
                    />
                  </Col>
                </Row>
                <Row justify="center" className="beneficiaryForms mt-2">
                  <Col lg={4} sm={12}>
                    <Button key="back" htmlType="submit" type="primary">
                      INVITE
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      )}
      {/* Invite Success */}

      {inviteSuccess && (
        <div className="align-items-center justify-content-center pt-4">
          <div className="row flex-column text-center">
            <div className="col">
              <Title level={3}>You've Invited a Volunteer!</Title>
            </div>
            <div className="col">
              <Button key="back" onClick={handleCancel} type="link">
                View all volunteers
              </Button>
            </div>
          </div>
          <div className="row mt-4 justify-content-end">
            <img src={successBg} alt="Invite Success" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UserForm;
