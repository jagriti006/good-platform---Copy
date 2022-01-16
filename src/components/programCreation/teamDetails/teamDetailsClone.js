import { Button, Col, Row, notification, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Field, useFormik, FormikProvider } from "formik";
import Input from "../../FormikComponents/Input/Input";
import SelectBox from "../../FormikComponents/SelectBox/SelectBox";
import * as Yup from "yup";
import { PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import ProgramcreationAPI from "../../../api/programcreationAPI";
import Text from "antd/lib/typography/Text";
import appRoutes from "../../../constants/app-routes";
import session from "redux-persist/lib/storage/session";
import deleteIcon from "../../../assets/images/Delete.png";
import updateIcon from "../../../assets/images/Update.png";
import adhaarIcon from "../../../assets/images/Adhaar.png";
import callIcon from "../../../assets/images/callIcon.png";
import emailIcon from "../../../assets/images/emailIcon.png";
import "./teamDetailsClone.scss";

const TeamDetails = (props) => {
  const [roles, setRoles] = useState([]);
  const { programId } = useParams();
  const [initialState, setInitialState] = useState({
    projectId: null,
    projectPrimaryContactRequest: null,
    projectCoreTeamRequest: [],
  });
  const history = useHistory();
  const projectId = useParams().programId;
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableId, setEditableId] = useState(null);

  useEffect(() => {
    const fetchProjectteamdetails = async () => {
      if (programId) {
        const response = await ProgramcreationAPI().fetchProjectteamdetails(programId);
        if (response.data) {
          if (
            response.data.projectCoreTeamRequest.length > 0 ||
            response.data.projectPrimaryContactRequest?.id !== undefined
          ) {
            sessionStorage.setItem("teamdetailsUpdate", true);
          }

          setInitialState({
            ...initialState,
            projectId: programId,
            projectPrimaryContactRequest: response.data.projectPrimaryContactRequest,
            projectCoreTeamRequest: response.data.projectCoreTeamRequest,
          });
        }
      }
    };
    fetchProjectteamdetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      positionId: "",
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNumber: "",
      about: "",
      keyResponsibilities: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required("First Name is required.")
        .max(248, "Maximum 248 characters allowed.")
        .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
      lastName: Yup.string()
        .required("Last Name is required.")
        .max(248, "Maximum 248 characters allowed.")
        .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
      emailId: Yup.string()
        .email("Invalid Email")
        .required("Email is required.")
        .max(248, "Maximum 248 characters allowed."),
      positionId: Yup.string().required("Position is required."),
      phoneNumber: Yup.string()
        .required("Phone Number is required.")
        .length(10, "Only 10 digits allowed.")
        .matches(/^[0-9]+$/, "Allow only digits."),
      about: Yup.string()
        .required("About is required.")
        .max(248, "Maximum 248 characters allowed.")
        .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
      keyResponsibilities: Yup.string().required("Key Role is required."),
    }),
  });

  const primaryFormik = useFormik({
    initialValues: {
      id: "",
      fullName: "",
      emailId: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .required("Full Name is required.")
        .max(248, "Maximum 248 characters allowed.")
        .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
      emailId: Yup.string()
        .email("Invalid Email")
        .required("Email is required.")
        .max(248, "Maximum 248 characters allowed."),
      phoneNumber: Yup.string()
        .required("Phone Number is required.")
        .length(10, "Only 10 digits allowed.")
        .matches(/^[0-9]+$/, "Allow only digits."),
    }),
  });

  useEffect(() => {
    const fetchAsyncData = async () => {
      const response = await ProgramcreationAPI().fetchProjetcKeyRoles();
      if (response?.data?.projectTeamAllRolesResponse) {
        const roles = response?.data.projectTeamAllRolesResponse.map((item) => {
          return {
            value: item.id,
            label: item.role,
          };
        });
        setRoles(roles);
      }
    };
    fetchAsyncData();
  }, []);

  useEffect(() => {
    if (initialState.projectPrimaryContactRequest) {
      primaryFormik.setValues(initialState.projectPrimaryContactRequest);
    }
  }, [initialState]);

  const backClick = () => {
    history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_BASIC}/${programId}`);
  };

  const saveTeamDetails = async () => {
    if (primaryFormik.values.id === "") {
      delete primaryFormik.values.id;
    }

    primaryFormik.values.phoneNumber = primaryFormik.values.phoneNumber.toString();

    const newData = {
      ...initialState,
      projectPrimaryContactRequest: primaryFormik.values,
      projectCoreTeamRequest: initialState.projectCoreTeamRequest.map((data) => {
        data.phoneNumber = data.phoneNumber.toString();

        if (data.id.includes("NEW_")) {
          delete data.id;
        }
        return data;
      }),
    };

    const response = await ProgramcreationAPI().addOrUpdateTeamDetail(newData);

    if (response.success) {
      notification.success({ message: "Team Details Saved..!" });
      session.setItem("projectId", response.data.projectId);
      history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_METRICS}/${projectId}`);
    }
  };

  const addTeamMember = () => {
    const oldStateData = { ...initialState };
    const newData = {
      ...formik.values,
      id: `NEW_${Math.floor(Math.random() * 2000)}`,
    };

    oldStateData.projectCoreTeamRequest.push({ ...newData });

    setInitialState({ ...oldStateData });
    formik.resetForm();
    setIsAddMode(false);
  };

  const updateTeamMember = (memberData, memberId) => {
    setIsEditMode(true);
    setEditableId(memberId);
    formik.setValues(memberData);

    if (isAddMode) {
      setIsAddMode(false);
    }
  };

  const updateTeamMemberData = () => {
    const newTeamData = initialState.projectCoreTeamRequest.map((data) => {
      if (data.id === editableId) {
        return formik.values;
      } else {
        return data;
      }
    });

    setInitialState({
      ...initialState,
      projectCoreTeamRequest: newTeamData,
    });

    formik.resetForm();
    setIsAddMode(false);
    setIsEditMode(false);
    setEditableId(null);
  };

  const deleteTeamMemberData = async (memberId) => {
    const findLocalId = initialState.projectCoreTeamRequest.filter((data) => data.id === memberId);

    if (findLocalId && findLocalId[0].id.includes("NEW_")) {
      const newData = initialState.projectCoreTeamRequest.filter((data) => data.id !== memberId);
      setInitialState({
        ...initialState,
        projectCoreTeamRequest: newData,
      });
    } else {
      const response = await ProgramcreationAPI().deleteProjectteamdetails(memberId);

      if (response.data) {
        const newData = initialState.projectCoreTeamRequest.filter((data) => data.id !== memberId);
        setInitialState({
          ...initialState,
          projectCoreTeamRequest: newData,
        });
      }
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} lg={20}>
        <Row gutter={[16, 16]} className="team_details">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="middle">
              <FormikProvider value={primaryFormik}>
                <Form className="formStyles leadershipform">
                  <Row gutter={[16, 8]}>
                    <Col xs={16}>
                      <h5 className="basictitle">Who is the primary contact for this program?</h5>
                    </Col>
                    <Col xs={24}>
                      <Field
                        name={`fullName`}
                        component={Input}
                        placeholder="Full Name"
                        type="text"
                        errortext={primaryFormik.touched?.fullName && primaryFormik.errors?.fullName}
                      />
                    </Col>
                    <Col xs={24}>
                      <Field
                        name={`emailId`}
                        component={Input}
                        placeholder="Email ID"
                        errortext={primaryFormik.touched?.emailId && primaryFormik.errors?.emailId}
                      />
                    </Col>
                    <Col xs={24}>
                      <Field
                        name={`phoneNumber`}
                        component={Input}
                        placeholder="Mobile No"
                        onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                        type="number"
                        prefix="+91-"
                        errortext={primaryFormik.touched?.phoneNumber && primaryFormik.errors?.phoneNumber}
                      />
                    </Col>
                  </Row>
                </Form>
              </FormikProvider>
              <FormikProvider value={formik}>
                <Row gutter={[16, 8]}>
                  <Col xs={24}>
                    <p
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#3A8D9D",
                      }}
                    >
                      Who are members of your core team?
                    </p>
                  </Col>
                  <Col xs={24}>
                    {initialState.projectCoreTeamRequest.map((memberData, index) => {
                      return isEditMode && editableId === memberData.id ? (
                        <Form
                          className="formStyles leadershipform"
                          style={{
                            marginBottom: "1rem",
                          }}
                        >
                          <div
                            style={{
                              background: "#FFFFFF",
                              boxShadow: "0px 5px 26px rgb(81 74 129 / 7%)",
                              borderRadius: "12px",
                              padding: "2rem",
                            }}
                          >
                            {/*<div className={"row"}>*/}
                            {/*  <div className="col-sm-12">*/}
                            {/*    <Field*/}
                            {/*      name={`idProof`}*/}
                            {/*      placeholder="Choose"*/}
                            {/*      component={SelectBox}*/}
                            {/*      options={[{value: "none", label: "None"},*/}
                            {/*        {value: "Pan card", label: "PAN CARD"},*/}
                            {/*        {value: "Aadhaar Card", label: "AADHAAR CARD"},*/}
                            {/*        {value: "Voter Id", label: "VOTER ID"},*/}
                            {/*        {value: "Driving Licence", label: "DRIVING LICENECE"}]}*/}
                            {/*    />*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                            <Row justify="center">
                              <Col key={1}>
                                <Row>
                                  <Col xs={24}>
                                    <Field
                                      name={`positionId`}
                                      component={SelectBox}
                                      placeholder="Position"
                                      options={roles}
                                      errortext={formik.touched?.positionId && formik.errors?.positionId}
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <Field
                                      name={`firstName`}
                                      placeholder="First name"
                                      type="text"
                                      component={Input}
                                      errortext={formik.touched?.firstName && formik.errors?.firstName}
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <Field
                                      name={`lastName`}
                                      placeholder="Last Name"
                                      type="text"
                                      component={Input}
                                      errortext={formik.touched?.lastName && formik.errors?.lastName}
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <Field
                                      name={`emailId`}
                                      placeholder="Email Address"
                                      component={Input}
                                      errortext={formik.touched?.emailId && formik.errors?.emailId}
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <Field
                                      name={`phoneNumber`}
                                      placeholder="Mobile number"
                                      type="number"
                                      component={Input}
                                      prefix="+91-"
                                      errortext={formik.touched?.phoneNumber && formik.errors?.phoneNumber}
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <Field
                                      name={`keyResponsibilities`}
                                      component={SelectBox}
                                      placeholder="Key Roles & Responsibilities"
                                      options={roles}
                                      errortext={
                                        formik.touched?.keyResponsibilities && formik.errors?.keyResponsibilities
                                      }
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <Field
                                      name={`about`}
                                      component={Input}
                                      inputType="textarea"
                                      autoSize={{
                                        minRows: 3,
                                        maxRows: 6,
                                      }}
                                      placeholder="About"
                                      errortext={formik.touched?.about && formik.errors?.about}
                                    />
                                  </Col>
                                  <Col xs={3} className={"pt-3"} offset={21}>
                                    <Button
                                      htmlType="submit"
                                      // className="addcofoundr nextbutton"
                                      block
                                      style={{
                                        // border: "1px solid #39364F",
                                        // boxSizing: "border-box",
                                        // filter: "drop-shadow(0px 5px 6px rgba(16, 163, 191, 0.05))",
                                        // borderRadius: "6px",
                                        // padding: "0.5rem 2rem",
                                        // height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "15px 50px",
                                        border: "1px solid #39364F",
                                        boxSizing: "border-box",
                                        filter: "drop-shadow(0px 5px 6px rgba(16, 163, 191, 0.05))",
                                        borderRadius: "6px",
                                      }}
                                      disabled={
                                        !!(
                                          formik.errors.firstName ||
                                          formik.errors.lastName ||
                                          formik.errors.emailId ||
                                          formik.errors.phoneNumber ||
                                          formik.errors.positionId ||
                                          formik.errors.keyResponsibilities ||
                                          formik.errors.about
                                        )
                                      }
                                      onClick={() => addTeamMember()}
                                    >
                                      ADD
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                      ) : (
                        <Row gutter={[16, 16]}>
                          <Col xs={24}>
                            <div
                              className={"mb-4 p-4"}
                              style={{
                                background: "#f4f8f8",
                                borderRadius: "1rem",
                              }}
                            >
                              <div className={"displayFlex justify-content-between"}>
                                <Text className={"font-weight-bold"}>
                                  {`${memberData.firstName} ${memberData.lastName}`}
                                </Text>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={deleteIcon}
                                    alt=""
                                    onClick={() => deleteTeamMemberData(memberData.id)}
                                    style={{ fontSize: "1.2rem", marginRight: "1rem" }}
                                  />

                                  <img
                                    src={updateIcon}
                                    alt=""
                                    onClick={() => updateTeamMember(memberData, memberData.id)}
                                    style={{ fontSize: "1.2rem" }}
                                  />
                                </div>
                              </div>
                              <div className={"my-2"}>
                                <img src={emailIcon} alt={""} />
                                <Text className={"ml-3"}>{memberData.emailId}</Text>
                              </div>
                              <div className={"my-2"}>
                                <img src={callIcon} alt={""} />
                                <Text className={"ml-3"}>
                                  +91- {`${memberData.phoneNumber || "-"}`.replace(/.(?=.{3})/g, "X")}
                                </Text>
                              </div>
                              <div className={"my-2"}>
                                <img src={adhaarIcon} alt="" />
                                <Text className={"ml-3"}>
                                  {roles.filter((roleData) => roleData.value === memberData.positionId)[0]?.label}
                                </Text>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      );
                    })}

                    {isAddMode && (
                      <Form className="formStyles leadershipform">
                        <div
                          style={{
                            background: "#FFFFFF",
                            boxShadow: "0px 5px 26px rgb(81 74 129 / 7%)",
                            borderRadius: "12px",
                            padding: "2rem",
                          }}
                        >
                          {/*<div className={"row"}>*/}
                          {/*  <div className="col-sm-12">*/}
                          {/*    <Field*/}
                          {/*      name={`idProof`}*/}
                          {/*      placeholder="Choose"*/}
                          {/*      component={SelectBox}*/}
                          {/*      options={[{value: "none", label: "None"},*/}
                          {/*        {value: "Pan card", label: "PAN CARD"},*/}
                          {/*        {value: "Aadhaar Card", label: "AADHAAR CARD"},*/}
                          {/*        {value: "Voter Id", label: "VOTER ID"},*/}
                          {/*        {value: "Driving Licence", label: "DRIVING LICENECE"}]}*/}
                          {/*    />*/}
                          {/*  </div>*/}
                          {/*</div>*/}
                          <Row justify="center">
                            <Col key={1}>
                              <Row>
                                <Col xs={24}>
                                  <Field
                                    name={`positionId`}
                                    component={SelectBox}
                                    placeholder="Position"
                                    options={roles}
                                    errortext={formik.touched?.positionId && formik.errors?.positionId}
                                  />
                                </Col>
                                <Col xs={24}>
                                  <Field
                                    name={`firstName`}
                                    placeholder="First name"
                                    type="text"
                                    component={Input}
                                    errortext={formik.touched?.firstName && formik.errors?.firstName}
                                  />
                                </Col>
                                <Col xs={24}>
                                  <Field
                                    name={`lastName`}
                                    placeholder="Last Name"
                                    type="text"
                                    component={Input}
                                    errortext={formik.touched?.lastName && formik.errors?.lastName}
                                  />
                                </Col>
                                <Col xs={24}>
                                  <Field
                                    name={`emailId`}
                                    placeholder="Email Address"
                                    component={Input}
                                    errortext={formik.touched?.emailId && formik.errors?.emailId}
                                  />
                                </Col>
                                <Col xs={24}>
                                  <Field
                                    name={`phoneNumber`}
                                    placeholder="Mobile number"
                                    type="number"
                                    component={Input}
                                    prefix="+91-"
                                    errortext={formik.touched?.phoneNumber && formik.errors?.phoneNumber}
                                  />
                                </Col>
                                <Col xs={24}>
                                  <Field
                                    name={`keyResponsibilities`}
                                    component={SelectBox}
                                    placeholder="Key Roles & Responsibilities"
                                    options={roles}
                                    errortext={
                                      formik.touched?.keyResponsibilities && formik.errors?.keyResponsibilities
                                    }
                                  />
                                </Col>
                                <Col xs={24}>
                                  <Field
                                    name={`about`}
                                    component={Input}
                                    inputType="textarea"
                                    autoSize={{
                                      minRows: 3,
                                      maxRows: 6,
                                    }}
                                    placeholder="About"
                                    errortext={formik.touched?.about && formik.errors?.about}
                                  />
                                </Col>
                                <Col xs={3} className={"pt-3"} offset={21}>
                                  <Button
                                    htmlType="submit"
                                    // className="addcofoundr nextbutton"
                                    block
                                    disabled={
                                      !!(
                                        formik.errors.firstName ||
                                        formik.errors.lastName ||
                                        formik.errors.emailId ||
                                        formik.errors.phoneNumber ||
                                        formik.errors.positionId ||
                                        formik.errors.keyResponsibilities ||
                                        formik.errors.about
                                      )
                                    }
                                    onClick={() => addTeamMember()}
                                    className="steps-action formStyles nextbutton"
                                  >
                                    ADD
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Form>
                    )}
                    <Row>
                      <Col xs={24}>
                        <Button
                          block
                          className="addcontent program-creation-form dynamicBox"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            setIsAddMode(true);
                            setIsEditMode(false);
                          }}
                        >
                          Add more members
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormikProvider>
            </Space>
            <div className="floatRight displayFlex formStyles" style={{ marginBottom: "1rem" }}>
              <Button
                className="steps-action formStyles nextbutton"
                type="primary"
                onClick={() => {
                  saveTeamDetails();
                }}
                disabled={
                  !!(
                    primaryFormik.errors.fullName ||
                    primaryFormik.errors.emailId ||
                    primaryFormik.errors.phoneNumber ||
                    formik.errors.firstName ||
                    formik.errors.lastName ||
                    formik.errors.emailId ||
                    formik.errors.phoneNumber ||
                    formik.errors.positionId ||
                    formik.errors.keyResponsibilities ||
                    formik.errors.about
                  )
                }
              >
                NEXT: KEY INDICATORS
              </Button>
            </div>
            <div className="steps-actions floatRight displayFlex previous" style={{ marginBottom: "1rem" }}>
              <Button className="ant-btn-back" onClick={() => backClick()}>
                <FontAwesomeIcon icon={faAngleLeft} />
                &nbsp; Previous Step
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TeamDetails;
