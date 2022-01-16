import { Button, Col, Row, Checkbox, Slider, Radio, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Collapse, message, Typography } from "antd";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import * as Yup from "yup";
import DatePicker from "../FormikComponents/Date/Date";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { appConfigurations } from "../../utils/constants";
import { BASE_URL } from "../../api/config";
import axios from "axios";
import Icon from "../common/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Organisationapi from "../../api/organizationapi";
import appRoutes from "../../constants/app-routes";
import beneficiary from "../../assets/images/illustrators/beneficiary.png";
import people from "../../assets/images/people.png";
import infrastructure from "../../assets/images/infrastructure.png";
import { formErrorTextStyle } from "../../utils/utils";
import moment from "moment";


const { Text, Link } = Typography;
const { Panel } = Collapse;
const rangeSelector = {
  0: "0",
  20: "20",
  40: "40",
  60: "60",
  80: "80",
  100: "100",
};

const Year = [
  { value: "", label: "" },
  { value: "FY 2021-20", label: "FY 2020-2021" },
  { value: "FY 2019-20", label: "FY 2019-2020" },
  { value: "FY 2018-19", label: "FY 2018-2019" },
];

const finantialYears = () => {
  const years = [];
  const dateStart = moment();
  const dateEnd = moment().subtract(20, "y");
  while (dateEnd.diff(dateStart, "years") <= 0) {
    years.push({
      label: `FY ${dateStart.format("YYYY")}-${dateStart.subtract(1, "year").format("YYYY")}`,
      value: `FY ${dateStart.format("YYYY")}-${dateStart.subtract(1, "year").format("YYYY")}`,
    });
    dateStart.subtract(1, "year");
  }
  return years;
};

const agelimit = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
  { value: "32", label: "32" },
  { value: "33", label: "33" },
  { value: "34", label: "34" },
  { value: "35", label: "35" },
  { value: "36", label: "36" },
  { value: "37", label: "37" },
  { value: "38", label: "38" },
  { value: "39", label: "39" },
  { value: "40", label: "40" },
  { value: "41", label: "41" },
  { value: "42", label: "42" },
  { value: "43", label: "43" },
  { value: "44", label: "44" },
  { value: "45", label: "45" },
  { value: "46", label: "46" },
  { value: "47", label: "47" },
  { value: "48", label: "48" },
  { value: "49", label: "49" },
  { value: "50", label: "50" },
  { value: "51", label: "51" },
  { value: "52", label: "52" },
  { value: "53", label: "53" },
  { value: "54", label: "54" },
  { value: "55", label: "55" },
  { value: "56", label: "56" },
  { value: "57", label: "57" },
  { value: "58", label: "58" },
  { value: "59", label: "59" },
  { value: "60", label: "60" },
  { value: "61", label: "61" },
  { value: "62", label: "62" },
  { value: "63", label: "63" },
  { value: "64", label: "64" },
  { value: "65", label: "65" },
  { value: "66", label: "66" },
  { value: "67", label: "67" },
  { value: "68", label: "68" },
  { value: "69", label: "69" },
  { value: "70", label: "70" },
  { value: "71", label: "71" },
  { value: "72", label: "72" },
  { value: "73", label: "73" },
  { value: "74", label: "74" },
  { value: "75", label: "75" },
  { value: "76", label: "76" },
  { value: "77", label: "77" },
  { value: "78", label: "78" },
  { value: "79", label: "79" },
  { value: "80", label: "80" },
  { value: "81", label: "81" },
  { value: "82", label: "82" },
  { value: "83", label: "83" },
  { value: "84", label: "84" },
  { value: "85", label: "85" },
  { value: "86", label: "86" },
  { value: "87", label: "87" },
  { value: "88", label: "88" },
  { value: "89", label: "89" },
  { value: "90", label: "90" },
  { value: "91", label: "91" },
  { value: "92", label: "92" },
  { value: "93", label: "93" },
  { value: "94", label: "94" },
  { value: "95", label: "95" },
  { value: "96", label: "96" },
  { value: "97", label: "97" },
  { value: "98", label: "98" },
  { value: "99", label: "99" },
  { value: "100", label: "100" },
];

const plainOptions = ["Apple", "Pear", "Orange"];

const Beneficiaries = (props) => {
  const { idProofDetails } = useSelector((state) => state.persisted);
  const history = useHistory();
  const organisationId = sessionStorage.getItem("organisationId");
  const [locationTypes, setLocationTypes] = useState([]);
  const [beneficiaryLocationsArr, setBeneficiaryLocationsArr] = useState([]);
  const [initialState, setInitialState] = useState("");
  const [error, setError] = useState({});
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const refreshToken = sessionStorage.getItem("refresh_token");

    const fetchBenificiary = async () => {
      if (organisationId) {
        const response = await Organisationapi().fetchBenificiary(organisationId);
        if (response.data) {
          setInitialState(response.data);
          if (response.data.id !== null) {
            sessionStorage.setItem("beneficiaryUpdate", true);
            sessionStorage.setItem("beneficiaryUpdateID", response.data.id);
            if (response.data.beneficiaryLocations.length > 0) {
              let arr = [];
              response.data.beneficiaryLocations.map(function (loc) {
                arr.push(loc.location);
              });
              setBeneficiaryLocationsArr(arr);
              setLocationTypes(arr);
              sessionStorage.setItem("benlocationUpdate", true);
            }
          }
        }
      }
    };
    fetchBenificiary();
  }, []);

  const backClick = () => {
    if (organisationId) history.push(`${appRoutes.ORGANISATION}${appRoutes.TRACK_RECORDS}/${organisationId}`);
  };

  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
  }
  const saveBeneficiary = async (values) => {
    const data = { ...values };
    console.log("dskjbdjsandl", data);
    if (data.beneficiaryLocations) {
      data.beneficiaryLocations.forEach((element) => {
        element.beneficiaryGmapLocations = [
          {
            latitude: 10.22,
            longitude: 10.85,
          },
        ];
      });
    }

  const response = await Organisationapi().addorBenificiary(data);
    if (response.success) {
      notification.success({ message: "Beneficiaries Details Saved..!" });
      history.push(`${appRoutes.ORGANISATION}${appRoutes.DOCUMENTS}/${organisationId}`);
    }
  };

  const onAgeChangeHandler = (targetValue, currentValue, field) => {
    error.minAge = "";
    error.maxAge = "";
    if (field == "minAge") {
      if (currentValue && targetValue.maxAge && parseInt(currentValue) >= parseInt(targetValue.maxAge)) {
        error.minAge = "Invalid Lower Limit";
      }
    }
    if (field == "maxAge") {
      if (currentValue && targetValue.minAge && parseInt(currentValue) <= parseInt(targetValue.minAge)) {
        error.maxAge = "Invalid Upper Limit";
      }
    }
    setError(error);
  };

  const requiredMsg = "This is a required field.";
  const validateLocationTitle = (value) => {
    console.log("value is",value.length);
    let error;
    if (!value) {
      error = 'This is required field';
    }
    if(value.length > 248){
      error = 'Too Long Allowed 248 Charctors.!';
    }
    return error;
  }
  return (
    <div className="Purposepage pb-4">
      <p className="benifiheading">Beneficiary</p>
      <div className="row">
        <p className="formInfo pl-3">Who or what were some of your past program beneficiaries?</p>
      </div>
      <div className="row">
        <div className="col-md-8">
          <Formik
            initialValues={getInitialValues(organisationId, initialState, idProofDetails)}
            enableReinitialize={true}
            onSubmit={(values) => saveBeneficiary(values)}
            validationSchema={Yup.object().shape({
              // beneficiaryLocations: Yup.array().of(
              //   Yup.object().shape({
              //     locationTitle: Yup.string().required().max(246, "Too Long Allowed 246 Charctors.!").nullable(),
              //   })
              // ),
            })}
          >
            {({ values, touched, submitForm, errors, setFieldValue }) => {
              return (
                <Form className="formStyles">
                  <Collapse defaultActiveKey={["1"]} className="formStyles">
                    <div className="pad-top-4 formStyles">
                      <Radio.Group
                        name="beneficiaryType"
                        value={values.beneficiaryType}
                        onChange={(e) => setFieldValue("beneficiaryType", e.target.value)}
                        buttonStyle="solid"
                      >
                        <div className="row formStyles">
                          <div className="col-md-6 mb-3">
                            <Radio.Button value="People" className="purpose">
                              <img src={people} alt="" className="radioimage" />
                              People
                            </Radio.Button>
                          </div>
                          <div className="col-md-6 mb-3">
                            <Radio.Button value="Infrastructure" className="purpose">
                              <img src={infrastructure} alt="" className="radioimage" />
                              Infrastructure
                            </Radio.Button>
                          </div>
                        </div>
                      </Radio.Group>
                    </div>
                    <br />
                    <div className="pad-top-4 formStyles" key={"1"}>
                      <Row gutter={[16, 8]}>
                        <Col xs={24}>
                          <Text>Select Target Categories</Text>
                        </Col>
                        <Col xs={20}>
                          <Checkbox.Group
                            className="targetselect"
                            name="targetCategory"
                            value={values.targetCategory}
                            onChange={(checkedValues, e) => setFieldValue("targetCategory", checkedValues)}
                          >
                            <Checkbox value={"Children"}>
                              <Icon name="/program-creation/child" className="ant-radio-icon" />
                              Children
                            </Checkbox>
                            <Checkbox value={"Youth"}>
                              <Icon name="/program-creation/team-static" className="ant-radio-icon" />
                              Youth
                            </Checkbox>
                            <Checkbox value={"Women"}>
                              <Icon name="/program-creation/female empowerment" className="ant-radio-icon" />
                              Women
                            </Checkbox>
                            <Checkbox value={"Transgender"}>
                              <Icon name="/program-creation/transgender" className="ant-radio-icon" />
                              Transgender
                            </Checkbox>
                            <Checkbox value={"Elderly"}>
                              <Icon name="/program-creation/elderly" className="ant-radio-icon" />
                              Elderly
                            </Checkbox>
                            <Checkbox value={"Veterans"}>
                              <Icon name="/program-creation/veteran" className="ant-radio-icon" />
                              Veterans
                            </Checkbox>
                            <Checkbox value={"Specially Abled"}>
                              <Icon name="/program-creation/specially-abled" className="ant-radio-icon" />
                              Specially Abled
                            </Checkbox>
                          </Checkbox.Group>
                        </Col>
                      </Row>
                    </div>

                    <br />
                    <label className="formSubInfo">Age Range</label>

                    <div className="row pb-4 pt-3">
                      <div className="col-md-5 col-sm-5 formStyles">
                        <Field
                          name="minAge"
                          placeholder="Lower Limit"
                          component={SelectBox}
                          options={agelimit}
                          errorText={touched.minAge ? errors.minAge : ""}
                          onChange={(value) => onAgeChangeHandler(values, value, "minAge")}
                        />
                      </div>
                      <div className="col-md-5 col-sm-5 formStyles">
                        <Field
                          name="maxAge"
                          placeholder="Upper Limit"
                          component={SelectBox}
                          options={agelimit}
                          errorText={error.maxAge}
                          onChange={(value) => onAgeChangeHandler(values, value, "maxAge")}
                        />
                      </div>
                      <div className="col-md-2 col-sm-2 formStyles pt-3">
                        <h6 className="formSubInfo2">
                          <b>0-100 Years</b>
                        </h6>
                      </div>
                    </div>
                    <div className="pad-top-4 formStyles">
                      <label className="formSubInfo">Total Beneficiaries Impacted</label>
                    </div>
                    <div>
                      <>
                        <div>
                          <div className="row formStyles pt-3">
                            <div className="col-sm-8 formStyles">
                              <Field
                                name={`beneficiaryImpactedHistory.0.totalBeneficiaryImpacted`}
                                component={Input}
                                class="form-control"
                                placeholder="Total Beneficiaries Impacted"
                                type="number"
                                min="0"
                                errorText={touched.beneficiaryImpactedHistory?.length && touched.beneficiaryImpactedHistory[0]?.totalBeneficiaryImpacted  ? errors.beneficiaryImpactedHistory?.length && errors.beneficiaryImpactedHistory[0]?.totalBeneficiaryImpacted : ""}
                              />
                            </div>
                            <div className="col-sm-4 formStyles">
                              <Field
                                name={`beneficiaryImpactedHistory.0.financialYear`}
                                placeholder="Select"
                                component={SelectBox}
                                options={finantialYears()}
                              />
                            </div>
                          </div>
                          <div className="row pt-3">
                            <div className="col-sm-8">
                              <Field
                                name={`beneficiaryImpactedHistory.1.totalBeneficiaryImpacted`}
                                component={Input}
                                class="form-control"
                                placeholder="Total Beneficiaries Impacted"
                                type="number"
                                min="0"
                                errorText={touched.beneficiaryImpactedHistory?.length && touched.beneficiaryImpactedHistory[1]?.totalBeneficiaryImpacted  ? errors.beneficiaryImpactedHistory?.length && errors.beneficiaryImpactedHistory[1]?.totalBeneficiaryImpacted : ""}

                              />
                            </div>
                            <div className="col-sm-4 formStyles">
                              <Field
                                name={`beneficiaryImpactedHistory.1.financialYear`}
                                placeholder="Select"
                                component={SelectBox}
                                options={finantialYears()}
                              />
                            </div>
                          </div>
                          <div className="row pt-3">
                            <div className="col-sm-8">
                              <Field
                                name={`beneficiaryImpactedHistory.2.totalBeneficiaryImpacted`}
                                component={Input}
                                class="form-control"
                                placeholder="Total Beneficiaries Impacted"
                                type="number"
                                min="0"
                                errorText={touched.beneficiaryImpactedHistory?.length && touched.beneficiaryImpactedHistory[2]?.totalBeneficiaryImpacted  ? errors.beneficiaryImpactedHistory?.length && errors.beneficiaryImpactedHistory[2]?.totalBeneficiaryImpacted : ""}

                              />
                            </div>
                            <div className="col-sm-4 formStyles">
                              <Field
                                name={`beneficiaryImpactedHistory.2.financialYear`}
                                placeholder="Select"
                                component={SelectBox}
                                options={finantialYears()}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    </div>
                    <div className="pad-top-4 pb-3 formStyles">
                      <label className="formSubInfo">Location</label>
                    </div>
                    <FieldArray
                      name="beneficiaryLocations"
                      render={(arrayHelpers) => (
                        <div className="row">
                          <div className="col-md-9">
                            <Checkbox.Group
                              className="targetselect"
                              value={beneficiaryLocationsArr}
                              onChange={(checkedValues, e) => {
                                setBeneficiaryLocationsArr(checkedValues);
                                setLocationTypes(checkedValues);
                                if (checkedValues.length > 0)
                                  setFieldValue(
                                    `beneficiaryLocations[${checkedValues.length - 1}].location`,
                                    checkedValues[checkedValues.length - 1]
                                  );
                              }}
                            >
                              <Checkbox value={"Rural"}>Rural</Checkbox>
                              <Checkbox value={"Peri-Urban"}>Peri-Urban</Checkbox>
                              <Checkbox value={"Urban"}>Urban</Checkbox>
                            </Checkbox.Group>
                          </div>
                          <div className="col-md-3 pin-via-google">
                            <Link
                              href="https://developers.google.com/maps/documentation/api-picker"
                              className="pin-via-link"
                            >
                              <u className="labelText">Pin via Google maps</u>
                            </Link>
                          </div>
                        </div>
                      )}
                    />
                    {locationTypes.map((type, index) => {
                      return (
                        <div className="col-sm-12 pt-4">
                          <Field
                            name={`beneficiaryLocations[${index}].locationTitle`}
                            placeholder="Enter Location"
                            class="form-control"
                            component={Input}
                            validate={validateLocationTitle}
                            errortext={
                              getIn(touched, `beneficiaryLocations.${index}.locationTitle`) &&
                              getIn(errors, `beneficiaryLocations.${index}.locationTitle`) &&
                              getIn(errors, `beneficiaryLocations.${index}.locationTitle`)
                            }
                          />
                        </div>
                      );
                    })}
                  </Collapse>
                  <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <div className="previous">
                      <Button
                        className="ant-btn-back"
                        // style={{ margin: "0 8px" }}
                        onClick={() => backClick()}
                      >
                        <FontAwesomeIcon icon={faAngleLeft}/>
                        &nbsp; Previous Step
                      </Button>
                    </div>
                    <div>
                      <Button onClick={submitForm} className="steps-action formStyles nextbutton">
                        NEXT: DOCUMENTS
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="col-md-3">
          <img src={beneficiary} alt="" className="leadership-image" />
        </div>
      </div>
    </div>
  );
};

const getInitialValues = (organisationId, initialState, idProofDetails) => {
  if (!isEmpty(initialState)) {
    return {
      organisationId: organisationId ? organisationId : "",
      beneficiaryType: initialState ? initialState.beneficiaryType : "",
      locationTitle: initialState ? initialState.locationTitle : "",
      minAge: initialState ? initialState.minAge : "",
      maxAge: initialState ? initialState.maxAge : "",
      // location: initialState ? initialState.location : "",
      latitude: 1000,
      longitude: 1500,
      beneficiaryImpactedHistory: initialState
        ? initialState.beneficiaryImpactedHistory
        : [
            {
              id: "",
              totalBeneficiaryImpacted: parseInt(),
              financialYear: "",
            },
          ],
      targetCategory: initialState
        ? initialState.targetCategory
        : [
            {
              id: "",
              category: "",
            },
          ],
      beneficiaryLocations: initialState
        ? initialState.beneficiaryLocations
        : [
            {
              id: "",
              location: "",
              locationTitle: "",
              beneficiaryGmapLocations: initialState
                ? initialState.beneficiaryGmapLocations
                : [
                    {
                      id: "",
                      latitude: 1000,
                      longitude: 1500,
                    },
                  ],
            },
          ],
    };
  } else {
    return {
      organisationId: organisationId ? organisationId : "",
      beneficiaryType: initialState ? initialState.beneficiaryType : "",
      locationTitle: initialState ? initialState.locationTitle : "",
      minAge: initialState ? initialState.minAge : "",
      maxAge: initialState ? initialState.maxAge : "",
      location: initialState ? initialState.location : "",
      latitude: 1000,
      longitude: 1500,
      beneficiaryImpactedHistory: initialState
        ? initialState.beneficiaryImpactedHistory
        : [
            {
              id: "",
              totalBeneficiaryImpacted: "",
              financialYear: "",
            },
          ],
      targetCategory: initialState
        ? initialState.targetCategory
        : [
            {
              id: "",
              category: "",
            },
          ],
      beneficiaryLocations: initialState
        ? initialState.beneficiaryLocations
        : [
            {
              id: "",
              location: "",
              locationTitle: "",
              beneficiaryGmapLocations: initialState
                ? initialState.beneficiaryGmapLocations
                : [
                    {
                      id: "",
                      latitude: 1000,
                      longitude: 1500,
                    },
                  ],
            },
          ],
    };
  }
};

export default Beneficiaries;
