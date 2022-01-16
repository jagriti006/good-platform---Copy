import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, message, notification, Row } from "antd";
import { Field, FieldArray, Formik, Form, getIn } from "formik";
import { MinusOutlined } from "@ant-design/icons";
import Input from "../FormikComponents/Input/Input";
import { first, omit } from "lodash";
import { snakeCase } from "lodash";
import { InputField } from "../form/inputField";
import { toLowercaseAndReplaceSpaces } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getSocialOrgUrl } from "../../api/config";
import { appConfigurations } from "../../utils/constants";
import Organisationapi from "../../api/organizationapi";
import { formErrorTextStyle } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import orgapproval from "../../assets/images/orgapproval.png";
import { useParams } from "react-router-dom";
import appRoutes from "../../constants/app-routes";

const getMemberStructure = (name) => {
  return {
    name: "",
    type: name,
    otherType: "",
    email: "",
    phone: "",
    idProof: false,
    otherIdProof: "",
    idProofNumber: "",
    authorisedSignatory: true,
  };
};

const nameArrayForValidation = [];
const APItoFormikFormatter = (initialState) => {
  let initialValues = {};
  initialState.organisationMembersList.forEach((memberItem) => {
    // name array is for preventing user from adding memeber with same name
    nameArrayForValidation.push(toLowercaseAndReplaceSpaces(memberItem.type, ""));
    const snakeCaseName = snakeCase(memberItem.type);
    initialValues = {
      ...initialValues,
      [snakeCaseName]: initialState.organisationMembersList.filter((item) => {
        const currentSnakeCase = snakeCase(item.type);
        return snakeCaseName === currentSnakeCase;
      }),
    };
  });
  return initialValues;
};

/* 
Formatting the values from form to API expected format
*/
const formatFormValuesForAPI = (values) => {
  const responseArray = [];
  for (const property in values) {
    console.log(`${property}: ${values[property]}`);
    const itemArray = values[property];
    itemArray.forEach((item) => responseArray.push(item));
  }
  return responseArray;
};

const OrganizationalApproval = (props) => {
  const [initialState, setInitialState] = useState({
    organisationMembersList: [],
  });
  const history = useHistory();
  const { programId } = useParams();

  useEffect(() => {
    const fetchLeadership = async () => {
      const organisationId = sessionStorage.getItem("organisationId");
      if (organisationId) {
        const response = await Organisationapi().fetchLeadership(organisationId);
        if (response.data) {
          setInitialState(response.data);
          sessionStorage.setItem("leadershipUpdate", true);
        }
      }
    };
    fetchLeadership();
  }, []);

  const submitForm = async (values) => {
    const token = sessionStorage.getItem("access_token");
    const organisationId = sessionStorage.getItem("organisationId");
    const formattedValues = formatFormValuesForAPI(values);
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
          organisationMembersList: formattedValues,
        },
      });
      if (leaderShipDataResponse?.data?.success) {
        notification.success({ message: "Organisational Approval Details Saved..!" });
        history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PROGRAM_PREVIEW}/${programId}`);
      } else {
        notification.error("Details not added");
      }
    } catch (err) {
      notification.error(appConfigurations.general_error_message);
    }
  };
  const [memberName, setMemberName] = useState(null);

  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[a-zA-Z0-9@^._\s]+$/i.test(value)) {
      error = "Allow only alphabets, digits, @, _, . and ^.";
    }
    return error;
  };
  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid EmailId";
    }
    return error;
  };

  return (
    <Row justify="center">
      <Col xs={24} lg={20}>
        <div className="leaderShipPage">
          <div className="row">
            <div className="col-md-7 ">
              <Formik
                initialValues={APItoFormikFormatter(initialState)} // replace dummyData with API response when GET is ready
                onSubmit={submitForm}
                enableReinitialize={true}
              >
                {({ values, touched, errors, setFieldValue, submitForm, setValues, isValid, submitCount }) => {
                  return (
                    <Form className="formStyles leadershipform projectcreationstyle">
                      <p className="subdescrip">
                        Share this proposal with these members after completion. Once they approve, you will able to
                        send it across for validation
                      </p>
                      {!isValid && submitCount > 0 && (
                        <span style={formErrorTextStyle()}>Form has validation errors..!</span>
                      )}
                      <Collapse
                        className="formStyles"
                        accordion
                        defaultActiveKey={["1"]}
                        expandIconPosition={"right"}
                        expandIcon={({ isActive }) =>
                          isActive ? (
                            <FontAwesomeIcon icon={faMinus} className="formStyles accordianIcon" />
                          ) : (
                            <FontAwesomeIcon icon={faPlus} className="formStyles accordianIcon" />
                          )
                        }
                      >
                        {(() => {
                          const renderArray = [];
                          let i = 0;
                          for (const property in values) {
                            const firstItem = first(values[property]);
                            const name = firstItem?.type;
                            renderArray.push(
                              <Collapse.Panel header={name} key={i}>
                                <FieldArray name={property}>
                                  {({ insert, remove, push }) => (
                                    <div className="arrayInner">
                                      {values[property].length > 0 &&
                                        values[property].map((friend, index) => {
                                          return (
                                            <React.Fragment key={index}>
                                              <div className="col-sm-12 text-right">
                                                <MinusOutlined
                                                  onClick={() => {
                                                    if (values[property].length > 1) {
                                                      remove(index);
                                                    } else {
                                                      const newValues = values;
                                                      const details = omit(newValues, property);
                                                      setValues(details);
                                                    }
                                                  }}
                                                />
                                              </div>

                                              <div className="row pt-3">
                                                <div className="col-sm-12 formStyles">
                                                  <Field
                                                    name={`${property}.${index}.name`}
                                                    placeholder="e.g John Doe"
                                                    type="text"
                                                    class="form-control"
                                                    component={Input}
                                                    placeholder="Full Name"
                                                    validate={validateName}
                                                    errortext={
                                                      getIn(touched, `${property}[${index}].name`) &&
                                                      getIn(errors, `${property}[${index}].name`)
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className="row pt-3">
                                                <div className="col-sm-12 formStyles">
                                                  <Field
                                                    name={`${property}.${index}.email`}
                                                    placeholder="e.g xyz@xyz.com"
                                                    type="email"
                                                    class="form-control"
                                                    component={Input}
                                                    placeholder="Email ID"
                                                    validate={validateEmail}
                                                    errortext={
                                                      getIn(touched, `${property}[${index}].email`) &&
                                                      getIn(errors, `${property}[${index}].email`)
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </React.Fragment>
                                          );
                                        })}
                                      <br />
                                    </div>
                                  )}
                                </FieldArray>
                              </Collapse.Panel>
                            );
                            i++;
                          }
                          return renderArray;
                        })()}
                      </Collapse>

                      <div className="row pt-3">
                        <div className="col-sm-12 formStyles">
                          <div class="form-group input-group mb-0">
                            <label class="has-float-label">
                              <InputField
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                                placeholder="Add Team Member"
                                class="form-control"
                                placeholder="Team Members"
                              />
                              <span>Add Team Members</span>
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12 formStyles">
                          <Button
                            onClick={() => {
                              if (!nameArrayForValidation.includes(memberName) && memberName) {
                                setFieldValue(memberName, [getMemberStructure(memberName)]);
                                setMemberName(null);
                                nameArrayForValidation.push(memberName);
                              } else {
                                message.error(
                                  "Member with same name already added. Please try with a different member name."
                                );
                              }
                            }}
                            disabled={!memberName}
                            className="addmember"
                          >
                            + Add more members
                          </Button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-7"></div>
                        <div className="col-md-5">
                          <div className="steps-action floatRight  formStyles">
                            <Button type="primary" htmlType="submit">
                              <b>PREVIEW & SUBMIT</b>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <div className="col-md-3">
              <img src={orgapproval} alt="" className="leadership-image" />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default OrganizationalApproval;
