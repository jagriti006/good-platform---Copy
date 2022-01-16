import {Button, Col, notification, Row} from "antd";
import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {Form, Field, useFormik, FormikProvider} from "formik";
import Input from "../../FormikComponents/Input/Input";
import {DeleteOutlined, FormOutlined, PlusOutlined} from "@ant-design/icons";
import ProgramcreationAPI from "../../../api/programcreationAPI";
import appRoutes from "../../../constants/app-routes";
import {PieChart} from "react-minimal-pie-chart";
import "./donorDetailsClone.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import SelectBox from "../../FormikComponents/SelectBox/SelectBox";
import {getProjectManagementUrl} from "../../../api/config";
import axios from "axios";
import {appConfigurations} from "../../../utils/constants";
import donor1 from "../../../assets/images/Ellipse38.png";
import donor2 from "../../../assets/images/Ellipse39.png";
import * as Yup from "yup";

const dataMock = [
  {title: "One", value: 400, color: "#E5DFF7"},
  {title: "Two", value: 60, color: "#B0D1D8"},
];

const projectId = sessionStorage.getItem("projectId");

const DonorDetailsClone = (props) => {
  const history = useHistory();
  const programId = useParams().programId;
  const token = sessionStorage.getItem("access_token");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState(undefined);
  const [initialState, setInitialState] = useState({
    id: "",
    selfFundingPercentage: "",
    selfFundingAmount: "",
    fundingModel: [],
    fundingModelId: null,
  });

  const [projectFundModels, setProjectFundModels] = useState([]);

  useEffect(() => {
    const fetchDonorDetails = async () => {
      const response = await ProgramcreationAPI().fetchDonorDetails(programId);

      if (response.status === 404) {
        setIsEmpty(true);
      } else if (response.data) {
        setIsEmpty(false);
        setInitialState({
          ...initialState,
          selfFundingPercentage: response.data.selfFundingPercentage,
          selfFundingAmount: response.data.selfFundingAmount,
          fundingModel: response.data.fundingModel,
          fundingModelId: response.data.fundingModelId,
          id: response.data.id,
        });
      }
    };

    const fetchProgramFundingModels = async () => {
      const response = await ProgramcreationAPI().fetchProjectModels();

      if (response.data) {
        setProjectFundModels(response.data);
      }
    };

    fetchProgramFundingModels();
    fetchDonorDetails();
  }, []);

  const formikSelfFunding = useFormik({
    initialValues: {
      selfFundingPercentage: "",
      selfFundingAmount: "",
    },
  });

  const formikProjectFundingModel = useFormik({
    initialValues: {
      fundingModelId: null,
    },
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      donorName: "",
      fundAskPercentage: "",
      fundAskAmount: "",
    },
    validationSchema: Yup.object().shape({
      donorName: Yup.string()
        .required("Donor Name is required.")
        .max(248, "Maximum 248 characters allowed.")
        .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
    }),
  });

  useEffect(() => {
    formikSelfFunding.setValues({
      selfFundingPercentage: initialState.selfFundingPercentage,
      selfFundingAmount: initialState.selfFundingAmount,
    });

    formikProjectFundingModel.setValues({
      fundingModelId: initialState.fundingModelId,
    });
  }, [initialState]);

  const backClick = () => {
    if (programId) history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_BUDGET}/${programId}`);
  };

  const addDonorHandler = () => {
    const initialStateClone = {...initialState};
    const data = {
      ...formik.values,
      id: `NEW_${Math.floor(Math.random() * 2000)}`,
    };
    initialStateClone.fundingModel.push({...data});
    setInitialState({...initialStateClone});
    formik.resetForm();
  };

  const deleteDonorHandler = async (donorId) => {
    try {
      const leaderShipDataResponse = await axios({
        method: "DELETE",
        url: getProjectManagementUrl(`project/donor/${donorId}`),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (leaderShipDataResponse?.data?.success) {
        notification.success({message: "Donor Details Deleted..!"});
        // setIsRefresh(!isRefresh);
        const initialClone = initialState.fundingModel.filter((data) => data.id !== donorId);

        setInitialState({
          ...initialState,
          fundingModel: initialClone,
        });
      } else {
        notification.error("Donor Details Not Deleted");
      }
    } catch (err) {
      notification.error(appConfigurations.general_error_message);
    }
  };

  const editHandler = (donorId) => {
    const donor = initialState.fundingModel.find((donor) => donor.id === donorId);
    formik.setValues(donor);
    setSelectedPanel(donor);
    setIsEditMode(true);
  };

  const cancelHandler = () => {
    setSelectedPanel(undefined);
    formik.resetForm();
    setIsEditMode(false);
  };

  const updateDonorHandler = () => {
    const initialStateClone = {...initialState};

    initialStateClone.fundingModel = initialStateClone.fundingModel.map((donor) => {
      let data = {...donor};

      if (donor.id === selectedPanel.id) {
        data = {...formik.values};
      }

      return data;
    });

    initialStateClone.selfFundingPercentage = formikSelfFunding.values.selfFundingPercentage;
    initialStateClone.selfFundingAmount = formikSelfFunding.values.selfFundingAmount;
    initialStateClone.fundingModelId = formikProjectFundingModel.values.fundingModelId;

    setInitialState({...initialStateClone});
    setSelectedPanel(undefined);
    formik.resetForm();
    setIsEditMode(false);
  };

  const saveProgramDetails = async () => {
    const initialStateClone = {...initialState};
    if (formik.values.donorName || formik.values.fundAskPercentage || formik.values.fundAskAmount) {
      const data = {
        ...formik.values,
        id: `NEW_${Math.floor(Math.random() * 2000)}`,
      };
      initialStateClone.fundingModel.push({...data});
    }

    const leaderShipDataResponse = await axios({
      method: isEmpty ? "POST" : "PUT",
      url: getProjectManagementUrl("project/donor"),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        id: initialState.id,
        projectId: programId,
        selfFundingPercentage: formikSelfFunding.values.selfFundingPercentage,
        selfFundingAmount: formikSelfFunding.values.selfFundingAmount,
        fundingModel: initialStateClone.fundingModel.map((data) => {
          if (data.id.includes("NEW_")) {
            delete data.id;
            return data;
          } else {
            return data;
          }
        }),
        fundingModelId: formikProjectFundingModel.values.fundingModelId,
      },
    });

    if (leaderShipDataResponse?.data?.success) {
      notification.success({message: "Program Details Saved..!"});
      history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_REPORTING}/${programId}`);
    } else {
      notification.error({message: "Details not added"});
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} lg={20}>
        <div className="locationPage">
          <div className="row">
            <div className="col-md-7" style={{padding: "0px"}}>
              <FormikProvider value={formikSelfFunding}>
                <Form className="formStyles organizationpadding">
                  <div>
                    <h6 className="headingdonor">Self funding (Internal Accrual)</h6>
                    <div className="row pt-3">
                      <div className="col-sm-3">
                        <Field
                          name="selfFundingPercentage"
                          component={Input}
                          className="form-control"
                          placeholder="Percentage"
                          type={"number"}
                        />
                      </div>
                      <div className="col-sm-9">
                        <Field
                          name="selfFundingAmount"
                          component={Input}
                          className="form-control"
                          placeholder="Amount"
                          type={"number"}
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              </FormikProvider>
              <FormikProvider value={formik}>
                <Form className="formStyles organizationpadding">
                  <div>
                    <br/>
                  </div>
                  <div className="row pt-4">
                    <div className="col-md-8">
                      <h6 className="headingdonor">Who are the donors for your program?</h6>
                    </div>
                    <div className="col-md-4">
                      <p>
                        Can’t find a donor?{" "}
                        <a href="#" className="linkinvite">
                          <u>Invite</u>
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="my-3">
                    {initialState.fundingModel.map((donor, index) => {
                      return (
                        <div key={donor.id}>
                          <div style={{display: "flex", justifyContent: "space-between", marginTop: "2rem"}}>
                            <h6
                              className="formSubHeading donortitle"
                              style={{margin: 0, fontSize: 16, fontWeight: 600}}
                            >{`Donor  ${index + 1}`}</h6>
                            {(selectedPanel && selectedPanel.donorName) !== donor.donorName && (
                              <DeleteOutlined
                                className={"mx-4"}
                                style={{fontSize: "1.2rem"}}
                                onClick={() => deleteDonorHandler(donor.id)}
                              />
                            )}
                          </div>
                          {(selectedPanel && selectedPanel.id) === donor.id && isEditMode && (
                            <div>
                              <div className="row pt-3">
                                <div className="col-sm-12 ">
                                  <Field
                                    name={"donorName"}
                                    component={Input}
                                    className="form-control"
                                    placeholder="Donor Name"
                                    {...formik.getFieldProps("donorName")}
                                    errortext={formik.touched.donorName && formik.errors.donorName}
                                  />
                                </div>
                              </div>

                              <div className="row pt-3">
                                <div className="col-sm-3">
                                  <Field
                                    name={`fundAskPercentage`}
                                    component={Input}
                                    className="form-control"
                                    placeholder="Percentage"
                                    type={"number"}
                                    {...formik.getFieldProps("fundAskPercentage")}
                                  />
                                </div>
                                <div className="col-sm-9">
                                  <Field
                                    name={`fundAskAmount`}
                                    component={Input}
                                    className="form-control"
                                    placeholder="Amount Donated"
                                    type={"number"}
                                    {...formik.getFieldProps("fundAskAmount")}
                                  />
                                </div>
                              </div>
                              <div className="row my-4">
                                <div className="col-sm-4"/>
                                <div className="col-sm-4">
                                  <Button
                                    htmlType="submit"
                                    style={{fontSize: "16px", fontWeight: "700"}}
                                    block
                                    size="large"
                                    onClick={cancelHandler}
                                  >
                                    CANCEL
                                  </Button>
                                </div>
                                <div className="col-sm-4">
                                  <Button
                                    htmlType="submit"
                                    style={{fontSize: "16px", fontWeight: "700"}}
                                    block
                                    size="large"
                                    type="primary"
                                    onClick={updateDonorHandler}
                                    disabled={!!(formik.errors.donorName)}
                                  >
                                    UPDATE
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                          {(selectedPanel && selectedPanel.id) !== donor.id && (
                            <div
                              className="row p-4 mx-0 my-3"
                              style={{background: "#F4F8F8", flexDirection: "column", borderRadius: 10}}
                            >
                              <div style={{display: "flex", justifyContent: "space-between"}}>
                                <p style={{margin: 0, fontSize: 16, fontWeight: 600}}>{donor.donorName}</p>
                                <FormOutlined style={{fontSize: "1.2rem"}} onClick={() => editHandler(donor.id)}/>
                              </div>
                              <div className={"mt-4"} style={{display: "flex"}}>
                                <p style={{margin: 0, fontSize: 13, fontWeight: 400}}>{donor.fundAskPercentage}%</p>
                                <p className={"ml-5"} style={{margin: 0, fontSize: 13, fontWeight: 400}}>
                                  ₹ {donor.fundAskAmount}
                                </p>
                              </div>
                            </div>
                          )}
                          <div className="locationhr" style={{marginTop: "2rem"}}>
                            <hr/>
                          </div>
                        </div>
                      );
                    })}
                    {!isEditMode && (
                      <React.Fragment>
                        <div>
                          <h6 className="formSubHeading donortitle">{`Donor  ${
                            initialState.fundingModel.length + 1
                          }`}</h6>

                          <div className="row pt-3">
                            <div className="col-sm-12 ">
                              <Field
                                name={"donorName"}
                                component={Input}
                                className="form-control"
                                placeholder="Donor Name"
                                {...formik.getFieldProps("donorName")}
                                errortext={formik.touched.donorName && formik.errors.donorName}
                              />
                            </div>
                          </div>

                          <div className="row pt-3">
                            <div className="col-sm-3">
                              <Field
                                name={`fundAskPercentage`}
                                component={Input}
                                className="form-control"
                                placeholder="Percentage"
                                type={"number"}
                                {...formik.getFieldProps("fundAskPercentage")}
                              />
                            </div>
                            <div className="col-sm-9">
                              <Field
                                name={`fundAskAmount`}
                                component={Input}
                                className="form-control"
                                placeholder="Amount Donated"
                                type={"number"}
                                {...formik.getFieldProps("fundAskAmount")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="locationhr">
                          <hr/>
                        </div>
                        <br/>
                        <div className="row">
                          <div className=" col-md-12">
                            <Button
                              type="dashed"
                              block
                              className="addcontent addmember"
                              icon={<PlusOutlined/>}
                              style={{display: "flex", alignItems: "center"}}
                              onClick={addDonorHandler}
                              disabled={!!(formik.errors.donorName)}
                            >
                              Add more Donors
                            </Button>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </Form>
              </FormikProvider>
              <FormikProvider value={formikProjectFundingModel}>
                <Form className="formStyles organizationpadding">
                  <div>
                    <h6 className="headingdonor pt-5">What is the funding model required?</h6>
                    <div className="col-sm-12 p-0">
                      <Field
                        name="fundingModelId"
                        placeholder="Funding Model Type"
                        component={SelectBox}
                        options={projectFundModels}
                        optionLabel="models"
                        valueLabel="id"
                        {...formikProjectFundingModel.getFieldProps("fundingModelId")}
                      />
                    </div>
                  </div>
                  <div className="row px-3" style={{display: "flex", justifyContent: "end"}}>
                    <div className="steps-action floatRight displayFlex formStyles">
                      <Button className="ant-btn-back" onClick={() => backClick()}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                        &nbsp; Previous Step
                      </Button>
                    </div>
                    <div className="steps-action floatRight displayFlex formStyles">
                      <Link onClick={() => saveProgramDetails()}>
                        <Button
                          type="primary"
                          disabled={!!(formik.errors.donorName)}
                        >NEXT: REPORTING</Button>
                      </Link>
                    </div>
                  </div>
                </Form>
              </FormikProvider>
            </div>
            <div className="col-md-3" style={{marginLeft: "auto", marginRight: "auto"}}>
              <div className="chartContainer">
                <PieChart
                  data={dataMock}
                  lineWidth={20}
                  paddingAngle={1}
                  // rounded
                  // label={({dataEntry}) => dataEntry.value}
                  // labelStyle={(index) => ({
                  //   fill: dataMock[index].color,
                  //   fontSize: '5px',
                  //   // fontFamily: 'sans-serif',
                  // })}
                  // style={{height: "50%"}}
                  labelPosition={0}
                />
                <div className="chartText">
                  <h6>Total Budget</h6>
                  <h6 style={{fontWeight: "bold"}}>
                    {initialState.fundingModel.reduce(function (sum, current) {
                      return sum + current.fundAskAmount;
                    }, 0)}
                  </h6>
                </div>
                <div>
                  {initialState.fundingModel.map((data, index) => (
                    <div className="chartContent" key={index}>
                      <div>
                        <img src={donor1} alt={""}/>
                        <span style={{marginLeft: "1rem"}}>{data.fundAskPercentage}%</span>
                      </div>
                      <h6 className="headingChart">{data.donorName}</h6>
                    </div>
                  ))}
                  {/*<div className="chartContent">*/}
                  {/*  <div>*/}
                  {/*    <img src={donor2} alt={""}/>*/}
                  {/*    <span style={{marginLeft: "1rem"}}>00%</span>*/}
                  {/*  </div>*/}
                  {/*  <div>*/}
                  {/*    <h6 className="headingChart">Donor 1</h6>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DonorDetailsClone;
