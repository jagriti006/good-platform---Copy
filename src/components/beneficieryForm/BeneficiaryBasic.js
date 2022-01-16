import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, notification, Radio, Row } from "antd";
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { projectIdorName } from "../../api/config";
import { PROJECT } from "../../constants/strings";
import { clearPersistedReducerStateValue } from "../../redux/persisted/persistedActions";
import { formErrorTextStyle, getNextStepLink, setStructureData, trasformToValueAndLabel, useQuery } from "../../utils/utils";
import DatePicker from "../FormikComponents/Date/Date";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import BeneficiaryCoWINModal from "./BeneficiaryCoWINModal";

const { Panel } = Collapse;

const BeneficiaryBasicInfo = () => {
  const [showCoWINModal, setShowCoWINModal] = useState(false);
  const [formData, setFormData] = useState("");
  const { idProofDetails, kycStatus } = useSelector((state) => state.persisted);
  const dispatch = useDispatch();
  const history = useHistory();
  const { beneficiaryId } = useParams();
  const [dropDownData, setDropDownData] = useState({
    relation: [],
    language: [],
    occupation: [],
    maritial: [],
    state: [],
    district: [],
    city: [],
    taluk: [],
    village: [],
    panchayat: [],
  });
  const projectId = useQuery().get("projectId");
  const [initialState, setInitialState] = useState("");
  const [pincodeChange, setPincodeChange] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearPersistedReducerStateValue("idProofDetails"));
      dispatch(clearPersistedReducerStateValue("kycStatus"));
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const [relations, languages, occupations, maritial, state] = await Promise.all([
        beneficiaryAPI().getAllRelationships(),
        beneficiaryAPI().getAllLanguages(),
        beneficiaryAPI().getAllOccupations(),
        beneficiaryAPI().getAllMaritialStatus(),
        beneficiaryAPI().getAllState(),
      ]);

      const newDropdownData = {
        occupation: trasformToValueAndLabel(occupations.data, "occupation"),
        relation: trasformToValueAndLabel(relations.data, "relation"),
        language: trasformToValueAndLabel(languages.data, "language"),
        maritial: trasformToValueAndLabel(maritial.data, "status"),
        state: setStructureData(state.data),
      };
      setDropDownData(newDropdownData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBeneficiaryBasic = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryBasic(beneficiaryId);
        if (response.data) {
          setInitialState(response.data);
        }
      }
    };
    fetchBeneficiaryBasic();
  }, [beneficiaryId]);

  const saveBeneficiary = (values) => {
    if (projectIdorName("", projectId) === PROJECT.UMEEED) {
      setShowCoWINModal(true);
      setFormData(values);
    } else {
      submitBasicDetails(values);
    }
  };

  const submitBasicDetails = async (values) => {
    const response = await beneficiaryAPI().addorUpdateBeneficiaryBasic(values);
    if (response.success) {
      if (kycStatus && kycStatus != null)
        await beneficiaryAPI().saveKYCdetails({
          ...kycStatus,
          userReferenceId: response.data.id,
        });
      setShowCoWINModal(false);
      notification.success({ message: "Basic Details Saved..!" });
      history.push(`${getNextStepLink()}/${response.data.id}?projectId=${projectId}`);
    }
  };

  const handleStateChange = async (state, postalCode) => {
    const response = await beneficiaryAPI().getAllDistrictByState(state, postalCode);

    if (response.data) {
      setDropDownData({
        ...dropDownData,
        district: setStructureData(response.data),
      });
    }
  };

  const handleDistrictChange = async (state, district, postalCode) => {
    const cityResponse = await beneficiaryAPI().getAllCityByDistrictState(state, district, postalCode);
    let talukResponse = { data: [] };
    if (projectIdorName("", projectId) === PROJECT.ARPAN) {
      talukResponse = await beneficiaryAPI().getAllTalukByDistrict(district, postalCode);
    }

    if (cityResponse.data || talukResponse.data) {
      setDropDownData({
        ...dropDownData,
        city: setStructureData(cityResponse.data),
        taluk: setStructureData(talukResponse.data),
      });
    }
  };

  const handleCityChange = async (state, district, location, setFieldValue, index) => {
    const response = await beneficiaryAPI().getPincodeByCityDistrictState(state, district, location);

    if (response.data) {
      setFieldValue(`address[${index}].postalCode`, response.data);
    }
  };

  const handlePincodeChange = async (pincode, setFieldValue, index) => {
    const response = await beneficiaryAPI().getCityDistrictStateByPincode(pincode);

    if (response.data) {
      setDropDownData({
        ...dropDownData,
        state: response.data.state ? setStructureData([response.data.state]) : [],
        district: response.data.district ? setStructureData(response.data.district) : [],
        city: response.data.locations ? setStructureData(response.data.locations) : [],
        taluk: response.data.taluk ? setStructureData(response.data.taluk) : [],
        village: response.data.village ? setStructureData(response.data.village) : [],
      });

      setFieldValue(`address[${index}].state`, response?.data?.state || "");
      setFieldValue(`address[${index}].district`, response?.data?.district[0] || "");
      setFieldValue(`address[${index}].city`, "");
      setFieldValue(`address[${index}].taluk`, "");
      setFieldValue(`address[${index}].village`, "");
    } else {
      setDropDownData({
        ...dropDownData,
        state: [],
        district: [],
        city: [],
        taluk: [],
        village: [],
      });

      setFieldValue(`address[${index}].state`, "");
      setFieldValue(`address[${index}].district`, "");
      setFieldValue(`address[${index}].city`, "");
    }
  };

  const handleTalukChange = async (taluk, postalCode) => {
    const response = await beneficiaryAPI().getAllVillagetsByTaluk(taluk, postalCode);
    if (response.data) {
      setDropDownData({
        ...dropDownData,
        village: setStructureData(response.data),
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={getInitialValues(beneficiaryId, initialState, idProofDetails, projectId)}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("First Name is required."),
          gender: Yup.string().required("Gender is required."),
          dob: Yup.mixed().required("Date of birth is required."),
          mobile: Yup.mixed().required("Mobile number required."),
          address: Yup.array().of(
            Yup.object().shape({
              state: Yup.string().required("State is required."),
              postalCode: Yup.string().required("Pincode is required."),
            })
          ),
        })}
        onSubmit={(values) => saveBeneficiary(values)}
      >
        {({ values, touched, errors, setFieldValue, isValid, submitCount }) => {
          return (
            <Form className="beneficiaryForms basicDetalsForm">
              {!isValid && submitCount > 0 && <span style={formErrorTextStyle()}>Form has validation errors..!</span>}
              <Collapse defaultActiveKey={["1"]} className="formSection">
                <Panel header="Basic Info" key="1">
                  <Row justify="space-between">
                    <Col span={11}>
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="First Name"
                        errortext={touched.firstName ? errors.firstName : ""}
                      />
                    </Col>
                    <Col span={11}>
                      <Field name="middleName" component={Input} placeholder="Middle Name" />
                    </Col>
                    <Col span={11}>
                      <Field name="lastName" component={Input} placeholder="Last Name" />
                    </Col>

                    <Col span={11}>
                      <>
                        <span style={formErrorTextStyle()}>{touched.gender ? errors.gender : ""}</span>
                        <Radio.Group
                          name="gender"
                          value={values.gender}
                          onChange={(e) => setFieldValue("gender", e.target.value)}
                        >
                          <Radio value={"Male"}>Male</Radio>
                          <Radio value={"Female"}>Female</Radio>
                          <Radio value={"Other"}>Other</Radio>
                        </Radio.Group>
                      </>
                    </Col>

                    <Col span={11}>
                      <Field
                        name="dob"
                        component={DatePicker}
                        placeholder="Date of Birth"
                        format="DD-MM-YYYY"
                        disabledDate={(d) => !d || d.isAfter(new Date())}
                        errortext={touched.dob ? errors.dob : ""}
                      />
                    </Col>
                    <Col span={24} style={{ marginTop: "1rem" }}>
                      <FieldArray
                        name="address"
                        render={(arrayHelpers) => (
                          <div>
                            {values.address.map((addressItem, index) => (
                              <div key={index}>
                                <h6>{`Address : ${index + 1}`}</h6>
                                <Row gutter={[16, 8]}>
                                  <Col xs={24} lg={12}>
                                    <Field name={`address[${index}].address`} component={Input} placeholder="Address" />
                                  </Col>
                                  <Col xs={24} lg={12}>
                                    <Field
                                      name={`address[${index}].streetName`}
                                      component={Input}
                                      placeholder="Street"
                                    />
                                  </Col>
                                  <Col xs={24} lg={8}>
                                    <Field
                                      name={`address[${index}].postalCode`}
                                      component={Input}
                                      placeholder="Pincode"
                                      onChange={(e) => {
                                        setPincodeChange(true);
                                      }}
                                      onBlur={(e) => {
                                        if (pincodeChange) {
                                          handlePincodeChange(e.target.value, setFieldValue, index);
                                          setPincodeChange(false);
                                        }
                                      }}
                                      errortext={
                                        getIn(touched, `address[${index}].postalCode`) &&
                                        getIn(errors, `address[${index}].postalCode`) &&
                                        getIn(errors, `address[${index}].postalCode`)
                                      }
                                    />
                                  </Col>
                                  <Col xs={24} lg={8}>
                                    <Field
                                      name={`address[${index}].state`}
                                      component={SelectBox}
                                      placeholder="State"
                                      options={dropDownData.state}
                                      onChange={(e) => handleStateChange(e, addressItem.postalCode)}
                                      errortext={
                                        getIn(touched, `address[${index}].state`) &&
                                        getIn(errors, `address[${index}].state`) &&
                                        getIn(errors, `address[${index}].state`)
                                      }
                                    />
                                  </Col>
                                  <Col xs={24} lg={8}>
                                    <Field
                                      name={`address[${index}].district`}
                                      component={SelectBox}
                                      placeholder="District"
                                      options={dropDownData.district}
                                      onChange={(e) => handleDistrictChange(addressItem.state, e, addressItem.postalCode)}
                                    />
                                  </Col>

                                  <Col xs={24} lg={8}>
                                    <Field
                                      visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                                      name={`address[${index}].taluk`}
                                      component={SelectBox}
                                      placeholder="Taluk"
                                      options={dropDownData.taluk}
                                      onChange={(taluk) => handleTalukChange(taluk, addressItem.postalCode)}
                                    />
                                  </Col>

                                  <Col xs={24} lg={8}>
                                    <Field
                                      visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                                      name={`address[${index}].village`}
                                      component={SelectBox}
                                      options={dropDownData.village}
                                      placeholder="Village"
                                    />
                                  </Col>
                                  <Col xs={24} lg={8}>
                                    <Field
                                      name={`address[${index}].city`}
                                      component={SelectBox}
                                      placeholder="City"
                                      options={dropDownData.city}
                                      onChange={(e) =>
                                        handleCityChange(
                                          addressItem.state,
                                          addressItem.district,
                                          e,
                                          setFieldValue,
                                          index
                                        )
                                      }
                                    />
                                  </Col>
                                </Row>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                </Panel>
                <Panel
                  header="Occupation"
                  key="2"
                  style={projectIdorName("", projectId) === PROJECT.UMEEED ? { display: "none" } : { display: "block" }}
                >
                  <Field
                    name="primaryOccupationId"
                    component={SelectBox}
                    placeholder="Occupation"
                    options={dropDownData.occupation}
                  />
                  <Field
                    name="secondaryOccupationId"
                    component={SelectBox}
                    placeholder="Secondary Occupation"
                    options={dropDownData.occupation}
                  />
                </Panel>
                <Panel header="Other Info" key="4">
                  <Row justify="space-between">
                    <Col span={11}>
                      <Field
                        name="maritialStatusId"
                        component={SelectBox}
                        placeholder="Marital Status"
                        options={dropDownData.maritial}
                      />
                    </Col>
                    <Col span={11}>
                      <Field
                        name="noOfFamilyMembers"
                        component={Input}
                        placeholder="Number of Family Members"
                        type="number"
                        onChange={(e) => (e.target.value < 0 ? setFieldValue("noOfFamilyMembers", 0) : "")}
                      />
                    </Col>
                    <Col span={11}>
                      <Field
                        name="languageId"
                        component={SelectBox}
                        placeholder="Language"
                        options={dropDownData.language}
                      />
                    </Col>
                  </Row>
                </Panel>
                <Panel header="Contact" key="3">
                  <Field name="email" component={Input} placeholder="Email" />
                  <Field
                    name="mobile"
                    addonBefore={"+91"}
                    component={Input}
                    type="number"
                    placeholder="Mobile"
                    onChange={(e) =>
                      e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)
                        ? setFieldValue("mobile", e.target.value)
                        : setFieldValue("mobile", "")
                    }
                    errortext={touched.mobile ? errors.mobile : ""}
                  />
                  {/* <Field
                    name="landline"
                    component={Input}
                    placeholder="Landline"
                  /> */}
                </Panel>

                <Panel header="Family Contact" key="5" style={{ display: "none" }}>
                  <FieldArray
                    name="familyContact"
                    render={(arrayHelpers) => (
                      <div>
                        {values.familyContact.map((familyContacTitem, index) => (
                          <div key={index}>
                            <h6>{`Family Contact : ${index + 1}`}</h6>
                            <Field
                              name={`familyContact[${index}].relationshipId`}
                              component={SelectBox}
                              valueKey="relation"
                              placeholder="Relationship"
                              options={dropDownData.relation}
                            />
                            <Field
                              name={`familyContact[${index}].firstName`}
                              component={Input}
                              placeholder="First Name"
                            />
                            <Field
                              name={`familyContact[${index}].middleName`}
                              component={Input}
                              placeholder="Middle Name"
                            />
                            <Field
                              name={`familyContact[${index}].lastName`}
                              component={Input}
                              placeholder="Last Name"
                            />
                            <Field
                              name={`familyContact[${index}].contactNumber`}
                              component={Input}
                              placeholder="Contact Number"
                            />
                          </div>
                        ))}
                        <Row justify="space-between">
                          <Col span={11}>
                            <Button
                              type="dashed"
                              block
                              icon={<PlusOutlined />}
                              onClick={() =>
                                arrayHelpers.push({
                                  relationshipId: "",
                                  firstName: "",
                                  middleName: "",
                                  lastName: "",
                                  contactNumber: "",
                                })
                              }
                            >
                              Add Spouse/Relative
                            </Button>
                          </Col>
                          <Col span={11}>
                            <Button
                              type="dashed"
                              block
                              icon={<PlusOutlined />}
                              onClick={() =>
                                arrayHelpers.push({
                                  relationshipId: "",
                                  firstName: "",
                                  middleName: "",
                                  lastName: "",
                                  contactNumber: "",
                                })
                              }
                            >
                              Add Parents/Guardians
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    )}
                  />
                </Panel>
              </Collapse>
              <Row justify="end">
                <Col xs={12} lg={6}>
                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
      {showCoWINModal && (
        <BeneficiaryCoWINModal
          isModalVisible={showCoWINModal}
          setIsModalVisible={setShowCoWINModal}
          formData={formData}
          submitBasicDetails={submitBasicDetails}
        />
      )}
    </>
  );
};

const getInitialValues = (beneficiaryId, initialState, idProofDetails, projectid) => {
  if (!isEmpty(initialState)) {
    const dateOfBirth = initialState?.dob ? moment(initialState.dob) : null;
    return {
      id: beneficiaryId ? beneficiaryId : "",
      firstName: initialState ? initialState.firstName : "",
      middleName: initialState ? initialState.middleName : "",
      lastName: initialState ? initialState.lastName : "",
      dob: dateOfBirth,
      gender: initialState ? initialState.gender : "",
      maritialStatusId: initialState ? initialState.maritalStatus : undefined,
      noOfFamilyMembers: initialState ? initialState.noOfFamilyMembers : undefined,
      languageId: undefined,
      primaryOccupationId: initialState ? initialState.primaryOccupation.id : undefined,
      secondaryOccupationId: initialState ? initialState.secondaryOccupation.id : undefined,
      email: initialState ? initialState.email : "",
      mobile: initialState ? initialState.mobile : "",
      landline: initialState ? initialState.landline : "",
      address: initialState
        ? initialState.address
        : [
            {
              id: "",
              streetName: "",
              city: "",
              state: "",
              pincode: "",
              postalCode: "",
              village: "",
              block: "",
              taluk: "",
              district: "",
            },
          ],
      familyContact: initialState
        ? initialState.family
        : [
            {
              id: "",
              relationshipId: undefined,
              firstName: "",
              middleName: "",
              lastName: "",
              contactNumber: "",
            },
          ],
      projectId: initialState ? initialState.projectid : projectid || "",
    };
  } else {
    return {
      id: "",
      firstName: idProofDetails?.firstName,
      middleName: "",
      lastName: idProofDetails?.lastName,
      dob: null,
      gender: idProofDetails?.gender,
      maritialStatusId: undefined,
      noOfFamilyMembers: undefined,
      languageId: undefined,
      primaryOccupationId: undefined,
      secondaryOccupationId: undefined,
      email: "",
      mobile: "",
      landline: "",
      address: [
        {
          id: "",
          streetName: "",
          city: "",
          state: "",
          pincode: "",
          postalCode: "",
          village: "",
          block: "",
          taluk: "",
          district: "",
          // addressType: "",
        },
      ],
      familyContact: [
        {
          id: "",
          relationshipId: undefined,
          firstName: "",
          middleName: "",
          lastName: "",
          contactNumber: "",
        },
      ],
      projectId: projectid,
    };
  }
};

export default BeneficiaryBasicInfo;
