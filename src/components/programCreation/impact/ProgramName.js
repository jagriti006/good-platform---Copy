import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProgramcreationAPI from "../../../api/programcreationAPI";
import appRoutes from "../../../constants/app-routes";
import Icon from "../../common/Icon";
import Input from "../../FormikComponents/Input/Input";
import InputFile from "../../FormikComponents/InputFile/InputFile";
import TitleSection from "../common/TitleSection";

const ProgramName = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const impactCategories = useSelector(
    (state) => state.program.impactCategories
  );
  const impactPriorities = useSelector(
    (state) => state.program.impactPriorities
  );
  const starategicGoals = useSelector((state) => state.program.starategicGoals);

  const setImageUrl = async (file, field, setFieldValue) => {
    const response = await ProgramcreationAPI().uplaodImageAndGetURL(file);
    if (response.data) setFieldValue(field, response.data);
  };

  const getPayload = (values) => {
    const payload = {
      projectCategories: [],
      programName: values.name,
      logoUrl: values.logoUrl,
      organisationId: sessionStorage.organisationId,
    };

    const getStrategicGoals = (priorityId) => {
      const strategicGoalsArr = [];
      Object.keys(starategicGoals).forEach((item) => {
        if (priorityId === item) {
          starategicGoals[priorityId].forEach((goal) => {
            strategicGoalsArr.push({
              strategicGoalId: goal.impactStrategicGoalId,
            });
          });
        }
      });
      return strategicGoalsArr;
    };
    const getProperties = (priorityIndex) => {
      const projectPriorities = [];
      Object.keys(impactPriorities).forEach((priority) => {
        if (Number(priority) === Number(priorityIndex)) {
          impactPriorities[`${priorityIndex}`].forEach((item) => {
            projectPriorities.push({
              priorityId: item.impactPriorityId,
              strategicGoals: getStrategicGoals(item.impactPriorityId),
            });
          });
        }
      });
      return projectPriorities;
    };
    impactCategories.forEach((category) => {
      payload.projectCategories.push({
        categoryId: category.id,
        categoryType: category.priorityIndex === 1 ? "PRIMARY" : "SECONDARY",
        projectPriorities: getProperties(category.priorityIndex),
      });
    });
    return payload;
  };
  return (
    <div className="impact-category">
      <Row justify="center" className="py-2 py-lg-5 header-area">
        <Col xs={16}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col lg={16} xs={24}>
              <TitleSection
                step={"STEP 4 OF 4"}
                title={"Let’s begin with a great name!"}
                description={"Every great initiative starts with a great name"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Formik
        initialValues={{ programName: "" }}
        onSubmit={async (values) => {
          const response = await ProgramcreationAPI().createProgram(
            getPayload(values)
          );
          if (response.data){
            sessionStorage.setItem('projectId',response.data.projectId);
            history.push(
              // `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_BASIC}/${response.data.projectId}`
              `/ProgramOverviewMain`

            );
          }
        }}
      >
        {({ values, touched, errors, setFieldValue, isValid, submitCount }) => {
          return (
            <Form>
              <Row justify="center" className="category-list-row py-5">
                <Col xs={24} lg={16}>
                  <Row gutter={[16, 16]} justify="space-between">
                    <Col xs={24} lg={16}>
                      <>
                        <Row gutter={[16, 8]}>
                          <Col xs={24}>
                            <Field
                              name="name"
                              component={Input}
                              placeholder="Program Name"
                              errortext={
                                touched.programName ? errors.programName : ""
                              }
                            />
                          </Col>
                          <Col xs={24} className="upload-button">
                            <Field
                              name="logoUrl"
                              component={InputFile}
                              label="Upload Logo (png, jpeg)"
                              beforeUpload={(file) => {
                                setImageUrl(file, "logoUrl", setFieldValue);
                                return false;
                              }}
                            />
                            {values.logoUrl && (
                              <img
                                src={values.logoUrl}
                                alt="logo url"
                                style={{
                                  height: 200,
                                  width: "100%",
                                  objectFit: "cover",
                                  padding: "1rem",
                                }}
                              />
                            )}
                          </Col>
                          <br/><br/>
                          <Col xs={24} lg={24}>
                  <div className="formStyles d-flex pt-4">
                    <Button
                      className="ant-btn-back"
                      onClick={() =>
                        history.push(
                          `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_STRATEGIC_GOALS}`
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                      &nbsp; Previous Step
                    </Button>
                    <Button htmlType="submit" type="primary" >
                      CREATE PROGRAM
                    </Button>
                  </div>
                </Col>
                        </Row>
                      </>
                    </Col>
                    <Col xs={24} lg={8} className="d-flex justify-content-end">
                      <Icon name="/program-creation/program-name" />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[16, 16]} justify="center" className="px-5">
                
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProgramName;
