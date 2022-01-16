import React, {useEffect, useState} from "react";
import {Button, Col, Row, notification, Collapse, Timeline, Divider, Select} from "antd";
import {useHistory, useParams} from "react-router-dom";
import {Formik, Form, Field, FieldArray} from "formik";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import ProgramcreationAPI from "../../api/programcreationAPI";
import appRoutes from "../../constants/app-routes";
import Perunit from "../../assets/images/costperunit.png";
import Benif from "../../assets/images/benificiary.png";
import cost from "../../assets/images/programcost.png";
import LargeTolltip from "../common/large-tooltip";
import FloatLabel from "../common/float-label";
import {InputField} from "../form/inputField";
import Text from "antd/lib/typography/Text";
import {PieChart} from "react-minimal-pie-chart";
import rsymbol from "../../assets/images/program-creation/rsymbol.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

const {Panel} = Collapse;
const {Option} = Select;

const Duration = [
  {value: "Days", label: "Days"},
  {value: "Month", label: "Month"},
  {value: "Year", label: "Year"},
];

const BudgetDetails = () => {
  const history = useHistory();
  const {programId} = useParams();
  const [budgetType, setBudgetType] = useState("");
  const [initialState, setInitialState] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const [budgetTypes, setBudgetTypes] = useState(["Operations", "Communication", "Travel", "Administrative"]);
  const [chartData, setChartData] = useState([]);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);

  useEffect(() => {
    const data = [];
    budgetTypes.map((item) => {
      data.push({title: item, value: 10, color: getTitleColorByType(item)});
    });
    setChartData(data);
  }, [budgetTypes]);

  useEffect(() => {
    const fetchProjectbudgetdetails = async () => {
      if (programId) {
        const response = await ProgramcreationAPI().fetchProjectbudgetdetails(programId);
        if (response.data) {
          console.log(response.data, "hgj");
          setInitialState(response.data);
          setBudgetTypes(response.data.budgetBreakDowns.map((item) => item.title));
        }
      }
    };
    fetchProjectbudgetdetails();
  }, []);

  const saveBeneficiary = async (values) => {
    console.log(values);
    const response = await ProgramcreationAPI().addorbudgetetail(values);
    if (response.success) {
      notification.success({message: "Budget Details Saved..!"});
      history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_DONOR}/${programId}`);
    }
  };

  const backClick = () => {
    history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_METRICS}/${programId}`);
  };

  const getBudgetBreakdownStructure = (title) => ({
    title: title,
    percentage: 0,
    amount: 0,
    detailedBreakDowns: [
      {
        title: "",
        amount: 0,
      },
    ],
  });

  const getDetailedBreakdownStructure = () => ({
    title: "",
    amount: 0,
  });

  const onAddNewCost = (arrayHelpers) => {
    if (budgetType.trim() !== "") {
      if (budgetTypes.indexOf(budgetType) > -1) {
        notification.error({
          message: "Already exists..!",
        });
        return;
      }
      arrayHelpers.push(getBudgetBreakdownStructure(budgetType));
      setBudgetTypes([...budgetTypes, budgetType]);
      setBudgetType("");
    }
  };

  const getPanelColorByType = (type) => {
    switch (type) {
      case "Operations":
        return "rgb(229 223 247,0.3)";
      case "Communication":
        return "rgba(255, 224, 224, 0.3)";
      case "Travel":
        return "rgb(176, 209, 216, 0.3)";
      case "Administrative":
        return "rgb(255, 238, 181,0.3)";
    }
  };
  const getTitleColorByType = (type) => {
    switch (type) {
      case "Operations":
        return "#E5DFF7";
      case "Communication":
        return "#FFB2B2";
      case "Travel":
        return "#B0D1D8";
      case "Administrative":
        return "#FFEEB5";
    }
  };
  const selectAfter = (
    <Select defaultValue="INR" className="selectAfter">
      <Option value="INR">INR</Option>
    </Select>
  );

  return (
    <Row justify="center">
      <Col xs={24} lg={20}>
        <div className="budget-creation-page">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Formik
                initialValues={getInitialValues(programId, initialState, budgetTypes)}
                enableReinitialize={true}
                onSubmit={(values) => saveBeneficiary(values)}
                validationSchema={props => {
                  return Yup.object().shape({
                    milestones: Yup.array().of(
                      Yup.object().shape({
                        targetMilestone: Yup.string()
                          .max(248, "Maximum 248 characters allowed.")
                          .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
                        keyActivities: Yup.string()
                          .max(248, "Maximum 248 characters allowed.")
                          .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
                      })
                    ),
                  })
                }}
              >
                {({values, touched, errors, submitForm, setFieldValue}) => {
                  return (
                    <Form className="formStyles">
                      <div className="boxshadowborder px-5">
                        <h5>What is your total program budget</h5>
                        <div className="row">
                          <div className="col-sm-7">
                            <Field
                              name="totalBudget"
                              type="number"
                              component={Input}
                              inputPlaceholder="Eg. 2,00,000"
                              prefix={<img src={rsymbol} className="alignLeft"/>}
                              addonAfter={selectAfter}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row pt-4">
                        <div className="col-md-7">
                          <h6>Budget breakdown</h6>
                        </div>
                      </div>
                      <Row className="pt-4">
                        <Col lg={24} lg={14}>
                          <FieldArray
                            name={`budgetBreakDowns`}
                            render={(arrayHelpers) => (
                              <div>
                                {values.budgetBreakDowns &&
                                values.budgetBreakDowns.map((item, index) => {
                                  return (
                                    <div key={index} className="break-down-item">
                                      <div
                                        className="breakdown-title"
                                        style={{
                                          backgroundColor: getTitleColorByType(item.title),
                                        }}
                                      >
                                        {item.title}
                                      </div>
                                      <div
                                        className="breakdown-body"
                                        style={{
                                          backgroundColor: getPanelColorByType(item.title),
                                        }}
                                      >
                                        <Text className="totalhead">Total</Text>
                                        <div className="row">
                                          <div className="col-sm-3 noBroder">
                                            <Field
                                              name={`budgetBreakDowns[${index}].percentage`}
                                              component={Input}
                                              type="number"
                                              inputPlaceholder="0"
                                              suffix="%"
                                              onChange={(e) => {
                                                if (values.totalBudget) {
                                                  setFieldValue(
                                                    `budgetBreakDowns[${index}].amount`,
                                                    parseInt(values.totalBudget * e.target.value) / 100
                                                  );
                                                } else {
                                                  notification.error({message: "First fill the total budget..!"});
                                                }
                                              }}
                                            />
                                          </div>
                                          <div className="col-sm-9">
                                            <Field
                                              name={`budgetBreakDowns[${index}].amount`}
                                              component={Input}
                                              type="number"
                                              inputPlaceholder="Eg. 2,00,000"
                                              prefix={<img src={rsymbol} className="alignLeft"/>}
                                              onChange={(e) => {
                                                if (values.totalBudget) {
                                                  setFieldValue(
                                                    `budgetBreakDowns[${index}].percentage`,
                                                    (e.target.value * 100) / values.totalBudget
                                                  );
                                                } else {
                                                  notification.error({message: "First fill the total budget..!"});
                                                }
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="collapsfill">
                                        <Collapse
                                          defaultActiveKey={index === 0 ? ["1"] : [""]}
                                          className="formSection"
                                          expandIconPosition="right"
                                        >
                                          <Panel header="Breakdown Costs" key={index === 0 ? ["1"] : [""]}>
                                            <FieldArray
                                              name={`budgetBreakDowns[${index}].detailedBreakDowns`}
                                              render={(arrayHelpers) => (
                                                <>
                                                  {values.budgetBreakDowns &&
                                                  values.budgetBreakDowns[index] &&
                                                  values.budgetBreakDowns[index].detailedBreakDowns.map(
                                                    (arr, index2) => {
                                                      return (
                                                        <div>
                                                          <div className="row justify-content-center" key="1">
                                                            <div className="col-sm-8">
                                                              <Field
                                                                name={`budgetBreakDowns[${index}].detailedBreakDowns[${index2}].title`}
                                                                component={Input}
                                                                placeholder="Particular"
                                                              />
                                                            </div>
                                                            <div className="col-sm-3">
                                                              <Field
                                                                name={`budgetBreakDowns[${index}].detailedBreakDowns[${index2}].amount`}
                                                                component={Input}
                                                                type="number"
                                                                inputPlaceholder="0"
                                                              />
                                                            </div>
                                                          </div>
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                                  <div className="row pt-4 justify-content-center">
                                                    <div className="col-md-11 buttonadd">
                                                      <Button
                                                        type="dashed"
                                                        block
                                                        icon={<PlusOutlined/>}
                                                        onClick={() =>
                                                          arrayHelpers.push(getDetailedBreakdownStructure())
                                                        }
                                                        className="text-left"
                                                      >
                                                        Add more particularss
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                            />
                                          </Panel>
                                        </Collapse>
                                      </div>
                                    </div>
                                  );
                                })}
                                <Divider/>
                                {budgetTypes.length < 6 && (
                                  <div className="row">
                                    <div className=" col-md-12">
                                      <FloatLabel label={"Add budget type"} name={"budgetType"} value={budgetType}>
                                        <InputField
                                          value={budgetType}
                                          onChange={(e) => {
                                            if (e.target.value !== "") setBudgetType(e.target.value);
                                          }}
                                        />
                                      </FloatLabel>
                                    </div>

                                    <div className=" col-md-12">
                                      <Button
                                        type="dashed"
                                        block
                                        className="add-member-button text-left"
                                        icon={<PlusOutlined/>}
                                        onClick={() => onAddNewCost(arrayHelpers)}
                                      >
                                        Add upto 2 more additional costs
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          />
                        </Col>
                        {/* <Col
                      lg={24}
                      lg={10}
                      className="align-self-start px-5 d-flex justify-content-end"
                    >
                      <div className="w-75">
                        <PieChart
                          data={chartData}
                          lineWidth={15}
                          paddingAngle={0}
                        />
                      </div>
                    </Col> */}
                      </Row>

                      <h6 className="pt-5 pb-3">Unit Cost</h6>
                      <Row>
                        <Col lg={14}>
                          <div className="row">
                            <div className="col-md-3 costprogram">
                              <img src={cost}/>
                              <div className="costprog">
                                <p className="headingdonors">
                                  &#8377; 10,00,000 <br/>
                                  Program cost
                                </p>
                              </div>
                            </div>
                            <p className="iconsymbol"> &#247;</p>
                            <div className="col-md-3 costprogram">
                              <img src={Benif}/>
                              <div className="costprog">
                                <p className="headingdonors">
                                  &#8377; 10,000
                                  <br/>
                                  Beneficiaries
                                </p>
                              </div>
                            </div>
                            <p className="iconsymbol"> =</p>

                            <div className="col-md-3 costprogram">
                              <img src={Perunit} className="pl-5"/>
                              <div className="costprog">
                                <p className="headingdonors">
                                  &#8377; 100
                                  <br/>
                                  Cost per unit
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={7}>
                          <LargeTolltip
                            title="Tool Tip"
                            description="These fields help the donor understand  how their funds will be spent and what will actually reach the beneficiary"
                          />
                        </Col>
                      </Row>
                      <div className="row py-3">
                        <div className="col-md-7">
                          <FieldArray
                            name="costComments"
                            render={(arrayHelpers) => (
                              <div>
                                {values.costComments.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <Field
                                        name={`costComments[${index}].comment`}
                                        component={Input}
                                        className="form-control"
                                        placeholder="Comment"
                                      />
                                    </div>
                                  );
                                })}
                                <Text
                                  class="add-comment-link"
                                  onClick={() => {
                                    arrayHelpers.push({comment: ""});
                                  }}
                                >
                                  Add a comment
                                </Text>
                              </div>
                            )}
                          />
                        </div>
                      </div>

                      <h6 className="pt-5 pb-3">What does your programs roadmap and key milestones look like?</h6>
                      <Row>
                        <Col xs={24} lg={14}>
                          <FieldArray
                            name="milestones"
                            render={(arrayHelpers) => (
                              <>
                                <Timeline>
                                  {values.milestones.map((friend, index) => {
                                    const itemCount = values.milestones.length;
                                    return (
                                      <Timeline.Item>
                                        <div>
                                          {itemCount !== 1 && (
                                            <div className="col-sm-12 text-right formStyles">
                                              <MinusOutlined
                                                onClick={() => (itemCount !== 1 ? arrayHelpers.remove(index) : null)}
                                              />
                                            </div>
                                          )}

                                          <div className="row pt-3">
                                            <div className="col-sm-12">
                                              <p className="">
                                                <b>Milestone </b>
                                              </p>
                                              <Field
                                                name={`milestones[${index}].targetMilestone`}
                                                component={Input}
                                                placeholder="What is the target milestone?"
                                                errortext={touched.milestones && touched.milestones[index]?.targetMilestone ? errors.milestones  && errors.milestones[index]?.targetMilestone : ""}
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-md-12">
                                              <p className="pt-4 m-0 durationfont">
                                                <b>What is the duration to achieve this?</b>
                                              </p>
                                            </div>
                                            <div className="col-md-9 pr-0">
                                              <Field
                                                name={`milestones[${index}].duration`}
                                                component={Input}
                                                type="number"
                                                placeholder=""
                                              />
                                            </div>
                                            <div className="col-md-3 pl-0">
                                              <Field
                                                name={`milestones[${index}].durationIn`}
                                                placeholder="Months"
                                                component={SelectBox}
                                                options={Duration}
                                              />
                                            </div>
                                          </div>
                                          <br/>
                                          <div className="col-md-12 p-0">
                                            <Field
                                              name={`milestones[${index}].keyActivities`}
                                              component={Input}
                                              placeholder="What are the key activities?"
                                              errortext={touched.milestones && touched.milestones[index]?.keyActivities ? errors.milestones  && errors.milestones[index]?.keyActivities : ""}
                                            />
                                          </div>
                                        </div>
                                      </Timeline.Item>
                                    );
                                  })}
                                </Timeline>
                                <div className="row pl-4">
                                  <div className="col-md-12">
                                    <Button
                                      type="dashed"
                                      className="text-left"
                                      block
                                      icon={<PlusOutlined/>}
                                      onClick={() =>
                                        arrayHelpers.push({
                                          targetMilestone: "",
                                          keyActivities: "",
                                          duration: "",
                                          durationIn: "",
                                        })
                                      }
                                    >
                                      Add more milestones
                                    </Button>
                                  </div>
                                </div>
                              </>
                            )}
                          />
                        </Col>
                      </Row>
                      <div className="col-md-8">
                        <div className="row paddingRight">
                          <div className="col-md-7">
                            <div className="steps-actions floatRight displayFlex previous">
                              <Button className="ant-btn-back" onClick={() => backClick()}>
                                <FontAwesomeIcon icon={faAngleLeft}/>
                                &nbsp; Previous Step
                              </Button>
                            </div>
                          </div>
                          <div className="col-md-5 floatRight displayFlex">
                            <Button
                              onClick={submitForm}
                              className="steps-action formStyles nextbutton"
                              disabled={
                                !!(
                                  errors.milestones
                                )
                              }
                            >
                              NEXT: DONOR
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

const getInitialValues = (programId, initialState, budgetTypes) => {
  return {
    projectId: programId ? programId : "",
    id: initialState ? initialState.id : "",
    totalBudget: initialState ? parseInt(initialState.totalBudget) : undefined,
    budgetBreakDowns: initialState ? initialState.budgetBreakDowns : getInitialBreakdowns(budgetTypes),
    milestones: initialState
      ? initialState.milestones
      : [
        {
          targetMilestone: "",
          keyActivities: "",
          duration: "",
          durationIn: "",
        },
      ],
    costComments: initialState
      ? initialState.costComments
      : [
        {
          comment: "",
        },
      ],
  };
};

const getInitialBreakdowns = (budgetTypes) => {
  const returnArr = [];
  budgetTypes.forEach((item) => {
    returnArr.push({
      title: item,
      percentage: undefined,
      amount: undefined,
      detailedBreakDowns: [
        {
          title: "",
          amount: undefined,
        },
      ],
    });
  });
  return returnArr;
};

export default BudgetDetails;
