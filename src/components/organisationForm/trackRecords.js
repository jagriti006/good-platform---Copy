import React, { useEffect, useState } from "react";
import { Button, Collapse, message, notification } from "antd";
import { Field, FieldArray, Formik, Form, getIn } from "formik";
import * as Yup from 'yup';
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import { first, isEmpty, omit } from "lodash";
import { snakeCase } from "lodash";
import { InputField } from "../form/inputField";
import { toLowercaseAndReplaceSpaces } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getSocialOrgUrl } from "../../api/config";
import { appConfigurations } from "../../utils/constants";
import Organisationapi from "../../api/organizationapi";
import appRoutes from "../../constants/app-routes";
import { useHistory } from "react-router-dom";
import trackrecord from "../../assets/images/illustrators/track-record.png";
import LargeTolltip from "../common/large-tooltip";
import percentage from "calculate-percentages";

const getMemberStructure = (name) => {
  return {
    financialYear: name,
    overallBudget: "",
    donorHistory: [
      {
        donorName: "",
        country: "",
        amountFunded: "",
        percentageContributed: "",
      },
    ],
  };
};

const getDonorStructure = (name) => {
  return {
    donorName: "",
    country: "",
    amountFunded: "",
    percentageContributed: parseInt(""),
  };
};

let nameArrayForValidation = [];
const APItoFormikFormatter = (initialState) => {
  let initialValues = {};
  initialState.budgetHistory.forEach((memberItem) => {
    // name array is for preventing user from adding memeber with same name
    nameArrayForValidation.push(
      toLowercaseAndReplaceSpaces(memberItem.financialYear, "")
    );
    const snakeCaseName = snakeCase(memberItem.financialYear);
    initialValues = {
      ...initialValues,
      [snakeCaseName]: initialState.budgetHistory.filter((item) => {
        const currentSnakeCase = snakeCase(item.financialYear);
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
    const itemArray = values[property];
    itemArray.forEach((item) => responseArray.push(item));
  }
  return responseArray;
};
const TrackRecords = (props) => {
  const history = useHistory();
  const [initialState, setInitialState] = useState({
    budgetHistory: [],
  });
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const organisationId = sessionStorage.getItem("organisationId");

    const fetchTrackRecords = async () => {
      if (organisationId) {
        const response = await Organisationapi().fetchTrackRecords(
          organisationId
        );
        if (response.data) {
          setInitialState(response.data);
          if (response.data.budgetHistory.length > 0) {
            sessionStorage.setItem("trackRecordUpdate", true);
          }
        }
      }
    };

    const fetchOrganization = async () => {
      if (organisationId) {
        const response = await Organisationapi().fetchOrganization(
          organisationId
        );
        if (response.data) {
          setOverviewData(response.data);
          console.log("response new", response.data);
          if (response.data.id !== null) {
            sessionStorage.setItem("organisationId", response.data.id);
          }
        }
      }
    };

    fetchTrackRecords();
    fetchOrganization();
  }, []);

  const backClick = () => {
    const organisationId = sessionStorage.getItem("organisationId");
    if (organisationId)
      history.push(
        `${appRoutes.ORGANISATION}${appRoutes.PURPOSE}/${organisationId}`
      );
  };

  const saveLeadershipData = async (values) => {
    const token = sessionStorage.getItem("access_token");
    const organisationId = sessionStorage.getItem("organisationId");
    const formattedValues = formatFormValuesForAPI(values);
    const trackRecordUpdate = sessionStorage.getItem("trackRecordUpdate");
    try {
      const leaderShipDataResponse = await axios({
        method: trackRecordUpdate === "true" ? "PUT" : "POST",
        url: getSocialOrgUrl("organisation/budget-donor-history"),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          organisationId: organisationId,
          budgetHistory: formattedValues,
        },
      });
      if (leaderShipDataResponse?.data?.success) {
        notification.success({ message: "Track Record Details Saved..!" });
        sessionStorage.setItem("LeadershipDataStore", true);
        history.push(
          `${appRoutes.ORGANISATION}${appRoutes.ORG_BENEFICIARIES}/${organisationId}`
        );
      } else {
        notification.error("Details not added");
      }
    } catch (err) {
      notification.error(appConfigurations.general_error_message);
    }
  };

  const [finantialYear, setFinancialYear] = useState(null);
  const [countries, setCountries] = useState(null);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);


  useEffect(() => {
    const fetchAsyncData = async () => {
      const responseData = await await Organisationapi().fetchCountries();
      if (responseData?.data) {
        const countryList = responseData.data.map((item) => {
          return {
            value: item.id,
            label: item.countryName,
          };
        });
        setCountries(countryList);
      }
    };
    fetchAsyncData();
  }, []);

  const addFinancialYearEligible = () => {
    const foundedDate = new Date(new Date(overviewData && overviewData.yearFounded).toUTCString());
    const currentDate = new Date();
    const foundedYear = foundedDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const yearDifference = currentYear - foundedYear;
    let actualYearDifference = yearDifference;

    if (currentMonth < 7){
      actualYearDifference = actualYearDifference - 1;
    }

    if (nameArrayForValidation.length === actualYearDifference){
      return true;
    }else{
      return false;
    }
  }

  const checkYear = () => {
    if (finantialYear){
      const foundedDate = new Date(new Date(overviewData && overviewData.yearFounded).toUTCString());
      const foundedYear = foundedDate.getFullYear();
      const currentYear = new Date().getFullYear();

      if (finantialYear <= foundedYear || finantialYear > currentYear || nameArrayForValidation.includes(finantialYear)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  const maxLength =  value =>
    value && value.length > 200 ? `Must be 246 characters or less` : undefined


  const disableNextButton = () => {
    const foundedDate = new Date(new Date(overviewData && overviewData.yearFounded).toUTCString());
    const currentDate = new Date();
    const foundedYear = foundedDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const yearDifference = currentYear - foundedYear;

    if (yearDifference > 3){
      if (nameArrayForValidation.length < 3){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  const requiredMsg = "This is a required field.";

  return (
    <>
      {countries ? (
        <div className="leaderShipPage">
            <p className="missionheading">History</p>

           <div className="row">
        <p className="formInfo pl-3">
        Add your organisation’s past program budgets and donors
        </p>
      </div>
          <div className="row">
            <div className="col-md-7 ">
              <Formik
                initialValues={APItoFormikFormatter(initialState)} // replace dummyData with API response when GET is ready
                onSubmit={saveLeadershipData}
                enableReinitialize={true}
                validationSchema={
                  Yup.object().shape({
                    donorHistory: Yup.object().shape({
                      donorName: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!').matches(/^[A-Za-z ]*$/, "Only Alphabits!"),
                    })
                  })
                  // Yup.object().shape({
                  //   0: Yup.array().of(
                  //     Yup.object().shape({
                  //       0: Yup.object().shape({
                  //         donorHistory: Yup.array().of(
                  //           Yup.object().shape({
                  //             donorName: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!').matches(/^[A-Za-z ]*$/, "Only Alphabits!"),
                  //           })
                  //         )
                  //       })
                  //     })
                  //   )
                  // })
                }
              >
                {({ values, setFieldValue, touched, submitForm, errors, setValues }) => {
                  // console.log("touched ==> ",touched)
                  // console.log("errors ==> ",errors)
                  return (
                    <Form className="formStyles trackRecord">
                      <Collapse
                        accordion
                        defaultActiveKey={["0"]}
                        expandIconPosition={"right"}
                        expandIcon={({ isActive }) =>
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
                      >
                        {(() => {
                          const renderArray = [];
                          let i = 0;
                          for (const property in values) {
                            const firstItem = first(values[property]);
                            if (firstItem) {
                              const name = firstItem.financialYear;
                              renderArray.push(
                                <Collapse.Panel header={name} key={i}>
                                  <FieldArray name={property}>
                                    {({ insert, remove, push }) => (
                                      <div className="arrayInner">
                                        {values[property].length > 0 &&
                                          values[property].map(
                                            (record, index) => {
                                              return (
                                                <React.Fragment key={index}>
                                                  <div className="col-sm-12 text-right">
                                                    <MinusOutlined
                                                      onClick={() => {
                                                        if (
                                                          values[property]
                                                            .length > 1
                                                        ) {
                                                          remove(index);
                                                        } else {
                                                          console.log(
                                                            "Before",
                                                            nameArrayForValidation
                                                          );
                                                          nameArrayForValidation =
                                                            nameArrayForValidation.filter(
                                                              (e) =>
                                                                e !== property
                                                            );
                                                          const newValues =
                                                            values;
                                                          const details = omit(
                                                            newValues,
                                                            property
                                                          );
                                                          setValues(details);
                                                          console.log(
                                                            "After",
                                                            nameArrayForValidation
                                                          );
                                                        }
                                                      }}
                                                    />
                                                  </div>
                                                  <React.Fragment key={index}>
                                                    <div className="row pt-3">
                                                      <div className="col-sm-12">
                                                        <Field
                                                          name={`${property}[${index}].overallBudget`}
                                                          placeholder="Overall Budget"
                                                          type="number"
                                                          class="form-control"
                                                          component={Input}
                                                          min="0"
                                                          errorText={touched[property] && touched[property][index].overallBudget ? errors[property] && errors[property][index]?.overallBudget : ""}
                                                        />
                                                      </div>
                                                    </div>
                                                    <FieldArray
                                                      name={`${property}[${index}].donorHistory`}
                                                    >
                                                      {({
                                                        insert,
                                                        remove,
                                                        push,
                                                      }) => (
                                                        <div className="arrayInner">
                                                          {values[property][
                                                            index
                                                          ]["donorHistory"] &&
                                                            values[property][
                                                              index
                                                            ]["donorHistory"]
                                                              .length > 0 &&
                                                            values[property][
                                                              index
                                                            ][
                                                              "donorHistory"
                                                            ].map(
                                                              (
                                                                friend,
                                                                index2
                                                              ) => {
                                                                const donor =
                                                                  values[
                                                                    property
                                                                  ][index][
                                                                    "donorHistory"
                                                                  ][index2];

                                                                return (
                                                                  <>
                                                                    {/* <div class="hro">
                                                                      <hr />
                                                                    </div> */}
                                                                    <div className="row pt-3">
                                                                      <div className="col-sm-12">
                                                                        <Field
                                                                          name={`${property}[${index}]["donorHistory"][${index2}].donorName`}
                                                                          placeholder="Donor Name"
                                                                          type="text"
                                                                          class="form-control"
                                                                          maxLength="246"
                                                                          validate={maxLength }

                                                                          component={
                                                                            Input
                                                                          }
                                                                          errortext={
                                                                            getIn(
                                                                              touched,
                                                                              `${property}[${index}]["donorHistory"][${index2}].donorName`
                                                                            ) &&
                                                                            getIn(errors, `${property}[${index}]["donorHistory"][${index2}].donorName`) &&
                                                                            getIn(errors, `${property}[${index}]["donorHistory"][${index2}].donorName`)
                                                                          }
                                                                        />
                                                                      </div>
                                                                    </div>

                                                                    <div className="row pt-3">
                                                                      <div className="col-sm-12">
                                                                        <Field
                                                                          name={`${property}[${index}]["donorHistory"][${index2}].country`}
                                                                          value={friend.country ? parseInt(friend.country) : ""}
                                                                          placeholder="Country"
                                                                          // class="form-control"
                                                                          component={
                                                                            SelectBox
                                                                          }
                                                                          options={
                                                                            countries
                                                                          }
                                                                          errortext={
                                                                            getIn(
                                                                              touched,
                                                                              `${property}[${index}]["donorHistory"][${index2}].country`
                                                                            ) &&
                                                                            getIn(errors, `${property}[${index}]["donorHistory"][${index2}].country`)
                                                                          }
                                                                        />
                                                                      </div>
                                                                    </div>
                                                                    <div className="row pt-3 pb-3">
                                                                      <div className="col-sm-6">
                                                                        <Field
                                                                          name={`${property}[${index}]["donorHistory"][${index2}].amountFunded`}
                                                                          placeholder="Amount Funded"
                                                                          type="number"
                                                                          component={
                                                                            Input
                                                                          }
                                                                          onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                                                                          min="0"
                                                                          class="form-control"
                                                                          onChange={(e) =>{if(record.overallBudget){setFieldValue(`${property}[${index}]["donorHistory"][${index2}].percentageContributed`,((e.target.value * 100)/record.overallBudget))}else{notification.error({ message: "First fill the overall budget..!" });}}}
                                                                          errortext={
                                                                            getIn(
                                                                              touched,
                                                                              `${property}[${index}]["donorHistory"][${index2}].amountFunded`
                                                                            ) &&
                                                                            getIn(errors, `${property}[${index}]["donorHistory"][${index2}].amountFunded`)
                                                                          }

                                                                        />
                                                                      </div>
                                                                      <div className="col-sm-6">
                                                                        <Field
                                                                          name={`${property}[${index}]["donorHistory"][${index2}].percentageContributed`}
                                                                          placeholder="Percentage Contributed"
                                                                          class="form-control"
                                                                          component={
                                                                            Input
                                                                          }
                                                                          type="number"
                                                                          min="0"
                                                                          onChange={(e) =>{if(record.overallBudget){setFieldValue(`${property}[${index}]["donorHistory"][${index2}].amountFunded`,(parseInt(record.overallBudget * e.target.value)/100))}else{notification.error({ message: "First fill the overall budget..!" });}}}
                                                                        />
                                                                      </div>
                                                                    </div>
                                                                  </>
                                                                );
                                                              }
                                                            )}

                                                          <div className="row">
                                                            <div className="col-md-8"></div>
                                                            <div className="col-md-4 col-sm-12">
                                                              <Button
                                                                className="adddonor"
                                                                onClick={() =>
                                                                  push(
                                                                    getDonorStructure(
                                                                      property
                                                                    )
                                                                  )
                                                                }
                                                                block
                                                              >
                                                                ADD
                                                              </Button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </FieldArray>
                                                  </React.Fragment>
                                                </React.Fragment>
                                              );
                                            }
                                          )}
                                        <br />
                                      </div>
                                    )}
                                  </FieldArray>
                                </Collapse.Panel>
                              );
                            }
                            i++;
                          }
                          return renderArray;
                        })()}
                        {/* {<pre>{JSON.stringify(values, null, 2)}</pre>} */}
                      </Collapse>
                      <div className="pt-3 formStyles">
                        <div class="form-group pt-3 input-group mb-0">
                          <label class="has-float-label">
                            <InputField
                              value={finantialYear}
                              onChange={(e) => {
                                setFinancialYear(e.target.value);
                              }}
                              placeholder="Financial Year"
                              disabled={addFinancialYearEligible()}
                              type={'number'}
                            />
                            <span>Add Financial Year</span>
                          </label>
                        </div>
                        <Button
                          className="formStyles addcontent missstate"
                          onClick={() => {
                            if (
                              !nameArrayForValidation.includes(finantialYear) &&
                              finantialYear
                            ) {
                              setFieldValue(finantialYear, [
                                getMemberStructure(finantialYear),
                              ]);
                              setFinancialYear(null);
                              nameArrayForValidation.push(finantialYear);
                            } else {
                              notification.error(
                                "Member with same name already added. Please try with a different member name."
                              );
                            }
                          }}
                          disabled={addFinancialYearEligible() || checkYear() || !finantialYear}
                        >
                          Add Financial Year
                        </Button>
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
                          <Button
                            onClick={submitForm}
                            className="steps-action formStyles nextbutton"
                            disabled={disableNextButton()}
                            // style={{marginBottom: 0}}
                          >
                            NEXT : TRACK RECORD - BENEFICIARIES
                          </Button>
                          <span style={{
                            marginTop: "1rem",
                            textAlign: "center",
                            color: "red",
                            opacity: "0.7"
                          }}>{disableNextButton() ? "Please add financial year for minimum 3 years" : ""}</span>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>

            <div className="col-sm-5 mt-10 pad-right-20">
                <LargeTolltip
                  title="Tool Tip"
                  description="Some tips about the field will appear here with the links if needed"
                  onclose={() => setIsToolTipVisible(true)}
                  isToolTipVisible={isToolTipVisible}
                />
                <img src={trackrecord} alt="" className="trackrecord-image" />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
};

export default TrackRecords;
