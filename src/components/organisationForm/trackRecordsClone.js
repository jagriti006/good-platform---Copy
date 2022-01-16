import React, {useEffect, useState} from "react";
import {Button, Collapse, message, notification} from "antd";
import {Field, FieldArray, Formik, Form, getIn, useFormik, FormikProvider} from "formik";
import * as Yup from 'yup';
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import {first, isEmpty, omit} from "lodash";
import {snakeCase} from "lodash";
import {InputField} from "../form/inputField";
import {toLowercaseAndReplaceSpaces} from "../../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {getSocialOrgUrl} from "../../api/config";
import {appConfigurations} from "../../utils/constants";
import Organisationapi from "../../api/organizationapi";
import appRoutes from "../../constants/app-routes";
import {useHistory} from "react-router-dom";
import trackrecord from "../../assets/images/illustrators/track-record.png";
import LargeTolltip from "../common/large-tooltip";
import percentage from "calculate-percentages";

const getMemberStructure = (name) => {
  return {
    budgetId: "",
    financialYear: name,
    overallBudget: "",
    donorHistory: [
      {
        donorName: "",
        country: "",
        donorId: "",
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
  const [financialYear, setFinancialYear] = useState(null);
  const [countries, setCountries] = useState(null);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      budgetHistory: [{
        budgetId: "",
        donorHistory: [{
          amountFunded: "",
          country: "",
          donorId: "",
          donorName: "",
          percentageContributed: ""
        }],
        financialYear: "",
        overallBudget: ""
      }]
    },
    validationSchema: Yup.object().shape({
      budgetHistory: Yup.array().of(
        Yup.object().shape({
          donorHistory: Yup.array().of(
            Yup.object().shape({
              amountFunded: Yup.string().required("Please Enter Some Amount"),
              country: Yup.string().required("Please Select Country"),
              donorId: "",
              donorName: Yup.string().required("Please Enter Donor Name").max(246, 'Too Long Allowed 246 Characters.!').matches(/^[A-Za-z ]*$/, "Only Alphabets!"),
              percentageContributed: Yup.string().required("Please Enter Some Percentage")
            })
          ),
          financialYear: Yup.string().required("Please Enter Financial Year"),
          overallBudget: Yup.string().required("Please Enter Some Budget Amount"),
        })
      )
    })
  })

  const {values, setFieldValue, touched, errors, setValues, resetForm} = formik;

  useEffect(() => {
    const organisationId = sessionStorage.getItem("organisationId");

    const fetchTrackRecords = async () => {
      if (organisationId) {
        const response = await Organisationapi().fetchTrackRecords(
          organisationId
        );
        if (response.data) {
          console.log("response ==> ", response.data);
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

  useEffect(() => {
    if (initialState.budgetHistory.length){
      initialState.budgetHistory.forEach((yearData) => {
        // name array is for preventing user from adding year with same name
        nameArrayForValidation.push(
          toLowercaseAndReplaceSpaces(yearData.financialYear, "")
        );
      });

      setValues({
        budgetHistory: initialState.budgetHistory
      })
    }
  },[initialState])

  const backClick = () => {
    const organisationId = sessionStorage.getItem("organisationId");
    if (organisationId)
      history.push(
        `${appRoutes.ORGANISATION}${appRoutes.PURPOSE}/${organisationId}`
      );
  };

  const saveLeadershipData = async () => {
    const token = sessionStorage.getItem("access_token");
    const organisationId = sessionStorage.getItem("organisationId");
    const formattedValues = formatFormValuesForAPI(values);
    const trackRecordUpdate = sessionStorage.getItem("trackRecordUpdate");

    console.log("formattedValues ==> ",formattedValues);

    const newData = formattedValues.map((data) => {
      console.log("data ==> ",data);
      if (data?.budgetId.includes('NEW')){
        delete data.budgetId;
      }

      data.donorHistory.map((dData) => {
        if (dData?.donorId.includes('NEW')){
          delete dData.donorId;
        }
      })

      return data;
    })

    console.log("newData ==> ",newData);

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
          budgetHistory: newData,
        },
      });
      if (leaderShipDataResponse?.data?.success) {
        notification.success({message: "Track Record Details Saved..!"});
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

  const addFinancialYearEligible = () => {
    const foundedDate = new Date(new Date(overviewData && overviewData.yearFounded).toUTCString());
    const currentDate = new Date();
    const foundedYear = foundedDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const yearDifference = currentYear - foundedYear;
    let actualYearDifference = yearDifference;

    if (currentMonth < 7) {
      actualYearDifference = actualYearDifference - 1;
    }

    if (nameArrayForValidation.length === actualYearDifference) {
      return true;
    } else {
      return false;
    }
  }

  const checkYear = () => {
    if (financialYear) {
      const foundedDate = new Date(new Date(overviewData && overviewData.yearFounded).toUTCString());
      const foundedYear = foundedDate.getFullYear();
      const currentYear = new Date().getFullYear();

      if (financialYear <= foundedYear || financialYear > currentYear || nameArrayForValidation.includes(financialYear)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const maxLength = value =>
    value && value.length > 200 ? `Must be 246 characters or less` : undefined

  const disableNextButton = () => {
    const foundedDate = new Date(new Date(overviewData && overviewData.yearFounded).toUTCString());
    const currentDate = new Date();
    const foundedYear = foundedDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const yearDifference = currentYear - foundedYear;

    if (yearDifference > 3) {
      if (nameArrayForValidation.length < 3) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const addFinancialYear = () => {
    if (financialYear && !values.budgetHistory.filter(data => data.financialYear === financialYear).length) {
      const newData = values;
      newData.budgetHistory.push({
        budgetId: `NEW_${Math.floor(Math.random() * 2000)}`,
        donorHistory: [{
          amountFunded: "",
          country: "",
          donorId: `NEW_${Math.floor(Math.random() * 2100)}`,
          donorName: "",
          percentageContributed: ""
        }],
        financialYear: financialYear,
        overallBudget: ""
      })

      setValues(newData)
      nameArrayForValidation.push(
        toLowercaseAndReplaceSpaces(financialYear, "")
      );
      setFinancialYear(null);
    } else {
      notification.error("Year already exist.Please try with a different year.");
    }
  }

  const addDonorForm = (year) => {
    const newData = values;
    const findYearData = newData.budgetHistory.map(data => {
      if (data.financialYear === year){
        data.donorHistory.push({
          amountFunded: "",
          country: "",
          donorId: `NEW_${Math.floor(Math.random() * 2000)}`,
          donorName: "",
          percentageContributed: ""
        });
      }
      return data;
    });

    setValues({
      budgetHistory: findYearData
    })
  }

  const removeDonorForm = (year,donorId) => {
    const newData = values.budgetHistory.map(data => {
      if (data.financialYear === year){
        return {
          ...data,
          donorHistory: data.donorHistory.filter(donorData => donorData.donorId !== donorId),
        }
      }else{
        return data;
      }
    })

    setValues({
      budgetHistory: newData
    })
  }

  return (
    <>
      {countries ? (
        <div className="leaderShipPage">
          <div className="row">
            <p className="formInfo pl-3">
              Add your organisation’s past program budgets and donors
            </p>
          </div>
          <div className="row">
            <div className="col-md-7 ">
              <FormikProvider
                value={formik}
              >
                {values.budgetHistory.map((budgetData, index) => {
                  return budgetData.financialYear ? (
                    <Form className="formStyles trackRecord" key={`form_${index}`}>
                      <Collapse
                        accordion
                        defaultActiveKey={["0"]}
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
                      >
                        <Collapse.Panel header={budgetData.financialYear} key={`collapsePanel_${index}`}>
                          <div className="arrayInner">
                            <div className="row pt-3">
                              <div className="col-sm-12">
                                <Field
                                  name={`budgetHistory[${index}].overallBudget`}
                                  placeholder="Overall Budget"
                                  type="number"
                                  class="form-control"
                                  component={Input}
                                  min="0"
                                  errortext={
                                    getIn(
                                      touched,
                                      `budgetHistory[${index}].overallBudget`
                                    ) &&
                                    getIn(errors, `budgetHistory[${index}].overallBudget`) &&
                                    getIn(errors, `budgetHistory[${index}].overallBudget`)
                                  }
                                />
                              </div>
                            </div>
                            {budgetData.donorHistory.map((donorData, index1) => {
                              return (
                                <div className="arrayInner">
                                  <div className="col-sm-12 text-right">
                                    <MinusOutlined
                                      onClick={() => {
                                        removeDonorForm(budgetData.financialYear,donorData.donorId)
                                      }}
                                    />
                                  </div>
                                  <div className="row pt-3">
                                    <div className="col-sm-12">
                                      <Field
                                        name={`budgetHistory[${index}].donorHistory[${index1}].donorName`}
                                        placeholder="Donor Name"
                                        type="text"
                                        class="form-control"
                                        maxLength="246"
                                        validate={maxLength}
                                        component={Input}
                                        errortext={
                                          getIn(
                                            touched,
                                            `budgetHistory[${index}].donorHistory[${index1}].donorName`
                                          ) &&
                                          getIn(errors, `budgetHistory[${index}].donorHistory[${index1}].donorName`) &&
                                          getIn(errors, `budgetHistory[${index}].donorHistory[${index1}].donorName`)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row pt-3">
                                    <div className="col-sm-12">
                                      <Field
                                        name={`budgetHistory[${index}].donorHistory[${index1}].country`}
                                        value={donorData.country ? parseInt(donorData.country) : ""}
                                        placeholder="Country"
                                        // class="form-control"
                                        component={SelectBox}
                                        options={countries}
                                        errortext={
                                          getIn(
                                            touched,
                                            `budgetHistory[${index}].donorHistory[${index1}].country`
                                          ) &&
                                          getIn(errors, `budgetHistory[${index}].donorHistory[${index1}].country`) &&
                                          getIn(errors, `budgetHistory[${index}].donorHistory[${index1}].country`)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row pt-3 pb-3">
                                    <div className="col-sm-6">
                                      <Field
                                        name={`budgetHistory[${index}].donorHistory[${index1}].amountFunded`}
                                        placeholder="Amount Funded"
                                        type="number"
                                        component={Input}
                                        min="0"
                                        class="form-control"
                                        onChange={(e) => {
                                          if (budgetData.overallBudget) {
                                            setFieldValue(`budgetHistory[${index}].donorHistory[${index1}].percentageContributed`, ((e.target.value * 100) / budgetData.overallBudget))
                                          } else {
                                            notification.error({message: "First fill the overall budget..!"});
                                          }
                                        }}
                                        errortext={
                                          getIn(
                                            touched,
                                            `budgetHistory[${index}].donorHistory[${index1}].amountFunded`
                                          ) &&
                                          getIn(errors, `budgetHistory[${index}].donorHistory[${index1}].amountFunded`) &&
                                          getIn(errors, `budgetHistory[${index}].donorHistory[${index1}].amountFunded`)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6">
                                      <Field
                                        name={`budgetHistory[${index}].donorHistory[${index1}].percentageContributed`}
                                        placeholder="Percentage Contributed"
                                        class="form-control"
                                        component={Input}
                                        type="number"
                                        min="0"
                                        onChange={(e) => {
                                          if (budgetData.overallBudget) {
                                            setFieldValue(`budgetHistory[${index}].donorHistory[${index1}].amountFunded`, (parseInt(budgetData.overallBudget * e.target.value) / 100))
                                          } else {
                                            notification.error({message: "First fill the overall budget..!"});
                                          }
                                        }}
                                        errortext={
                                          getIn(
                                            touched,
                                            `budgetHistory[${index}].donorHistory[${index1}].percentageContributed`
                                          ) &&
                                          getIn(errors, `budgetHistory[${index}].donorHistory[${index1}].percentageContributed`) &&
                                          getIn(errors, `budgetHistory[${index}].donorHistory[${index1}].percentageContributed`)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                            <div className="row">
                              <div className="col-md-8"></div>
                              <div className="col-md-4 col-sm-12">
                                <Button
                                  className="adddonor"
                                  onClick={() => {
                                    addDonorForm(budgetData.financialYear)
                                  }}
                                  block
                                >
                                  ADD
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Collapse.Panel>
                      </Collapse>
                    </Form>
                  ) : null
                })}
                <div className="col-sm-12 pt-3 formStyles">
                  <div className="form-group pt-3 input-group mb-0">
                    <label className="has-float-label">
                      <InputField
                        value={financialYear}
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
                    onClick={() => addFinancialYear()}
                    disabled={addFinancialYearEligible() || checkYear() || !financialYear}
                  >
                    Add Financial Year
                  </Button>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="steps-actions floatRight displayFlex previous">
                      <Button
                        className="ant-btn-back"
                        // style={{ margin: "0 8px" }}
                        onClick={() => backClick()}
                      >
                        <FontAwesomeIcon icon={faAngleLeft}/>
                        &nbsp; Previous Step
                      </Button>
                    </div>
                  </div>
                  <div className="col-md-8 floatRight displayFlex" style={{flexDirection: "column"}}>
                    <Button
                      onClick={() => saveLeadershipData()}
                      className="steps-action formStyles nextbutton"
                      disabled={disableNextButton()}
                      style={{marginBottom: 0}}
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
              </FormikProvider>
            </div>
            <div className="col-sm-5 mt-10 pad-right-20">
              <LargeTolltip
                title="Tool Tip"
                description="Some tips about the field will appear here with the links if needed"
                onclose={() => setIsToolTipVisible(true)}
                isToolTipVisible={isToolTipVisible}
              />
              <img src={trackrecord} alt="" className="trackrecord-image"/>
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
