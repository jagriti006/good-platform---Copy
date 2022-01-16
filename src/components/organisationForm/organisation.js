import { Button, Col, Row, Checkbox, Slider, Radio, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { Collapse, message } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import DatePicker from "../FormikComponents/Date/Date";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { appConfigurations } from "../../utils/constants";
import { BASE_URL } from "../../api/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { clearPersistedReducerStateValue } from "../../redux/persisted/persistedActions";
import Organisationapi from "../../api/organizationapi";
import appRoutes from "../../constants/app-routes";
import authenticationAPI from "../../api/authenticationAPI";
import organization from "../../assets/images/illustrators/organization.png";
import moment from "moment";
import OrganisationLanding from "./organisationLanding/organisationLanding"
import * as Yup from 'yup';

const { Panel } = Collapse;
const noofemployee = [
  { value: "0 - 25", label: "0 - 25" },
  { value: "25 - 50", label: "25 - 50" },
  { value: "50 - 75", label: "50 - 75" },
  { value: "75 - 100", label: "75 - 100" },
  { value: "100 - 125", label: "100 - 125" },
  { value: "125 - 150", label: "125 - 150" },
  { value: "150 - 175", label: "150 - 175" },
  { value: "175 - 200", label: "175 - 200" },
  { value: "200 - 225", label: "200 - 225" },
  { value: "225 - 250", label: "225 - 250" },
];

const AADHAAR__CARD = "Aadhaar Card";
const PAN_CARD_TYPE = "PAN card";
const VOTER_ID = "Voter Id";
const DRIVING_LICENCE = "Driving Licence";

const idproff = [
  { value: "1", label: "Select" },
  { value: PAN_CARD_TYPE, label: "PAN Card" },
  { value: AADHAAR__CARD, label: "Aadhaar Card" },
  { value: VOTER_ID, label: "Voter Id" },
  { value: DRIVING_LICENCE, label: "Driving Licence" },
];

const registeras = [
  {
    value: "Not For Profit Organisation",
    label: "Not For Profit Organisation",
  },
  { value: "For Profit Organisation", label: "For Profit Organisation" },
  { value: "Social Enterprise", label: "Social Enterprise" },
  { value: "Government Entity", label: "Government Entity" },
  { value: "Foreign Entity", label: "Foreign Entity" },
];

const organisationType = [
  {
    value: "Private Sector Companies (Sec 8/25)",
    label: "Private Sector Companies (Sec 8/25)",
  },
  {
    value: "Registered Societies (Non-Government)",
    label: "Registered Societies (Non-Government)",
  },
  { value: "Trust (Non - Government)", label: "Trust (Non - Government)" },
  {
    value: "Other Registered Entities (Non-Government)",
    label: "Other Registered Entities (Non-Government)",
  },
  {
    value: "Academic Institutions (Private)",
    label: "Academic Institutions (Private)",
  },
  {
    value: "Academic Institutions (Govt)",
    label: "Academic Institutions (Govt)",
  },
  { value: "Others", label: "Others" },
];

const Organisation = (props) => {
  const { idProofDetails } = useSelector((state) => state.persisted);
  const [roles, setRoles] = useState(null);
  const [isManually, setIsManually] = useState(false);
  const [amlCheck, setAmlStatus] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    doRefresh();
  }, []);

  const history = useHistory();
  const organisationId = sessionStorage.getItem("organisationId");
  // const organisationId = "";
  const [initialState, setInitialState] = useState("");
  const [memberType, setmemberType] = useState();
  const [tempPan, setTempPan] = useState("");
  const token = sessionStorage.getItem("access_token");
  // var idProofNumber = sessionStorage.getItem("idProofNumber");

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const doRefresh = async () => {
    const response1 = await authenticationAPI().refreshToken();
    // console.log("org resp", response1);
    if (response1 && response1.data) {
      // console.log(response1.data.access_token);
      sessionStorage.setItem("access_token", response1.data.access_token);
      sessionStorage.setItem("refresh_token", response1.data.refresh_token);
    } else {
      notification.error({ message: "Unauthorized/Session timeout" });
      window.location.replace("/");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const refreshToken = sessionStorage.getItem("refresh_token");
    const organisationId = sessionStorage.getItem("organisationId");

    const fetchOrganization = async () => {
      console.log("organisationId sdfsdfdsf", organisationId);
      if (organisationId) {
        const response = await Organisationapi().fetchOrganization(
          organisationId
        );
        if (response.data) {
          setInitialState(response.data);
          console.log("response new", response.data);
          if (response.data.id !== null) {
            sessionStorage.setItem("organizationUpdate", true);
            sessionStorage.setItem("organisationId", response.data.id);
            sessionStorage.setItem(
              "creatorMemberId",
              response.data.creatorMemberId
            );
            // message.success("Details Added");
            // // sessionStorage.setItem("access_token", response.data.access_token);
            // sessionStorage.setItem(
            //   "refresh_token",
            //   response.data.refresh_token
            // );
            // sessionStorage.setItem(
            //   "idProofNumber",
            //   response.data.idProofNumber
            // );
          }
        }
      }
    };
    fetchOrganization();
  }, []);

  const backClick = () => {
    if (organisationId)
      history.push(
        `${appRoutes.ORGANISATION}${appRoutes.LEADERSHIP}/${organisationId}`
      );
  };

  const saveOrganization = async (values) => {
    const newValues = {
      ...values,
      amlCheck,
      creatorMemberId: sessionStorage.getItem("creatorMemberId"),
    };
    const response = await Organisationapi().addorOrganization(newValues);
    // console.log("askdasldk ", response);
    if (response.success) {
      notification.success({ message: "Organization Details Saved..!" });
      sessionStorage.setItem("organisationId", response.data.id);
      history.push(
        `${appRoutes.ORGANISATION}${appRoutes.LEADERSHIP}/${response.data.id}`
      );
    }
  };

  useEffect(() => {

    if (history.location.state) {
      const data = history.location.state;
      const yearFounded = data?.result?.dateOfIncorporation ? data?.result?.dateOfIncorporation.split("/") : "";
      const newData = {
        name: data?.result ? data.result?.companyName : "",
        type: data?.result ? data.result?.type : "",
        registerdAs: data?.result ? data.result?.registerdAs : "",
        yearFounded: yearFounded
          ? moment(new Date(+yearFounded[2], yearFounded[1] - 1, +yearFounded[0]))
          : null,
        noOfEmployees: data?.result ? noofemployee.filter(noeData => parseInt(data.result?.numberOfMembers) >= parseInt(noeData.value.split(" - ")[0]) && parseInt(data.result?.numberOfMembers) < parseInt(noeData.value.split(" - ")[1]))[0]?.value : "",
        emailId: data?.result ? data.result?.emailId : "",
        website: data?.result ? data.result?.website : "",
        gstNumber: data?.result ? data.result?.gstNumber : "",
        approvalStatus: "NONE",
        headquarterCountry: Number("0"),
        about: "",
        fullName: data?.result ? data.result?.directorDetails && data.result.directorDetails[0].name || "" : "",
        memberType: data?.result ? data.result?.memberType || "Other" : "Other",
        mobile: data?.result ? data.result?.mobile : "",
        idProof: data?.result ? data.result?.idProof : "",
        otherMemberType: data?.result ? data.result?.directorDetails && data.result.directorDetails[0].designation : "",
        memberEmailId: data?.result ? data.result?.memberEmailId : "",
        otherIdProof: "",
        idProofNumber: data?.result ? data.result?.idProofNumber : "",
        creatorMemberId: sessionStorage.getItem("creatorMemberId"),
      };
      setInitialState(newData);
    }
  }, [history.location.state])
  const requiredMsg = "This is a required field.";

  const OverviewSchema = Yup.object().shape({
    name: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!').required(requiredMsg),
    fullName: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!').required(requiredMsg),
    emailId: Yup.string().email('Invalid email').required(requiredMsg),
    memberEmailId: Yup.string().email('Invalid email').required(requiredMsg),
    website: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url!').required(requiredMsg),
    mobile: Yup.string() .matches(/^[0-9]+$/, "Allow only digits.").min(10, 'Mobile Number Should Be 10 Digits').max(10, 'Mobile Number Should Be 10 Digits').required(requiredMsg),
    registerdAs: Yup.string().required(requiredMsg),
    type: Yup.string().required(requiredMsg),
    gstNumber: Yup.mixed().required(requiredMsg),
    yearFounded: Yup.mixed().required(requiredMsg),
    noOfEmployees: Yup.string().required(requiredMsg),
    memberType: Yup.string().required(requiredMsg),
    otherMemberType: Yup.string().when('memberType', (memType) => {
      if (memType === "Other") {
        return Yup.string().required(requiredMsg);
      }
    }),
    // idProof: Yup.string().required(requiredMsg),
    idProofNumber: Yup.string().required(requiredMsg),
  });

  const validatePanCard = (value) => {
    if (tempPan === value) {
      return;
    }
    setTempPan(value);
    let error;
    let message = 'Invalid Pan Card Number';
    if (!/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value)) {
      error = message;
    } else {
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
                setAmlStatus("FAILED");
              } else {
                setAmlStatus("PASSED");
                notification.success({message: "AML test Passed."});
              }
            } else {
              notification.error({message: "Failed to verify Aml!"});
              setAmlStatus("NOT_CHECKED");
            };
          });
        } else {
          notification.warning({message: res?.error?.message});
          setAmlStatus("NOT_CHECKED");
        }
      });
    }
    return error;
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

  return (
    <div className="overviewPage">
      {/* <div className="row">
        <p className="formInfo pl-3">
          We were able to retrieve most of your company details! In case we <br/>got
          something wrong, please edit before proceeding
        </p>
      </div> */}
      {!organisationId && !isManually ?
        <OrganisationLanding onclick={() => setIsManually(true)}/>
        :
        <div className="row">
          <p class="formInfo pl-3">We were able to retrieve most of your company details! In case we <br/>got something wrong, please edit before proceeding</p>
          <div className="col-md-7 pb-4">
            <Formik
              initialValues={getInitialValues(
                organisationId,
                initialState
                // idProofDetails
              )}
              validationSchema={OverviewSchema}
              enableReinitialize={true}
              onSubmit={(values) => saveOrganization(values)}
            >
              {({values, touched, submitForm, errors, setFieldValue}) => {
                return (
                  <Form className="formStyles">
                    <Collapse defaultActiveKey={["1"]} className="formStyles">
                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="name"
                            class="form-control"
                            component={Input}
                            placeholder="Organisation Name"
                            errortext={ errors.name && touched.name ? errors.name : ""}
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="registerdAs"
                            component={SelectBox}
                            options={registeras}
                            placeholder="Registered as"
                            errortext={ errors.registerdAs && touched.registerdAs ? errors.registerdAs : ""}
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="type"
                            component={SelectBox}
                            options={organisationType}
                            placeholder="Organisation Type"
                            errortext={ errors.type && touched.type ? errors.type : ""}
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-12">
                          <Field
                            class="form-control"
                            name="gstNumber"
                            component={Input}
                            errortext={ errors.gstNumber && touched.gstNumber ? errors.gstNumber : ""}
                            placeholder="GST Number"
                          />
                        </div>
                      </div>

                      <div>
                        <>
                          <div>
                            <div className="row pt-3">
                              <div className="col-sm-6 ">
                                <Field
                                  class="form-control"
                                  name="yearFounded"
                                  component={DatePicker}
                                  format="DD/MM/YYYY"
                                  placeholder="Year Founded"
                                  disabledDate={(d) => !d || d.isAfter(new Date())}
                                  errortext={ errors.yearFounded && touched.yearFounded ? errors.yearFounded : ""}
                                />
                              </div>
                              <div className="col-sm-6 ">
                                <Field
                                  name="noOfEmployees"
                                  placeholder="No of Employees"
                                  component={SelectBox}
                                  options={noofemployee}
                                  errortext={ errors.noOfEmployees && touched.noOfEmployees ? errors.noOfEmployees : ""}
                                />
                              </div>
                            </div>
                            <div className="row pt-3">
                              <div className="col-sm-12 ">
                                <Field
                                  class="form-control"
                                  name="emailId"
                                  component={Input}
                                  placeholder="Organisation Email"
                                  errortext={ errors.emailId && touched.emailId ? errors.emailId : ""}
                                />
                              </div>
                            </div>
                            <div className="row pt-3">
                              <div className="col-sm-12 ">
                                <Field
                                  name="website"
                                  class="form-control"
                                  component={Input}
                                  placeholder="Website URL(Optional)"
                                  errortext={ errors.website && touched.website ? errors.website : ""}
                                />
                              </div>
                            </div>
                          </div>

                            <div className="locationhr">
                              <hr/>
                            </div>
                          </>
                        </div>
                        <div>
                          <br/>
                        </div>
                        <div className="userheading">
                          <h4 className="formSubHeading">User Details</h4>
                          <p className="formSubInfo">Tell us about your role</p>
                        </div>

                      <div className="row formStyles">
                        <div className="col-sm-12 pb-4 formStyles">
                          <Radio.Group
                            name="memberType"
                            className="drop"
                            value={values.memberType}
                            onChange={(e) =>
                              setFieldValue("memberType", e.target.value)
                            }
                            errortext={ errors.memberType && touched.memberType ? errors.memberType : ""}
                            error={ errors.memberType && touched.memberType ? errors.memberType : ""}
                          >
                            <Radio value={"Founder"}>Founder</Radio>
                            <Radio value={"Board of Director"}>
                              Board of Director
                            </Radio>
                            <Radio value={"C-Suite"}>C-Suite</Radio>
                            <Radio value={"Other"}>Other</Radio>
                          </Radio.Group>
                        </div>
                      </div>

                      {values.memberType === "Other" && (
                        <div className="row pt-3">
                          <div className="col-sm-12 pb-4">
                            <Field
                              class="form-control"
                              name="otherMemberType"
                              component={Input}
                              placeholder="Designation"
                              errortext={ errors.otherMemberType && touched.otherMemberType ? errors.otherMemberType : ""}
                            />
                          </div>
                        </div>
                      )}

                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="fullName"
                            class="form-control"
                            component={Input}
                            placeholder="Full Name"
                            errortext={ errors.fullName && touched.fullName ? errors.fullName : ""}
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="memberEmailId"
                            component={Input}
                            class="form-control"
                            placeholder="Email Address"
                            errortext={ errors.memberEmailId && touched.memberEmailId ? errors.memberEmailId : ""}
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-12">
                          <Field
                            name="mobile"
                            placeholder="Mobile Number"
                            class="form-control mobile "
                            component={Input}
                            // type="number"
                            onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                            maxLength="10"
                            prefix="+91-"
                            onInput={maxLengthCheck}
                            errortext={ errors.mobile && touched.mobile ? errors.mobile : ""}
                          />
                        </div>
                      </div>

                      {/* <div className="row pt-3">
                        <div className="col-sm-12 pt-3 pb-4 formStyle">
                        <span className="formSubInfo">
                          What ID proof are you providing?
                        </span>
                        </div>
                        <div className="col-sm-12">
                          <Field
                            // class="form-control"
                            name="idProof"
                            placeholder="Choose"
                            component={SelectBox}
                            options={idproff}
                          />
                        </div>
                      </div> */}
                      {/* {values.idProof === AADHAAR__CARD && (
                        <div className="row pt-3">
                          <div className="col-sm-12 pb-4">
                            <Field
                              class="form-control"
                              name="idProofNumber"
                              component={Input}
                              placeholder="Aadhar Card Number"
                              validate={validateAadharCard}
                              errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                            />
                          </div>
                        </div>
                      )} */}
                      {/* {values.idProof === PAN_CARD_TYPE && ( */}
                        <div className="row pt-3">
                          <div className="col-sm-12 pb-4">
                            <Field
                              class="form-control"
                              name="idProofNumber"
                              component={Input}
                              placeholder="PAN Card Number"
                              validate={validatePanCard}
                              errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                            />
                          </div>
                        </div>
                      {/* )} */}
                      {/* {values.idProof === VOTER_ID && (
                        <div className="row pt-3">
                          <div className="col-sm-12 pb-4">
                            <Field
                              class="form-control"
                              name="idProofNumber"
                              component={Input}
                              placeholder="Voter Id Number"
                              errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                            />
                          </div>
                        </div>
                      )}
                      {values.idProof === DRIVING_LICENCE && (
                        <div className="row pt-3">
                          <div className="col-sm-12 pb-4">
                            <Field
                              class="form-control"
                              name="idProofNumber"
                              component={Input}
                              placeholder="Driving Licence Number"
                              errortext={ errors.idProofNumber && touched.idProofNumber ? errors.idProofNumber : ""}
                            />
                          </div>
                        </div>
                      )} */}
                    </Collapse>
                    <div className="row">
                      <div className="col-md-7"></div>
                      <div className="col-md-5 floatRight displayFlex">
                        <Button
                          onClick={submitForm}
                          className="steps-action formStyles nextbutton"
                        >
                          NEXT: LEADERSHIP
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="col-md-3">
            <img src={organization} alt="" className="organization-image"/>
          </div>
        </div>
      }
    </div>
  );
};

const getInitialValues = (organisationId, initialState, idProofDetails) => {
  const yearFounded = initialState?.yearFounded
    ? moment(initialState.yearFounded)
    : null;
  if (!isEmpty(initialState)) {
    // var idProofNumber = sessionStorage.getItem("idProofNumber");
    var creatorMemberId = sessionStorage.getItem("creatorMemberId");

    return {
      organisationId: organisationId ? organisationId : "",
      // beneficiaryType: initialState ? initialState.beneficiaryType : "",
      name: initialState ? initialState.name : "",
      type: initialState ? initialState.type : "",
      registerdAs: initialState ? initialState.registerdAs : "",
      yearFounded: yearFounded,
      noOfEmployees: initialState ? initialState.noOfEmployees : "",
      emailId: initialState ? initialState.emailId : "",
      website: initialState ? initialState.website : "",
      gstNumber: initialState ? initialState.gstNumber : "",
      approvalStatus: "NONE",
      headquarterCountry: Number("0"),
      about: "",
      fullName: initialState ? initialState.fullName : "",
      memberType: initialState ? initialState.memberType : "",
      mobile: initialState ? initialState.mobile : "",
      idProof: initialState ? initialState.idProof : "",
      otherMemberType: initialState ? initialState?.otherMemberType : "",
      memberEmailId: initialState ? initialState.memberEmailId : "",
      otherIdProof: "",
      idProofNumber: initialState ? initialState.idProofNumber : "",
      creatorMemberId: creatorMemberId,
    };
  } else {
    return {
      organisationId: organisationId ? organisationId : "",
      name: initialState ? initialState.name : "",
      type: initialState ? initialState.type : "",
      registerdAs: initialState ? initialState.registerdAs : "",
      yearFounded: yearFounded,
      noOfEmployees: initialState ? initialState.noOfEmployees : "",
      emailId: initialState ? initialState.emailId : "",
      website: initialState ? initialState.website : "",
      gstNumber: initialState ? initialState.gstNumber : "",
      approvalStatus: "NONE",
      headquarterCountry: Number("0"),
      about: "",
      fullName: initialState ? initialState.fullName : "",
      memberType: initialState ? initialState.memberType : "",
      mobile: initialState ? initialState.mobile : "",
      idProof: initialState ? initialState.idProof : "",
      otherMemberType: initialState ? initialState?.otherMemberType : "",
      memberEmailId: initialState ? initialState.memberEmailId : "",
      otherIdProof: "",
      idProofNumber: initialState ? initialState.idProofNumber : "",
      creatorMemberId: creatorMemberId,
    };
  }
};

export default Organisation;
