import { Button, Col, Row, Radio, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../../api/beneficiaryAPI";
import { Collapse, message } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import Input from "../../FormikComponents/Input/Input";
import SelectBox from "../../FormikComponents/SelectBox/SelectBox";
import DatePicker from "../../FormikComponents/Date/Date";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { appConfigurations } from "../../../utils/constants";
import { BASE_URL } from "../../../api/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Organisationapi from "../../../api/organizationapi";
import appRoutes from "../../../constants/app-routes";
import locations from "../../../assets/images/illustrators/locationship.png";
import { PieChart } from "react-minimal-pie-chart";
import Dark from "../../../assets/images/Ellipsedark.png";
import Light from "../../../assets/images/Ellipselight.png";
import session from "redux-persist/lib/storage/session";

const { Panel } = Collapse;

const themeoption = [
  { value: "Agriculture", label: "Agriculture" },
  { value: "Air", label: "Air" },
  {
    value: "Biodiversity and Ecosystems",
    label: "Biodiversity and Ecosystems",
  },
  { value: "Climate", label: "Climate" },
  { value: "Education", label: "Education" },
  { value: "Energy", label: "Energy" },
  { value: "Financial Services", label: "Financial Services" },
  { value: "Health", label: "Health" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Land", label: "Land" },
  { value: "Oceans & Coastal Zones", label: "Oceans & Coastal Zones" },
  { value: "Pollution", label: "Pollution" },
  { value: "Waste", label: "Waste" },
  { value: "Water", label: "Water" },
  { value: "SDGs", label: "SDGs" },
  { value: "Beneficiaries", label: "Beneficiaries" },
  { value: "Employment", label: "Employment" },
  { value: "Operational Impact", label: "Operational Impact" },
  { value: "Financials", label: "Financials" },
  { value: "Investment Lens", label: "Investment Lens" },
  { value: "Impact Category", label: "Impact Category" },
  { value: "Diversity and Inclusion", label: "Diversity and Inclusion" },
  { value: "SDG Target", label: "SDG Target" },
  { value: "Focus", label: "Focus" },
  { value: "Dimensions of Impact", label: "Dimensions of Impact" },
  { value: "IRIS Reports", label: "IRIS Reports" },
  { value: "Product Service Impact", label: "Product Service Impact" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Joint Impact Indicators", label: "Joint Impact Indicators" },
];

const dataMock = [
  { title: "One", value: 50, color: "#E5DFF7" },
  { title: "Two", value: 50, color: "#B0D1D8" },
];

const DonorDetails = (props) => {
  const [roles, setRoles] = useState(null);
  const [headquaters, setHeadquaters] = useState("0");
  const history = useHistory();
  const organisationId = sessionStorage.getItem("organisationId");
  const [initialState, setInitialState] = useState("");
  const projectId = sessionStorage.getItem("projectId");

  console.log("hgjh", projectId);
  useEffect(() => {
    const fetchAddress = async () => {
      if (organisationId) {
        const response = await Organisationapi().fetchAddress(organisationId);
        if (response.data) {
          setInitialState(response.data);
          if (response.data.addressList.length > 0) {
            sessionStorage.setItem("locationUpdate", true);
          }
        }
      }
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const fetchAsyncData = async () => {
      try {
        const responseData = await axios.get(`${BASE_URL}/social-org/v1/countries`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (responseData?.data?.data?.countryList) {
          const roles = responseData.data.data.countryList.map((item) => {
            return {
              value: item.id,
              label: item.value,
            };
          });
          setRoles(roles);
        }
      } catch (err) {
        message.error(appConfigurations.general_error_message);
      }
    };
    fetchAsyncData();
  }, []);

  // const organisationId = sessionStorage.getItem("organisationId");

  const backClick = () => {
    const organisationId = sessionStorage.getItem("organisationId");
    // if (organisationId)
    //   history.push(
    //     `${appRoutes.ORGANISATION}${appRoutes.LEADERSHIP}/${organisationId}`
    //   );
  };

  const saveBeneficiary = async (values) => {
    if (initialState) {
      values.countryId = initialState.countryId;
    }

    const response = await Organisationapi().addorUpdatelocation(values);
    if (response.success) {
      notification.success({ message: "Donor Details Saved..!" });
      // session.setItem('projectId',response.data.projectId);
      // console.log('projectId',response.data.projectId);
      history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_REPORTING}/${projectId}`);
    }
  };

  const onSelectChange = (val) => {
    if (initialState) {
      initialState.countryId = val;
    } else {
      setHeadquaters(val);
    }
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
  };

  return (
    <div className="locationPage">
      <div className="row">
        <div className="col-md-7 ">
          <Formik
            initialValues={getInitialValues(organisationId, initialState)}
            enableReinitialize={true}
            onSubmit={(values) => saveBeneficiary(values)}
          >
            {({ values, touched, errors, submitForm, setFieldValue }) => {
              return (
                <Form className="formStyles organizationpadding">
                  <Collapse defaultActiveKey={["1"]}>
                    <h6 className="headingdonor">Self funding (Internal Accrual)</h6>
                    <div className="row pt-3">
                      <div className="col-sm-3">
                        <Field name="dgudi" component={Input} class="form-control" placeholder="0 %" />
                      </div>
                      <div className="col-sm-9">
                        <Field name="eytyu" component={Input} class="form-control" placeholder="Eg. 2,00,000" />
                      </div>
                    </div>
                    <div>
                      <br />
                    </div>
                    <div className="row pt-4">
                      <div className="col-md-8">
                        <h6 className="headingdonor">Who are the donors for your program?</h6>
                      </div>
                      <div className="col-md-4">
                        <p>
                          Can’t find a donor? <a href="#">Invite</a>
                        </p>
                      </div>
                    </div>

                    <FieldArray
                      name="addressList"
                      render={(arrayHelpers) => (
                        <div>
                          {values.addressList.map((friend, index) => {
                            const currentNumberOfItems = values.addressList.length;
                            return (
                              <>
                                <div className="col-sm-12 text-right">
                                  <MinusOutlined
                                    onClick={() => (currentNumberOfItems !== 1 ? arrayHelpers.remove(index) : null)}
                                  />
                                </div>
                                <div key={index}>
                                  <h6 className="formSubHeading" name={`addressList[${index}].title`}>{`Donor  ${
                                    index + 1
                                  }`}</h6>

                                  <div className="row pt-3">
                                    <div className="col-sm-12 ">
                                      <Field
                                        name={`addressList[${index}].title`}
                                        component={Input}
                                        class="form-control"
                                        placeholder="Donor Name"
                                      />
                                    </div>
                                  </div>

                                  <div className="row pt-3">
                                    <div className="col-sm-3">
                                      <Field
                                        name={`addressList[${index}].city`}
                                        component={Input}
                                        class="form-control"
                                        placeholder="0 %"
                                      />
                                    </div>
                                    <div className="col-sm-9">
                                      <Field
                                        name={`addressList[${index}].state`}
                                        component={Input}
                                        class="form-control"
                                        placeholder="Eg. 2,00,000"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="locationhr">
                                  <hr />
                                </div>
                              </>
                            );
                          })}
                          <div className="row">
                            <div className=" col-md-12">
                              <Button
                                type="dashed"
                                block
                                className="addcontent addmember"
                                icon={<PlusOutlined />}
                                onClick={() =>
                                  arrayHelpers.push({
                                    streetName: "",
                                    city: "",
                                    state: "",
                                    pincode: "",
                                    /* addressType: "", */
                                  })
                                }
                              >
                                Add more Donors
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    />
                    {/* </Panel> */}
                  </Collapse>

                  <div className="row">
                    <h6 className="headingdonor pt-5">What is the funding model required?</h6>
                    <div className="col-sm-12 p-0">
                      <Field
                        name="primaryImpact"
                        placeholder="Funding Model Type"
                        component={SelectBox}
                        options={themeoption}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-7"></div>
                    <div className="col-md-5 floatRight displayFlex">
                      <Button onClick={submitForm} className="steps-action  formStyles nextbutton">
                        NEXT: REPORTING
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="col-md-3">
          {/* <img src={locations} alt="" className="leadership-image" /> */}
          <PieChart
            data={dataMock}
            lineWidth={25}
            paddingAngle={18}
            // rounded
            label={({ dataEntry }) => dataEntry.value}
            labelStyle={(index) => ({
              fill: dataMock[index].color,
              fontSize: "5px",
              // fontFamily: 'sans-serif',
            })}
            labelPosition={60}
          />
        </div>
      </div>
      {/* <img src={Dark} />
        <img src={Light} /> */}
    </div>
  );
};

const getInitialValues = (organisationId, initialState) => {
  if (!isEmpty(initialState)) {
    return {
      organisationId: organisationId ? organisationId : "",
      addressList: initialState
        ? initialState.addressList
        : [
            {
              id: "",
              title: "",
              address: "",
              country: "",
              state: "",
              city: "",
              pincode: "",
              latitude: 123.5,
              longitude: 54.65,
            },
          ],
    };
  } else {
    return {
      organisationId: organisationId ? organisationId : "",
      addressList: initialState
        ? initialState.addressList
        : [
            {
              id: "",
              title: "",
              address: "",
              country: "",
              state: "",
              city: "",
              pincode: "",
              latitude: 123.5,
              longitude: 54.65,
            },
          ],
    };
  }
};

export default DonorDetails;
