import {Button, notification} from "antd";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Collapse} from "antd";
import { Form, Field, useFormik, FormikProvider,getIn} from "formik";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {appConfigurations} from "../../utils/constants";
import {BASE_URL} from "../../api/config";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {isEmpty} from "lodash";
import Organisationapi from "../../api/organizationapi";
import appRoutes from "../../constants/app-routes";
import locations from "../../assets/images/illustrators/locationship.png";
import * as Yup from "yup";


const Location = (props) => {
  const [headquaters, setHeadquaters] = useState("0");
  const regexp = new RegExp(`^-?[0-9]*$`);
  const history = useHistory();
  const organisationId = sessionStorage.getItem("organisationId");
  const [initialState, setInitialState] = useState("");
  const [countryList, setCountryList] = useState([]);
  const requiredMsg = "This is a required field.";

  const formValidations = Yup.object().shape({
    addressList: Yup.array()
    .of(Yup.object().shape({
      title: Yup.string().nullable().required(requiredMsg),
      address: Yup.string().nullable().required(requiredMsg),
      country: Yup.string().nullable().required(requiredMsg),
      state: Yup.string().nullable().required(requiredMsg),
      city: Yup.string().nullable().required(requiredMsg),
      pincode: Yup.string().nullable().required(requiredMsg),
    }))
  });

  const formik = useFormik({
    initialValues: {
      organisationId: organisationId ? organisationId : "",
      countryId: "",
      addressList: [{
        id: "",
        title: "",
        address: "",
        country: "",
        state: "0",
        city: "",
        pincode: "",
        latitude: 123.5,
        longitude: 54.65,
      }]
    },
    validationSchema:
      Yup.object().shape({
        addressList: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!'),
            address: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!'),
            city: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!').matches(/^[A-Za-z.\/@_]*$/, "Only Alphabits!"),
          })
        ),
      }),
    onSubmit: async (values) => {
      const response = await Organisationapi().addorUpdatelocation(values);
      if (response.success) {
        notification.success({message: "Location Details Saved..!"});
        history.push(
          `${appRoutes.ORGANISATION}${appRoutes.PURPOSE}/${organisationId}`
        );
      } else {
        notification.error({message: `${response.error}`});
      }
    }

  });
  const {
    values, setValues, setFieldValue, errors,
    touched, handleSubmit
  } = formik;

  // const handlestate = (setFieldValue, index, selectedValue) => {
  //   setFieldValue(`addressList[${index}].state`, selectedValue);
  // };
  //
  // const handleCountry = (setFieldValue, index, selectedValue) => {
  //   setFieldValue(`addressList[${index}].country`, selectedValue);
  // };

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
        const responseData = await axios.get(
          `${BASE_URL}/beneficiary/v1/countries-with-state`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (responseData?.data?.data) {
          setCountryList(responseData.data.data);
          const roles = responseData.data.data.map((item) => {
            return {
              value: item.id,
              label: item.countryName,
            };
          });
        }
      } catch (err) {
        notification.error(appConfigurations.general_error_message);
      }
    };
    fetchAsyncData();
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      countryId: initialState ? initialState.countryId : "",
      addressList: initialState ? initialState.addressList : [{
        id: "",
        title: "",
        address: "",
        country: "",
        state: "0",
        city: "",
        pincode: "",
        latitude: 123.5,
        longitude: 54.65,
      }]
    })
  },[initialState])

  const backClick = () => {
    const organisationId = sessionStorage.getItem("organisationId");
    if (organisationId)
      history.push(
        `${appRoutes.ORGANISATION}${appRoutes.LEADERSHIP}/${organisationId}`
      );
  };

  const onSelectChange = (val) => {
    // if (initialState) {
    //   initialState.countryId = val;
    // }
    setHeadquaters(val);

    if (parseInt(val) === 101) {
      setValues({
        ...values,
        countryId: val,
        addressList: values.addressList.map(data => {
          return {
            ...data,
            country: 101
          }
        })
      });
    }else{
      setValues({
        ...values,
        countryId: val,
      });
    }
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const renderStateOptions = (country) => {
    const selectedCountry = country
      ? headquaters &&
      headquaters.toString() == "101"
        ? headquaters
        : country
      : headquaters &&
      headquaters.toString() == "101"
        ? headquaters
        : ""
    if (selectedCountry) {
      const states = countryList ? countryList.filter(data => data.id === selectedCountry)[0]?.stateList.map((item) => {
        return {
          value: item.id,
          label: item.stateName,
        };
      }) : [];

      return states;
    } else return [];
  }

  const renderCountryOptions = () => {
    const countryData = countryList && countryList.map(data => {
      return {
        value: data.id,
        label: data.countryName,
      }
    });
    return countryData;
  }

  const renderCountryByHeadquaters = (apiCountry) => {
    if (parseInt(headquaters) === 101) {
      const countryData = countryList && countryList.filter(data => data.id === parseInt(headquaters));
      if (countryData && countryData.length) {
        return [{
          value: countryData[0].id,
          label: countryData[0].countryName,
        }]
      } else return [];
    } else {
      if (parseInt(headquaters) === 0) {
        if (parseInt(apiCountry) === 101) {
          const countryData = countryList && countryList.filter(data => data.id === parseInt(apiCountry));
          if (countryData && countryData.length) {
            return [{
              value: countryData[0].id,
              label: countryData[0].countryName,
            }]
          } else return [];
        } else {
          return renderCountryOptions();
        }
      } else {
        return renderCountryOptions();
      }
    }
  }

  const renderValue = (country, state) => {
    let countryValue = headquaters && parseInt(headquaters) === 101 ? headquaters : country;

    const data = countryList && countryList.filter(cdata => cdata.id === countryValue);
    const stateData = data && data.length && data[0].stateList.filter(sdata => sdata.id === parseInt(state));

    if (stateData && stateData.length > 0) {
      return stateData[0].id;
    }
  }

  const removeForm = (oldIndex) => {
    const newValues = values.addressList.filter((data,index) => index !== oldIndex);
    setValues({
      ...values,
      addressList: newValues
    });
  }

  const addForm = () => {
    const newValues = values.addressList;
    newValues.push({
      id: "",
      title: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      latitude: 123.5,
      longitude: 54.65,
    });

    setValues({
      ...values,
      addressList: newValues
    });
  }

  return (
    <div className="locationPage">
      <p>Add your organization headquarters and other locations</p>
      <div className="row">
        <div className="col-md-7">
          <FormikProvider value={formik}>
            <Form className="formStyles">
              <Collapse defaultActiveKey={["1"]}>
                <br/>
                <div className="col-sm-12 p-0">
                 <Field
                    name="countryId"
                    component={SelectBox}
                    options={renderCountryOptions()}
                    placeholder="Country of Headquarters"
                    onChange={(e) => onSelectChange(e)}
                  /> 
                </div>
                <div>
                  <br/>
                </div>
                <div className="locationhr">
                  <hr/>
                </div>
                <div>
                  {values.addressList && values.addressList.map((friend, index) => {
                    const currentNumberOfItems = values.addressList.length;
                    return (
                      <>
                        <div className="col-sm-12 text-right">
                          <MinusOutlined
                            onClick={() =>
                              currentNumberOfItems !== 1
                                ? removeForm(index)
                                : null
                            }
                          />
                        </div>
                        <div key={index}>
                          <div className="row pt-3">
                            <div className="col-sm-12 ">
                              <Field
                                name={`addressList[${index}].title`}
                                component={Input}
                                class="form-control"
                                placeholder="Address Type"
                                errortext={
                                  getIn(
                                    touched,
                                    `addressList.${index}.title`
                                  ) &&
                                  getIn(errors, `addressList.${index}.title`) &&
                                  getIn(errors, `addressList.${index}.title`)
                                }
                              />
                            </div>
                          </div>
                          <div className="row pt-3">
                            <div className="col-sm-12 ">
                              <Field
                                name={`addressList[${index}].address`}
                                component={Input}
                                class="form-control"
                                placeholder="Address"
                                errortext={
                                  getIn(
                                    touched,
                                    `addressList.${index}.address`
                                  ) &&
                                  getIn(errors, `addressList.${index}.address`) &&
                                  getIn(errors, `addressList.${index}.address`)
                                }
                              />
                            </div>
                          </div>
                          <div className="row pt-3">
                            <div className="col-md-6 col-sm-12">
                              <Field
                                name={`addressList.${index}.country`}
                                value={
                                  friend.country
                                    ? headquaters &&
                                    headquaters.toString() == "101"
                                      ? headquaters
                                      : friend.country
                                    : headquaters &&
                                    headquaters.toString() == "101"
                                      ? headquaters
                                      : ""
                                }
                                component={SelectBox}
                                // onChange={(value) => handleCountry(setFieldValue, index, value)}
                                options={renderCountryByHeadquaters(values.countryId)}
                                placeholder="Country"
                                errortext={touched.addressList && touched.addressList[index]?.country ? errors.addressList && errors.addressList[index]?.country : ""}
                              />
                            </div>
                            <div className="col-sm-6 ">
                              <Field
                                name={`addressList[${index}].state`}
                                // value={friend.state ? parseInt(friend.state) : ""}
                                value={renderValue(friend.country, friend.state)}
                                component={SelectBox}
                                options={renderStateOptions(friend.country)}
                                // onChange={(value) => handlestate(setFieldValue, index, value)}
                                // class="form-control"
                                placeholder="State"
                                errortext={touched.addressList && touched.addressList[index]?.state ? errors.addressList && errors.addressList[index]?.state : ""}
                              />
                            </div>
                          </div>
                          <div className="row pt-3">
                            <div className="col-sm-6 ">
                              <Field
                                name={`addressList[${index}].city`}
                                component={Input}
                                class="form-control"
                                placeholder="City"
                                errortext={
                                  getIn(
                                    touched,
                                    `addressList.${index}.city`
                                  ) &&
                                  getIn(errors, `addressList.${index}.city`) &&
                                  getIn(errors, `addressList.${index}.city`)
                                }
                              />
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <Field
                                name={`addressList[${index}].pincode`}
                                component={Input}
                                type="number"
                                maxLength="6"
                                onInput={maxLengthCheck}
                                placeholder="Pincode"
                                errortext={touched.addressList && touched.addressList[index]?.pincode ? errors.addressList && errors.addressList[index]?.pincode : ""}
                              />
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div className="locationhr">
                          <hr/>
                        </div>
                      </>
                    )
                  })}
                  <div className="row">
                    <div className=" col-md-12">
                      {/* <Button
                        type="dashed"
                        block
                        className="addcontent addmember"
                        icon={<PlusOutlined/>}
                        onClick={() =>
                          addForm()
                        }
                      >
                        Add more locations
                      </Button> */}
                      <span className="d-flex text-center align-items-center pointer" style={{
                        backgroundColor: "#f2f2f2",
                        borderRadius: 12,
                        padding: 30,
                        border: "1px dashed #9a9898",
                        color: "#000"
                      }} onClick={() =>
                        addForm()
                      }>
                      <PlusOutlined className="pr-2"/> Add more locations
                      </span>
                    </div>
                  </div>
                </div>
              </Collapse>
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
                    onClick={handleSubmit}
                    className="steps-action formStyles nextbutton"
                  >
                    NEXT: PURPOSE
                  </Button>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
        <div className="col-md-3">
          <img src={locations} alt="" className="leadership-image"/>
        </div>
      </div>
    </div>
  );
};

const getInitialValues = (organisationId, initialState, headquaters) => {
  if (!isEmpty(initialState)) {
    return {
      organisationId: organisationId ? organisationId : "",
      countryId: initialState ? initialState.countryId : "",
      addressList: initialState
        ? initialState.addressList
        : [
          {
            id: "",
            title: "",
            address: "",
            country: "",
            state: "0",
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
      countryId: initialState ? initialState.countryId : "",
      addressList: initialState
        ? initialState.addressList
        : [
          {
            id: "",
            title: "",
            address: "",
            country: "",
            state: "0",
            city: "",
            pincode: "",
            latitude: 123.5,
            longitude: 54.65,
          },
        ],
    };
  }
};

export default Location;
