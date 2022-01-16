import { SettingFilled } from "@ant-design/icons";
import { Button, Col, Collapse, Row } from "antd";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { projectIdorName } from "../../api/config";
import "../../assets/css/pages.css";
import umeedLogo from "../../assets/images/umeedLogo2.png";
// import circle from "../../assets/images/circle1.png";
import appRoutes from "../../constants/app-routes";
import { PROJECT, ROLES } from "../../constants/strings";
import { fetchUserData } from "../../redux/user/userActions";
import { removeEmptyOrNull, trasformToValueAndLabel } from "../../utils/utils";
import DatePicker from "../FormikComponents/Date/Date";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import BeneficiaryHomeHW from "./BeneficiaryHomeHW";
import ProgramSettingsModal from "./ProgramSettingsModal";

const BeneficaryHome = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const [showSettings, setShowSettings] = useState(false);
  const { projects } = userDetails;
  const [rationCenters, setRationCenters] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchUserData());
    };
    fetchData();
  }, []);

  const fetchRationCenters = async (projectId) => {
    const response = await beneficiaryAPI().getVaccinationCenters(projectId, "");
    if (response.data) {
      setRationCenters(trasformToValueAndLabel(response.data, "title"));
    }
  };

  return projects
    ? projects.map((project, index) => {
        return (
          <div className="container p-lg-5" key={index}>
            <div className="row justify-content-center py-3">
              <div className="col-12">{index === 0 && <h3 className="text-center">Ongoing Program</h3>}</div>
            </div>
            <div className="row justify-content-center p-2">
              <div className="col-12 col-md-8 col-lg-8 banner-section-addbenif">
                <div className="row program-card-title p-3 p-lg-5 position-relative">
                  {projectIdorName("", project.id) === PROJECT.ARPAN && (
                    <div className="position-absolute settings-icon" onClick={() => setShowSettings(true)}>
                      <SettingFilled />
                    </div>
                  )}

                  <div className="col-4 col-lg-3">
                    <img src={umeedLogo} />
                    {/* <img src={circle} /> */}
                  </div>
                  <div className="col-8 col-lg-9 pl-2" style={{ margin: "auto 0px" }}>
                    <div className="pad-left">
                      <h3>{project.project}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-12 p-5">
                  <div className="row justify-content-center">
                    {userDetails.userRole === ROLES.HEALTH_WORKER ? (
                      <BeneficiaryHomeHW projectId={project.id} />
                    ) : (
                      <>
                        <p className="m-0 pb-3">Add beneficiary to start their COVID-19 vaccination process</p>

                        <div className="col-12 col-lg-6 mt-4">
                          <button
                            className="formsubmit"
                            onClick={() =>
                              history.push(
                                `${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_ID_PROOF}?projectId=${project.id}`
                              )
                            }
                          >
                            ADD BENEFICIARIES
                          </button>
                        </div>
                        <div className="col-12 col-lg-6 mt-4">
                          <button
                            className="formsubmit"
                            onClick={() =>
                              history.push(
                                `${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_LIST}?projectId=${project.id}`
                              )
                            }
                          >
                            BENEFICIARIES LIST
                          </button>
                        </div>
                        <div className="col-12 py-3">
                          <Collapse
                            defaultActiveKey={[]}
                            onChange={() => {
                              if (projectIdorName("", project.id) === PROJECT.ARPAN) fetchRationCenters(project.id);
                            }}
                          >
                            <Collapse.Panel header="Or search an existing beneficiary" key="1">
                              <Formik
                                initialValues={{
                                  mobile: "",
                                  firstname: "",
                                  village: "",
                                  scheduledDate: "",
                                  postalCode: "",
                                  centerId: "",
                                }}
                                onSubmit={(values) => {
                                  if (values.scheduledDate)
                                    values["scheduledDate"] = moment(values.scheduledDate).format("YYYY-MM-DD");
                                  const filter = new URLSearchParams(removeEmptyOrNull(values)).toString();
                                  if (filter)
                                    history.push(
                                      `${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_LIST}?projectId=${project.id}&${filter}`
                                    );
                                }}
                              >
                                {({ values, touched, errors, setFieldValue }) => {
                                  return (
                                    <Form>
                                      <Row gutter={[16]} justify="center">
                                        <Col xs={24}>
                                          <Field name="mobile" component={Input} placeholder="Mobile" />
                                        </Col>
                                        <Col xs={24}>
                                          <Field
                                            visible={projectIdorName("", project.id) === PROJECT.ARPAN}
                                            name="firstname"
                                            component={Input}
                                            placeholder="First Name"
                                          />
                                        </Col>
                                        <Col xs={24} lg={12}>
                                          <Field
                                            visible={projectIdorName("", project.id) === PROJECT.ARPAN}
                                            name="village"
                                            component={Input}
                                            placeholder="Village"
                                          />
                                        </Col>
                                        <Col xs={24} lg={12}>
                                          <Field
                                            visible={projectIdorName("", project.id) === PROJECT.ARPAN}
                                            name="scheduledDate"
                                            component={DatePicker}
                                            format="DD/MM/YYYY"
                                            placeholder="Date"
                                          />
                                        </Col>
                                        <Col xs={24} lg={12}>
                                          <Field
                                            visible={projectIdorName("", project.id) === PROJECT.ARPAN}
                                            name="postalCode"
                                            component={Input}
                                            placeholder="Pin Code"
                                          />
                                        </Col>
                                        <Col xs={24} lg={12}>
                                          <Field
                                            visible={projectIdorName("", project.id) === PROJECT.ARPAN}
                                            name="centerId"
                                            component={SelectBox}
                                            placeholder="Ration Center"
                                            options={rationCenters || []}
                                          />
                                        </Col>
                                        <Col xs={12}>
                                          <Button type="primary" htmlType="submit" className="w-100">
                                            Search
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </Collapse.Panel>
                          </Collapse>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showSettings && <ProgramSettingsModal open={showSettings} setOpen={setShowSettings} />}
          </div>
        );
      })
    : null;
};

export default BeneficaryHome;
