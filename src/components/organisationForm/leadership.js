import React, {useEffect, useState} from "react";
import {Button, Collapse, message, notification, Typography} from "antd";
import {Form, Field, useFormik, FormikProvider} from "formik";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  MailOutlined,
  PhoneOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import Input from "../FormikComponents/Input/Input";
import Checkbox from "antd/lib/checkbox/Checkbox";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import {isEmpty} from "lodash";
import {InputField} from "../form/inputField";
import {toLowercaseAndReplaceSpaces} from "../../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAngleLeft,
  faHourglassEnd,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {getSocialOrgUrl} from "../../api/config";
import {appConfigurations} from "../../utils/constants";
import Organisationapi from "../../api/organizationapi";
import {formErrorTextStyle} from "../../utils/utils";
import appRoutes from "../../constants/app-routes";
import {useHistory} from "react-router-dom";
import leadership from "../../assets/images/illustrators/leadershipimg.png";
import deleteIcon from "../../assets/images/Delete.png";
import updateIcon from "../../assets/images/Update.png";
import adhaarIcon from "../../assets/images/Adhaar.png";
import callIcon from "../../assets/images/callIcon.png";
import emailIcon from "../../assets/images/emailIcon.png";
import * as Yup from 'yup';
import {value} from "lodash/seq";

const idProofOptions = [
  {value: "none", label: "None"},
  {value: "Pan Card Number", label: "PAN CARD"},
  {value: "Aadhaar Card Number", label: "AADHAAR CARD"},
  {value: "Voter Id Number", label: "VOTER ID"},
  {value: "Driving Licence Number", label: "DRIVING LICENCE"},
];

const {Text} = Typography;

const Leadership = (props) => {
  const [initialState, setInitialState] = useState({
    organisationId: null,
    leadershipTypeData: [],
    organisationMembersList: [],
  });

  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableId, setEditableId] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState(undefined);
  const [isAddMemberForm, setIsAddMemberForm] = useState(false);
  const [tempAmlStatus, setTempAmlStatus] = useState("");
  const [tempPan, setTempPan] = useState("");
  const [amplaceHolder,setAmplaceHolder] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchLeadership = async () => {
      const organisationId = sessionStorage.getItem("organisationId");
      if (organisationId) {
        const response = await Organisationapi().fetchLeadership(
          organisationId
        );
        if (response.data) {
          setInitialState({
            ...initialState,
            organisationId: response.data.organisationId,
            leadershipTypeData: [
              ...new Set(
                response.data.organisationMembersList.map((data) =>
                  data.type.toLowerCase()
                )
              ),
            ],
            organisationMembersList: response.data.organisationMembersList,
          });
          sessionStorage.setItem("leadershipUpdate", true);
        }
      }
      // }
    };
    fetchLeadership();
  }, []);

  const requiredMsg = "This is a required field.";

  const LeadershipSchema = Yup.object().shape({
    name: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!').required(requiredMsg),
    email: Yup.string().email('Invalid email').required(requiredMsg),
    phone: Yup.string().min(10, 'Mobile Number Should Be 10 Digits').max(10, 'Mobile Number Should Be 10 Digits').required(requiredMsg),
    memberName: Yup.string().required(requiredMsg),
    idProofNumber: Yup.string().required(requiredMsg),
    // idProof: Yup.string().required(requiredMsg),
  });

  const validatePanCard = (value, member) => {
    let error;
    let message = 'Invalid Pan Card Number';
    if (!/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value)) {
      error = message;
    } else {
      if (tempPan === value) {
        return;
      }
      setTempPan(value);
      Organisationapi().verifyPanCard(value).then(res => {
        if (res?.result) {
          res.result?.isValid ? error = null : notification.warning({message});
          Organisationapi().verifyAml(value).then(res => {
            const result = res?.result;
            if (result) {
              const defaulter = result?.defaulterList.found && JSON.parse(result.defaulterList.found);
              const dormant = result?.dormantList.found && JSON.parse(result.dormantList.found);
              if (defaulter && dormant) {
                notification.warning({message: "AML test Failed."});
                validateAml("FAILED", member);
              } else {
                validateAml("PASSED", member);
                notification.success({message: "AML test Passed."});
              }
            } else {
              notification.error({message: "Failed to verify Aml!"});
              validateAml("NOT_CHECKED", member);
            };
          });
        } else {
          validateAml("NOT_CHECKED", member);
          notification.warning({message: res?.error?.message});
        }
      });
    }
    return error;
  };

  const validateAml = (status, member) => {
    if (member) {
      member.amlCheck = status;
    } else {
      setTempAmlStatus(status);
    }
  };

  const validateAadharCard = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/.test(value)) {
      error = 'Invalid Aadhar Card Number';
    }
    return error;
  }

  const formik = useFormik({
    initialValues: {
      authorisedSignatory: false,
      email: "",
      idProof: "Pan Card Number",
      idProofNumber: "",
      memberId: "",
      name: "",
      otherIdProof: "",
      otherType: "",
      phone: "",
      type: "",
      memberName: "",
      amlCheck: ""
    },

    onSubmit: async (values, {resetForm}) => {
      if (values.name === "" || values.email === "" || values.phone === "" || values.idProofNumber === "") {
        notification.error(
          {message: "Please Fill All Details"}
        );
        return;
      }

      if (isAddMemberForm) {
        if (values.memberName === undefined || values.memberName === "") {
          notification.error(
            "Please Enter Member Name"
          );
          return;
        }
        
        else {
          if (
            initialState.leadershipTypeData
              .map((data) => data.toLowerCase())
              .includes((values.memberName).toLowerCase())
          ) {
            // notification.error(
            //   "Member with same name already added. Please try with a different member name."
            // );
            // return;
          } 

          else {
            const newMemberData = initialState.leadershipTypeData;
            newMemberData.push(values.memberName);
            setInitialState({
              ...initialState,
              leadershipTypeData: newMemberData,
            });
          }
        }
      }
      if (values.memberName) {
        values.type = values.memberName;
        delete values.memberName;
      } 

      else {
        values.type = selectedPanel;
      }
      values.phone = values.phone.toString();
      let newMemberData;
      if (!isEditMode) {
        values.memberId = `NEW_${Math.random()}`;
        values.amlCheck =  values.amlCheck ? values.amlCheck : tempAmlStatus;
        newMemberData = initialState.organisationMembersList;
        newMemberData.push({...values});
      } 
      
      else {
        newMemberData = initialState.organisationMembersList.map((data) => {
          if (data.memberId === values.memberId) {
            return values;
          } else {
            return data;
          }
        });
      }

      setInitialState({
        ...initialState,
        organisationMembersList: newMemberData,
      });

      resetForm();
      setIsAddMode(false);
      setIsEditMode(false);
      setEditableId(null);
      setIsAddMemberForm(false);
    },
    validationSchema:LeadershipSchema,
  });

  const {
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    setValues,
    isValid,
    submitCount,
  } = formik;

  const closeForm = () => {
    setIsAddMode(false);
    setIsEditMode(false);
    setEditableId(null);
    setIsAddMemberForm(false);
    setValues({
      authorisedSignatory: false,
      email: "",
      idProof: "Pan Card Number",
      idProofNumber: "",
      memberId: "",
      name: "",
      otherIdProof: "",
      otherType: "",
      phone: "",
      type: "",
      amlCheck: ""
    });
  };

  const backClick = () => {
    const organisationId = sessionStorage.getItem("organisationId");
    if (organisationId)
      history.push(
        `${appRoutes.ORGANISATION}${appRoutes.OVERVIEW}/${organisationId}`
      );
  };

  const saveLeadershipData = async () => {
    const token = sessionStorage.getItem("access_token");
    const organisationId = sessionStorage.getItem("organisationId");
    const leadershipUpdate = sessionStorage.getItem("leadershipUpdate");
    try {
      const leaderShipDataResponse = await axios({
        method: leadershipUpdate === "true" ? "PUT" : "POST",
        url: getSocialOrgUrl("organisation/leadership"),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          organisationId: organisationId,
          organisationMembersList: initialState.organisationMembersList.map(
            (data) => {
              if (data.memberId.includes("NEW_")) {
                delete data.memberId;
                return data;
              } else {
                return data;
              }
            }
          ),
        },
      });
      if (leaderShipDataResponse?.data?.success) {
        notification.success({message: "Leadership Details Saved..!"});
        history.push(
          `${appRoutes.ORGANISATION}${appRoutes.LOCATION}/${organisationId}`
        );
      } else {
        notification.error({message: `${leaderShipDataResponse?.data?.error}`});
      }
    } catch (err) {
      // notification.error(appConfigurations.general_error_message);
    }
  };

  const [memberName, setMemberName] = useState(null);

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const addMember = () => {
    if (
      initialState.leadershipTypeData
        .map((data) => data.toLowerCase())
        .includes(memberName.toLowerCase())
    ) {
      notification.error(
        "Member with same name already added. Please try with a different member name."
      );
    } else {
      const newMemberData = initialState.leadershipTypeData;
      newMemberData.push(memberName);
      setInitialState({
        ...initialState,
        leadershipTypeData: newMemberData,
      });
      setMemberName(null);
    }
  };

  const deleteLeadershipData = (memberId) => {
    setInitialState({
      ...initialState,
      organisationId: initialState.organisationId,
      organisationMembersList: initialState.organisationMembersList.filter(
        (data) => data.memberId !== memberId
      ),
    });
  };

  const updateLeadershipData = (memberData, memberId) => {
    setIsEditMode(true);
    setEditableId(memberId);
    setValues(memberData);
    if (isAddMode) {
      setIsAddMode(false);
    }
  };

  return (
    <div className="leaderShipPage">
      <p>Add your founder and other leadership members</p>
      <div className="row">
        <div className="col-md-7 ">
          <FormikProvider value={formik}>
            <div className="formStyles leadershipform">
              <Collapse
                className="formStyles"
                accordion
                expandIconPosition={"right"}
                expandIcon={({isActive}) =>
                  isActive ? (
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="formStyles accordianIcon"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="formStyles accordianIcon"
                    />
                  )
                }
                onChange={(e) => {
                  setSelectedPanel(
                    e && initialState.leadershipTypeData.length > 0
                      ? initialState.leadershipTypeData[e]
                      : undefined
                  );
                  closeForm();
                }}
              >
                {initialState.leadershipTypeData.length > 0 &&
                initialState.leadershipTypeData.map((typeData, index) => {
                  return (
                    <Collapse.Panel header={typeData} key={index}>
                      <div className="arrayInner">
                        {initialState.organisationMembersList
                          .filter(
                            (data) => data.type.toLowerCase() === typeData.toLowerCase()
                          )
                          .map((memberData, index) => {
                            return (
                              <React.Fragment key={index}>
                                {memberData.name ? (
                                  isEditMode &&
                                  editableId &&
                                  memberData.memberId === editableId ? (
                                    <Form
                                      className="formStyles leadershipform"
                                      onSubmit={handleSubmit}
                                    >
                                      {/* {!isValid && submitCount > 0 && (
                                        <span style={formErrorTextStyle()}>
                                            Form has validation errors..!
                                          </span>
                                      )} */}
                                      <div className="col-sm-12 text-right">
                                        <MinusOutlined
                                          onClick={() => closeForm()}
                                        />
                                      </div>
                                      <div className="row pt-3">
                                        <div className="col-sm-12 formStyles">
                                          <Field
                                            name={`name`}
                                            placeholder="e.g John Doe"
                                            type="text"
                                            className="form-control"
                                            component={Input}
                                            placeholder="Full Name"
                                            errortext={ errors.name && touched.name ? errors.name : ""}
                                          />
                                        </div>
                                      </div>
                                      <div className="row pt-3">
                                        <div className="col-sm-12 formStyles">
                                          <Field
                                            name={`email`}
                                            placeholder="e.g xyz@xyz.com"
                                            type="email"
                                            className="form-control"
                                            component={Input}
                                            placeholder="Email Address"
                                            errortext={ errors.email && touched.email ? errors.email : ""}
                                          />
                                        </div>
                                      </div>
                                      <div className="row pt-3">
                                        <div className="col-sm-12 formStyles">
                                          <Field
                                            name={`phone`}
                                            placeholder="08123456789"
                                            type="number"
                                            class="form-control mobile"
                                            component={Input}
                                            maxLength="10"
                                            prefix="+91-"
                                            onInput={maxLengthCheck}
                                            placeholder="Mobile Number"
                                            errortext={ errors.phone && touched.phone ? errors.phone : ""}
                                          />
                                        </div>
                                      </div>
                                      {/* <div className="row pt-3">
                                        <div className="col-sm-12 pt-3 pb-3 formStyle">
                                            <span className="formSubInfo2">
                                              Choose the ID proof you will be
                                              providing:
                                            </span>
                                        </div>
                                        
                                        <div className="col-sm-12">
                                          <Field
                                            name={`idProof`}
                                            placeholder="Choose"
                                            component={SelectBox}
                                            options={idProofOptions}
                                          />
                                        </div>
                                      </div> */}
                                      {/* {!isEmpty(values.idProof) ? (
                                        <div className="row pt-3">
                                          <div className="col-sm-12 formStyles">
                                            <Field
                                              name={`idProofNumber`}
                                              className="form-control"
                                              component={Input}
                                              placeholder={values.idProof}
                                              validate={values.idProof == "Pan Card Number" ? validatePanCard : values.idProof == "Aadhaar Card Number" ? validateAadharCard : ""}
                                              errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                                            />
                                          </div>
                                        </div>
                                      ) : !isEmpty(values.idProofNumber) ? (
                                        setFieldValue("idProofNumber", "")
                                      ) : null} */}
                                      <div className="row pt-3">
                        <div className="col-sm-12 formStyles">
                          <Field
                            name={`idProofNumber`}
                            className="form-control"
                            component={Input}
                            placeholder={"Pan Card Number"}
                            validate={(v) => validatePanCard(v, memberData)}
                            errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                          />
                        </div>
                      </div>

                                      {/*<div className="col-sm-12 pt-3 formStyles">*/}
                                      {/*  <Checkbox*/}
                                      {/*    checked={values.authorisedSignatory}*/}
                                      {/*    onChange={(e) => {*/}
                                      {/*      const checked = e.target.checked;*/}
                                      {/*      setFieldValue(*/}
                                      {/*        `authorisedSignatory`,*/}
                                      {/*        checked*/}
                                      {/*      );*/}
                                      {/*    }}*/}
                                      {/*  >*/}
                                      {/*      <span className="formSubInfo">*/}
                                      {/*        This person is an authorized*/}
                                      {/*        signatory*/}
                                      {/*      </span>*/}
                                      {/*  </Checkbox>*/}
                                      {/*</div>*/}
                                      <div className="row pt-3">
                                        <div className="col-md-8"/>
                                        <div className="col-sm-4">
                                          <Button
                                            htmlType="submit"
                                            className="addcofoundr nextbutton"
                                            block
                                          >
                                            UPDATE
                                          </Button>
                                        </div>
                                      </div>
                                    </Form>
                                  ) : (
                                    <div
                                      className={"m-2 p-4"}
                                      style={{
                                        background: "#f4f8f8",
                                        borderRadius: "1rem",
                                      }}
                                    >
                                      <div
                                        className={
                                          "displayFlex justify-content-between"
                                        }
                                      >
                                        <Text className={"font-weight-bold"}>
                                          {memberData.name || ""}
                                        </Text>
                                        <div style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center"
                                        }}>
                                          <img
                                            src={deleteIcon}
                                            alt=""
                                            onClick={() =>
                                              deleteLeadershipData(
                                                memberData.memberId
                                              )
                                            }
                                            style={{fontSize: "1.2rem", marginRight: "1rem"}}
                                          />

                                          <img
                                            src={updateIcon}
                                            alt=""
                                            onClick={() =>
                                              updateLeadershipData(
                                                memberData,
                                                memberData.memberId
                                              )
                                            }
                                            style={{fontSize: "1.2rem"}}
                                          />
                                        </div>
                                      </div>
                                      <div className={"my-2"}>
                                        <img src={emailIcon} alt=""/>
                                        <Text className={"ml-3"}>
                                          {memberData.email || ""}
                                        </Text>
                                      </div>
                                      <div className={"my-2"}>
                                        <img src={callIcon} alt=""/>
                                        <Text className={"ml-3"}>
                                          +91- {`${memberData.phone || ""}`.replace(/.(?=.{3})/g, 'X')}
                                        </Text>
                                      </div>
                                      <div className={"my-2"}>
                                        <img src={adhaarIcon} alt=""/>
                                        <Text className={"ml-3"}>{`${
                                          memberData.idProof && memberData.idProof.toLowerCase().includes('card') ? memberData.idProof.replace(/card/gi, "") : memberData?.idProof || ""
                                        } No. | ${
                                          memberData.idProofNumber?.replace(/.(?=.{3})/g, 'X') || ""
                                        }`}</Text>
                                      </div>
                                    </div>
                                  )
                                ) : null}
                              </React.Fragment>
                            );
                          })}
                        {isAddMode ? (
                          <Form
                            className="formStyles leadershipform organizationpadding"
                            onSubmit={handleSubmit}
                          >
                            {/* {!isValid && submitCount > 0 && (
                              <span style={formErrorTextStyle()}>
                                  Form has validation errors..!
                                </span>
                            )} */}
                            <div className="col-sm-12 text-right">
                              <MinusOutlined onClick={() => closeForm()}/>
                            </div>
                            <div className="row pt-3">
                              <div className="col-sm-12 formStyles">
                                <Field
                                  name={`name`}
                                  placeholder="e.g John Doe"
                                  type="text"
                                  className="form-control"
                                  component={Input}
                                  placeholder="Full Name"
                                  errortext={ errors.name && touched.name ? errors.name : ""}
                                />
                              </div>
                            </div>
                            <div className="row pt-3">
                              <div className="col-sm-12 formStyles">
                                <Field
                                  name={`email`}
                                  placeholder="e.g xyz@xyz.com"
                                  type="email"
                                  className="form-control"
                                  component={Input}
                                  placeholder="Email Address"
                                  errortext={ errors.email && touched.email ? errors.email : ""}
                                />
                              </div>
                            </div>
                            <div className="row pt-3">
                              <div className="col-sm-12 formStyle">
                                <Field
                                  name={`phone`}
                                  type="number"
                                  class="form-control mobile"
                                  component={Input}
                                  maxLength="10"
                                  prefix="+91-"
                                  onInput={maxLengthCheck}
                                  placeholder="Mobile Number"
                                  errortext={ errors.phone && touched.phone ? errors.phone : ""}
                                />
                              </div>
                            </div>
                            {/* <div className="row pt-3">
                              <div className="col-sm-12 pt-3 formStyle">
                                  <span className="formSubInfo2">
                                    Choose the ID proof you will be providing:
                                  </span>
                              </div>
                              <div className="col-sm-12">
                                <Field
                                  name={`idProof`}
                                  placeholder="Choose"
                                  component={SelectBox}
                                  options={idProofOptions}
                                />
                              </div>
                            </div> */}
                            {/* {!isEmpty(values.idProof) ? (
                              <div className="row pt-3">
                                <div className="col-sm-12 formStyles">
                                  <Field
                                    name={`idProofNumber`}
                                    className="form-control"
                                    component={Input}
                                    placeholder={values.idProof}
                                    validate={values.idProof == "Pan Card Number" ? validatePanCard : values.idProof == "Aadhaar Card Number" ? validateAadharCard : ""}
                                    errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                                 />
                                </div>
                              </div>
                            ) : !isEmpty(values.idProofNumber) ? (
                              setFieldValue("idProofNumber", "")
                            ) : null} */}
                         <div className="row pt-3">
                        <div className="col-sm-12 formStyles">
                          <Field
                            name={`idProofNumber`}
                            className="form-control"
                            component={Input}
                            placeholder={"Pan Card Number"}
                            validate={(v) => validatePanCard(v, null)}
                            errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                          />
                        </div>
                      </div>

                            {/* <div className="col-sm-12 pt-3 formStyles">
                              <Checkbox
                                checked={
                                  values.authorisedSignatory
                                }
                                onChange={(e) => {
                                  const checked =
                                    e.target.checked;
                                  setFieldValue(
                                    `authorisedSignatory`,
                                    checked
                                  );
                                }}
                              >
                                <span className="formSubInfo">
                                  This person is an authorized
                                  signatory
                                </span>
                              </Checkbox>
                            </div> */}
                            <div className="row pt-3">
                              <div className="col-md-8"/>
                              <div className="col-sm-4">
                                <Button
                                  htmlType="submit"
                                  className="addcofoundr nextbutton"
                                  block
                                >
                                  ADD
                                </Button>
                              </div>
                            </div>
                          </Form>
                        ) : null}
                        {values.name === "" && !isAddMode && (
                          <div
                            className={"my-4 mx-2 p-3"}
                            style={{
                              background: "#F2F2F2",
                              border: "1px dashed #9A9898",
                              borderRadius: "6px",
                            }}
                            onClick={() => {
                              setIsAddMode(true);
                            }}
                          >
                            <PlusOutlined
                              color={"#676578"}
                              style={{fontSize: "1.2rem"}}
                            />
                            <Text
                              className={"ml-3"}
                              style={{
                                color: "#39364f",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: "normal",
                                fontSize: "13px",
                                lineHeight: "19px"
                              }}
                            >
                              Add a {typeData}
                            </Text>
                          </div>
                        )}
                      </div>
                    </Collapse.Panel>
                  );
                })}

              </Collapse>

              {isAddMemberForm && (
                <div className="arrayInner" style={{
                  boxShadow: "0px 0px 20px rgb(81 74 129 / 7%)",
                  borderRadius: "12px !important",
                  backgroundColor: "#fff !important",
                  borderBottom: "0px",
                  padding: "2rem"
                }}>
                  <Form
                    className="formStyles leadershipform"
                    onSubmit={handleSubmit}
                  >
                    {/* {!isValid && submitCount > 0 && (
                      <span style={formErrorTextStyle()}>
                        Form has validation errors..!
                      </span>
                    )} */}

                    <div className="row pt-3">
                      <div className="col-sm-12 text-right">
                        <MinusOutlined
                          onClick={() => closeForm()}
                        />
                      </div>
                      <div className="col-sm-12 formStyles">
                        <Field
                          name={`memberName`}
                          type="text"
                          className="form-control"
                          component={Input}
                          placeholder="Job Title"
                          errorText={touched.memberName ? errors.memberName : ""}
                        />
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-sm-12 formStyles">
                        <Field
                          name={`name`}
                          placeholder="e.g John Doe"
                          type="text"
                          className="form-control"
                          component={Input}
                          placeholder="Full Name"
                          errortext={ errors.name && touched.name ? errors.name : ""}
                        />
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-sm-12 formStyles">
                        <Field
                          name={`email`}
                          placeholder="e.g xyz@xyz.com"
                          type="email"
                          className="form-control"
                          component={Input}
                          placeholder="Email Address"
                          errortext={ errors.email && touched.email ? errors.email : ""}
                        />
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-sm-12 formStyle">
                        <Field
                          name={`phone`}
                          type="number"
                          class="form-control mobile"
                          component={Input}
                          maxLength="10"
                          prefix="+91-"
                          onInput={maxLengthCheck}
                          placeholder="Mobile Number"
                          errortext={ errors.phone && touched.phone ? errors.phone : ""}
                        />
                      </div>
                    </div>
                    {/* <div className="row pt-3">
                      <div className="col-sm-12 pt-3 formStyle">
                          <span className="formSubInfo2">
                            Choose the ID proof you will be providing:
                          </span>
                      </div>
                      <div className="col-sm-12">
                        <Field
                          name={`idProof`}
                          placeholder="Choose"
                          component={SelectBox}
                          options={idProofOptions}
                          errorText={errors.idProof && touched.idProof ? errors.idProof : ""}
                          onChange={(amplaceholder) => setAmplaceHolder(amplaceholder)}
                        />
                      </div>
                    </div> */}
                    {/* {!isEmpty(values.idProof) ? (
                      <div className="row pt-3">
                        <div className="col-sm-12 formStyles">
                          <Field
                            name={`idProofNumber`}
                            className="form-control"
                            component={Input}
                            placeholder={amplaceHolder}
                            validate={values.idProof == "Pan Card Number" ? validatePanCard : values.idProof == "Aadhaar Card Number" ? validateAadharCard : ""}
                            errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                          />
                        </div>
                      </div>
                    ) : !isEmpty(values.idProofNumber) ? (
                      setFieldValue("idProofNumber", "")
                    ) : null} */}
                     <div className="row pt-3">
                        <div className="col-sm-12 formStyles">
                          <Field
                            name={`idProofNumber`}
                            className="form-control"
                            component={Input}
                            placeholder={"Pan Card Number"}
                            validate={(v) => validatePanCard(v, null)}
                            errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                          />
                        </div>
                      </div>
                    <div className="row pt-3">
                      <div className="col-md-8"/>
                      <div className="col-sm-4">
                        <Button
                          htmlType="submit"
                          className="addcofoundr nextbutton"
                          block
                        >
                          ADD
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}

              <div className="row pt-3">
                {/*<div className="col-sm-12 formStyles">*/}
                {/*  <div className="form-group input-group mb-0">*/}
                {/*    <label className="has-float-label">*/}
                {/*      <InputField*/}
                {/*        value={memberName}*/}
                {/*        onChange={(e) => setMemberName(e.target.value)}*/}
                {/*        placeholder="Add Member"*/}
                {/*        className="form-control"*/}
                {/*        placeholder="Designation"*/}
                {/*      />*/}
                {/*      <span>Add Member Designation</span>*/}
                {/*    </label>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className="col-sm-12 formStyles">
                  <Button
                    onClick={() => {
                      // addMember();
                      setIsAddMemberForm(true);
                    }}
                    // disabled={!memberName}
                    className="addmember"
                  >
                    + Add more members
                  </Button>
                </div>
              </div>
              <div style={{display: 'flex',justifyContent: 'flex-end',alignItems: 'center'}}>
                <div className="previous">
                  <Button
                    className="ant-btn-back"
                    onClick={() => backClick()}
                  >
                    <FontAwesomeIcon icon={faAngleLeft}/>
                    &nbsp; Previous Step
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => saveLeadershipData()}
                    className="steps-action formStyles nextbutton"
                  >
                    NEXT: LOCATIONS
                  </Button>
                </div>
              </div>
            </div>
          </FormikProvider>
        </div>
        <div className="col-md-3">
          <img src={leadership} alt="" className="leadership-image"/>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
