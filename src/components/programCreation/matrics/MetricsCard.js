import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Divider, notification, Popconfirm, Row } from "antd";
import { Collapse, Button } from "antd";
import { Field, FieldArray } from "formik";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import ProgramcreationAPI from "../../../api/programcreationAPI";
import { METRICS } from "../../../constants/strings";
import { trasformToValueAndLabel } from "../../../utils/utils";
import Input from "../../FormikComponents/Input/Input";
import SelectBox from "../../FormikComponents/SelectBox/SelectBox";
import CategoryModal from "./ImpactPriorityModal";

const MatricsCard = ({ type, categoryItem, fetchMetricsData }) => {
  const [modalStep, setModalStep] = useState("");
  const [indicators, setIndicators] = useState("");
  const history = useHistory();
  const previewOnlyUrls = ["preview-project", "detailview", "validator/proposals/"];
  const previewOnly = previewOnlyUrls.some((url) => history.location.pathname.includes(url));

  const fetchKeyIndicators = async (strategicGoalId) => {
    const response = await ProgramcreationAPI().fetchKeyIndicators(strategicGoalId);
    if (response.data[0]) {
      setIndicators({
        ...indicators,
        [strategicGoalId]: trasformToValueAndLabel(response.data[0].keyIndicators, "keyIndicatorString"),
      });
    }
  };

  const deletePriority = async (impactPriorityRefId) => {
    const deletePrio = await ProgramcreationAPI().deleteImpactPriority(impactPriorityRefId);
    if (deletePrio.success) {
      notification.success({ message: "Deleted" });
    }
  };

  const deletePriorityGoal = async (golRefId) => {
    const deleteGoal = await ProgramcreationAPI().deletePriorityGoal(golRefId);
    if (deleteGoal.success) {
      notification.success({ message: "Deleted" });
    }
  };

  return (
    <FieldArray
      name={`${type}.impactPriorities`}
      render={(categoryHelper) => (
        <>
          <div className="d-flex justify-content-between p-3 ">
            <div>
              <span className="goal-title">Impact Category : </span>
              <span>{categoryItem?.categoryName}</span>
            </div>
            {!previewOnly && (
              <div className="d-flex">
                <div
                  onClick={() =>
                    setModalStep({ view: METRICS.CATEGORY, categoryItem, operation: METRICS.CHANGE_CATGORY })
                  }
                >
                  <EditOutlined className="edit-icon mr-2" />
                </div>
                <Button
                  onClick={() =>
                    setModalStep({ view: METRICS.PRIORITY, categoryItem, operation: METRICS.CHANGE_PRIORITY })
                  }
                  size="small"
                  icon={<PlusOutlined />}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  Impact Priority
                </Button>
              </div>
            )}
          </div>
          {categoryItem?.impactPriorities &&
            categoryItem.impactPriorities.map((priority, priorityIndex) => {
              return (
                <Row className="matrics-card my-3" key={priorityIndex}>
                  <Col xs={24} className="card-title p-3">
                    <div className="d-flex justify-content-between  py-2">
                      <div>
                        <span className="goal-title">Impact Priority : </span>
                        <span>{priority.priorityName}</span>
                      </div>
                      {!previewOnly && (
                        <div className="d-flex">
                          <Popconfirm
                            placement="top"
                            title={"Are you sure to delete this Priority ?"}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              if (categoryItem.impactPriorities.length > 1) {
                                deletePriority(priority.priorityRefId);
                                categoryHelper.remove(priorityIndex);
                              }
                            }}
                          >
                            <DeleteOutlined className="edit-icon mr-2" />
                          </Popconfirm>
                          <Button
                            onClick={() =>
                              setModalStep({
                                view: METRICS.STRATEGIC_GOALS,
                                categoryItem,
                                priorityId: priority.priorityId,
                                priorityRefId: priority.priorityRefId,
                                operation: METRICS.CHANGE_GOALS,
                              })
                            }
                            size="small"
                            icon={<PlusOutlined />}
                            style={{ display: "inline-flex", alignItems: "center" }}
                          >
                            Strategic Goal
                          </Button>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} className="strategic-goal-collapse">
                    <FieldArray
                      name={`${type}.impactPriorities[${priorityIndex}].strategicGoals`}
                      render={(goalHelpers) => (
                        <>
                          {categoryItem.impactPriorities[priorityIndex].strategicGoals.map((goal, goalIndex) => {
                            return (
                              <Fragment key={goalIndex}>
                                <div className="px-3 py-2 goal-title d-flex justify-content-between">
                                  <div>{`Strategic Goal ${goalIndex + 1}`}</div>
                                  {!previewOnly && (
                                    <Popconfirm
                                      placement="top"
                                      title={"Are you sure to delete this Strategic Goal ?"}
                                      okText="Yes"
                                      cancelText="No"
                                      onConfirm={() => {
                                        if (categoryItem.impactPriorities[priorityIndex].strategicGoals.length > 1) {
                                          deletePriorityGoal(goal.strategicGoalRefId);
                                          goalHelpers.remove(goalIndex);
                                        }
                                      }}
                                    >
                                      <DeleteOutlined className="edit-icon" />
                                    </Popconfirm>
                                  )}
                                </div>
                                <Collapse
                                  expandIconPosition={"right"}
                                  onChange={async () => {
                                    await fetchKeyIndicators(goal.strategicGoalId);
                                  }}
                                >
                                  <Collapse.Panel header={goal.strategicGoalName}>
                                    <div className="goal-description">
                                      This Core Metrics Set is used to measure increased youth employment, a common
                                      outcome sought for investments with the goal to improve the successful transition
                                      of youth into the workforce.
                                    </div>

                                  {!previewOnly && <div className="py-2 goal-title">Add your key indicators:</div>}
                                  <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                      <Row justify="center">
                                        <Col xs={previewOnly ? 16 : 12}>Indicator</Col>
                                        <Col xs={4}>Scale</Col>
                                        <Col xs={4}>Depth</Col>
                                      </Row>
                                    </Col>
                                    <Col xs={24}>
                                      <Row justify="center" align="middle" gutter={[8, 8]}>
                                        <FieldArray
                                          name={`${type}.impactPriorities[${priorityIndex}].strategicGoals[${goalIndex}].keyIndicators`}
                                          render={(arrayHelpers) => (
                                            <>
                                              {categoryItem.impactPriorities[priorityIndex].strategicGoals[
                                                goalIndex
                                                ].keyIndicators.map((friend, index) => {
                                                return (
                                                  <Fragment key={index}>
                                                    <Col xs={previewOnly ? 16 : 12}>
                                                      <Field
                                                        name={`${type}.impactPriorities[${priorityIndex}].strategicGoals[${goalIndex}].keyIndicators[${index}].keyIndicatorId`}
                                                        component={SelectBox}
                                                        placeholder=""
                                                        options={indicators[`${goal.strategicGoalId}`] || []}
                                                        name={`${type}.impactPriorities[${priorityIndex}].strategicGoals[${goalIndex}].keyIndicators[${index}].keyIndicatorId`}
                                                        value={
                                                          Number(
                                                            categoryItem[`impactPriorities`][`${priorityIndex}`][
                                                              "strategicGoals"
                                                              ][`${goalIndex}`]["keyIndicators"][`${index}`][
                                                              "keyIndicatorId"
                                                              ]
                                                          ) || ""
                                                        }
                                                      />
                                                    </Col>
                                                    <Col xs={4}>
                                                      <Field
                                                        name={`${type}.impactPriorities[${priorityIndex}].strategicGoals[${goalIndex}].keyIndicators[${index}].scale`}
                                                        component={Input}
                                                        type="number"
                                                        placeholder=""
                                                      />
                                                    </Col>
                                                    <Col xs={4}>
                                                      <Field
                                                        name={`${type}.impactPriorities[${priorityIndex}].strategicGoals[${goalIndex}].keyIndicators[${index}].depth`}
                                                        component={Input}
                                                        type="number"
                                                        placeholder=""
                                                      />
                                                    </Col>
                                                    {!previewOnly && (
                                                      <Col xs={4}>
                                                        <Button onClick={() => arrayHelpers.remove(index)}>
                                                          Delete
                                                        </Button>
                                                      </Col>
                                                    )}
                                                  </Fragment>
                                                );
                                              })}
                                              {!previewOnly && (
                                                <Col xs={24}>
                                                  <Button
                                                    type="dashed"
                                                    block
                                                    icon={<PlusOutlined/>}
                                                    onClick={() =>
                                                      arrayHelpers.push({
                                                        keyIndicatorId: "",
                                                        scale: "",
                                                        depth: "",
                                                      })
                                                    }
                                                  >
                                                    Add more indicators
                                                  </Button>
                                                </Col>
                                              )}
                                            </>
                                          )}
                                        />
                                      </Row>
                                    </Col>
                                  </Row>
                                </Collapse.Panel>
                              </Collapse>
                              <Divider className="m-0"/>
                            </Fragment>
                          );
                        })}
                      </>
                    )}
                  />
                </Col>
              </Row>
            );
          })}
          {modalStep.view && (
            <CategoryModal step={modalStep} setStep={setModalStep} fetchMetricsData={fetchMetricsData} />
          )}
        </>
      )}
    />
  );
};

export default MatricsCard;
