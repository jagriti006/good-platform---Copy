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
import { isEmpty } from "lodash";


const { Text, Title } = Typography;

const EditUserModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const userDetails = useSelector((state) => state.user.userDetails);
  const projects = userDetails.projects;
  const [roles, setRoles] = useState([]);
  const [initialState, setInitialState] = useState("");
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

  useEffect(() => {
      const fetchUserData = async () => {
          const editUserId = props.editInviteUserId;
          const editUserOrgId = props.editInviteUserOrgId;
          const response = await userAPI().getVolunteerDetail(editUserId,editUserOrgId);
          if(response.success){
            setInitialState(response.data);
          }
      };
      fetchUserData();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    props.closeModal();
  };

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
      title={inviteSuccess ? null : "Edit User"}
      visible={isModalVisible}
      onCancel={handleCancel}
      destroyOnClose
      okText="Edit User"
      cancelText="Cancel"
      footer={null}
      centered
      bodyStyle={inviteSuccess ? { paddingRight: 15, paddingBottom: 0 } : null}
    >

      {!inviteSuccess && (
        <Formik
          initialValues={getInitialValues(initialState,props.editInviteUserOrgId)}
          enableReinitialize={true}
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
            const UserId = props.editInviteUserId;
            const newValues = { ...values, projectId: [values.projectId] };
            const response = await userAPI().updateVoulunteerDetail(UserId,newValues);
            if (response.success) {
              notification.success({ message: "Volunteer Updated Successfully..!" });
              setIsModalVisible(false);
            }
          }}
        >
          {({ values, touched, errors, setFieldValue }) => {
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
                      UPDATE
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

const getInitialValues = (initialState,orgId) => {
  const editUserOrgId = orgId;
  if (!isEmpty(initialState)) {
    console.log("initial set value is",initialState);
    return {
      firstName: initialState ? initialState.firstName : "",
      middleName: initialState ? initialState.middleName : "",
      lastName: initialState ? initialState.lastName : "",
      emailId: initialState ? initialState.emailId : "",
      contactNumber: initialState ? initialState.phone : "",
      organisationId: editUserOrgId ? editUserOrgId : "",
      password: "agent@1234",
      addressModel: null,
      projectId:initialState ? initialState.projectsId[0] : "",
      educationQualification: "",
      educationDetails: null,
      userRoleId: initialState ? initialState.roleId : "",
      detailsUpdated:true,
    };
  } else {
    return {
      firstName: "",
      middleName: "",
      lastName: "",
      emailId: "",
      contactNumber: "",
      organisationId: editUserOrgId ? editUserOrgId : "",
      password: "agent@1234",
      addressModel: null,
      projectId: "",
      educationQualification: "",
      educationDetails: null,
      userRoleId: "",
      detailsUpdated:true,
    };
  }
};

export default EditUserModal;
