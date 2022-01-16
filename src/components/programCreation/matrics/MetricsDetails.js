import { Button, Col, notification, Row } from "antd";
import React, { Component, useEffect, useState } from "react";
import MetricsCard from "./MetricsCard";
import "./metrics.scss";
import { Form, Formik } from "formik";
import ProgramcreationAPI from "../../../api/programcreationAPI";
import { useHistory, useParams } from "react-router-dom";
import appRoutes from "../../../constants/app-routes";
import UNSGDs from "./UNSGDs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const MetricsDetails = () => {
  const { programId } = useParams();
  const [initialState, setInitialState] = useState("");
  const history = useHistory();
  const previewOnlyUrls = ["preview-project", "detailview", "validator/proposals/"];
  const previewOnly = previewOnlyUrls.some((url) => history.location.pathname.includes(url));

  const fetchMetricsData = async () => {
    if (programId) {
      const response = await ProgramcreationAPI().fetchImpactDetails(programId);
      if (response.data) {
        setInitialState(response.data);
      }
    }
  };
  useEffect(() => {
    fetchMetricsData();
  }, []);

  const backClick = () => {
    history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_TEAM}/${programId}`);
  };

  const generateFormData = (values) => {
    const formData = {
      projectId: programId,
      metrics: [],
    };
    Object.keys(values).forEach((type) => {
      if (type === "primary" || type === "secondary1" || type === "secondary2") {
        values[type] &&
          values[type].impactPriorities.forEach((priority) => {
            if (priority.strategicGoals.length) {
              priority.strategicGoals.forEach((goal) => {
                if (goal.keyIndicators.length) {
                  goal.keyIndicators.forEach((indicator) => {
                    formData.metrics.push({
                      categoryRefId: values[type].categoryRefId,
                      priorityRefId: priority.priorityRefId,
                      strategicGoalId: goal.strategicGoalId,
                      strategicGoalRefId: goal.strategicGoalRefId,
                      keyIndicatorId: indicator.keyIndicatorId,
                      scaleValue: indicator.scale,
                      depthValue: indicator.depth,
                    });
                  });
                }
              });
            }
          });
      }
    });
    return formData;
  };

  const saveImpactDetails = async (values) => {
    const formData = generateFormData(values);
    console.log(values);
    const response = await ProgramcreationAPI().saveImpactDetails(formData);
    if (response.data) {
      notification.success({ message: "Metrics Details Saved..!" });
      history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_BUDGET}/${programId}`);
    }
  };
  return (
    <Row justify="center">
      <Col xs={24} lg={24}>
        <div className="matrics-form-container">
          <Formik
            initialValues={getInitialValues(initialState)}
            enableReinitialize={true}
            onSubmit={(values) => {
              saveImpactDetails(values);
            }}
          >
            {({ values, touched, errors, setFieldValue }) => {
              return (
                <Form>
                  <Row gutter={[100, 16]} justify="end">
                    <Col xs={24} lg={previewOnly ? 24 : 14}>
                      <div className="">
                        <p className="category-type">Primary</p>
                        <MetricsCard
                          type={"primary"}
                          categoryItem={values.primary}
                          fetchMetricsData={fetchMetricsData}
                        />
                      </div>
                      {values.secondary1 && (
                        <div className="">
                          <p className="category-type">Secondary</p>
                          <MetricsCard
                            type={"secondary1"}
                            categoryItem={values.secondary1}
                            fetchMetricsData={fetchMetricsData}
                          />
                          {values.secondary2 && (
                            <MetricsCard
                              type={"secondary2"}
                              categoryItem={values.secondary2}
                              fetchMetricsData={fetchMetricsData}
                            />
                          )}
                        </div>
                      )}
                    </Col>
                    {!previewOnly && (
                      <Col xs={24} lg={8} className="curved-right-section">
                        {values.primary.categoryId && (
                          <UNSGDs
                            primaryCategoryId={values.primary?.categoryId}
                            secondaryCategory1Id={values?.secondary1?.categoryId || ""}
                            secondaryCategory2Id={values?.secondary2?.categoryId || ""}
                          />
                        )}
                      </Col>
                    )}
                  </Row>
                  {!previewOnly && (
                    <div className="col-md-8">
                      <div className="floatRight displayFlex formStyles" style={{ marginBottom: "1rem" }}>
                        <Button htmlType="submit" className="steps-action  formStyles nextbutton">
                          NEXT: BUDGET
                        </Button>
                      </div>
                      <div className="steps-actions floatRight displayFlex previous" style={{ marginBottom: "1rem" }}>
                        <Button className="ant-btn-back" onClick={() => backClick()}>
                          <FontAwesomeIcon icon={faAngleLeft} />
                          &nbsp; Previous Step
                        </Button>
                      </div>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
      </Col>
    </Row>
  );
};

export default MetricsDetails;

const getInitialValues = (initialState) => {
  if (initialState) return initialState;
  else {
    return {
      primary: {
        categoryId: "",
        categoryName: "",
        categoryRefId: "",
        categoryIcon: "",
        impactPriorities: [],
      },
      secondary1: {
        categoryId: "",
        categoryName: "",
        categoryRefId: "",
        categoryIcon: "",
        impactPriorities: [],
      },
      secondary2: {
        categoryId: "",
        categoryName: "",
        categoryRefId: "",
        categoryIcon: "",
        impactPriorities: [],
      },
    };
  }
};
