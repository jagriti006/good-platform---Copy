import { Button, Col, message, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { Field, Form, Formik } from "formik";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import DatePicker from "../FormikComponents/Date/Date";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import appRoutes from "../../constants/app-routes";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { first, last } from "lodash";
import { appConfigurations, MAX_VACCINATION_COUNT } from "../../utils/constants";
import { projectIdorName } from "../../api/config";
import { PROJECT } from "../../constants/strings";
import { useQuery } from "../../utils/utils";
const { Title } = Typography;

const BeneficiaryScheduleAppointment = () => {
  const history = useHistory();
  let { beneficiaryId } = useParams();
  const projectId = useQuery().get("projectId");
  const projectName = projectIdorName("", projectId);
  const [vaccinationCenters, setVaccinationCenters] = useState(null);
  const [timeSlots, setTimeSlots] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [vaccinationHistory, setVaccinationHistory] = useState();
  const [serverTime, setServerTime] = useState();

  useEffect(() => {
    if (!beneficiaryId) {
      history.push(`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_LIST}`);
      message.error(appConfigurations.general_error_message);
    }
  }, [beneficiaryId]);

  useEffect(() => {
    const fetchData = async () => {
      const appointmentUrl = projectName === PROJECT.UMEEED ? "vaccination/details" : "beneficiary/ration/schedule";
      const [response, timeSlotDetails, appointmentDetails, vaccineDetails, historyDetails, serverTimeData] =
        await Promise.all([
          beneficiaryAPI().getVaccinationCenters(projectId),
          beneficiaryAPI().getBeneficiaryTimeSlots(),
          beneficiaryAPI().getVaccinationAppointmentDetails(beneficiaryId, appointmentUrl),
          beneficiaryAPI().fetchVccines(),
          beneficiaryAPI().fetchVaccinationHistory(beneficiaryId),
          beneficiaryAPI().getServerTime(),
        ]);

      setVaccinationCenters(response.data);
      setTimeSlots(timeSlotDetails.data);
      setVaccines(
        vaccineDetails?.data?.map((item) => {
          return { value: item, label: item };
        })
      );
      setVaccinationHistory(historyDetails.data);
      if (projectName === PROJECT.UMEEED) {
        setAppointmentDetails(appointmentDetails?.data?.appointments || []);
        setServerTime(serverTimeData.data);
      }
      if (projectName === PROJECT.ARPAN) {
        setAppointmentDetails(appointmentDetails?.data);
      }
    };
    fetchData();
  }, []);

  const handleVaccinationDetailsSubmission = async (values) => {
    if (values.dose === 2) {
      if (moment(vaccinationHistory?.dose1Date).format("YYYY-MM-DD") === moment(serverTime).format("YYYY-MM-DD")) {
        notification.error({
          message: "Vaccination cannot be scheduled since the beneficiary got vaccinated first dose today",
        });
        return;
      }
    }
    const concentDetails = {
      consentDate: values.appointmentDate.format("YYYY-MM-DD"),
      location: values.appointmentLocation,
      beneficiaryId: beneficiaryId,
      dose: values.dose,
      timeslotId: values.timeslotId,
    };
    const newValues = {
      ...values,
      vaccinatedTimeStamp: null,
      appointmentDate: moment(values.appointmentDate).format("YYYY-MM-DD"),
      beneficiaryId: beneficiaryId,
      consent: concentDetails,
    };
    delete newValues.appointmentLocation;
    const response = await beneficiaryAPI().scheduleAppointment(newValues, "vaccination/appointments");
    if (response?.success) {
      message.success(response.message);
      history.push(`${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_DETAILS}/${beneficiaryId}?projectId=${projectId}`);
    }
  };

  const handleRationSchedule = async (values) => {
    const newValues = {
      ...values,
      scheduledDate: moment(values.scheduledDate).format("YYYY-MM-DD"),
    };
    const response = await beneficiaryAPI().scheduleAppointment(newValues, "beneficiary/ration/schedule");
    if (response?.success) {
      message.success(response.message);
      history.push(`${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_DETAILS}/${beneficiaryId}?projectId=${projectId}`);
    }
  };

  const getInitialValues = () => {
    if (projectName === PROJECT.UMEEED) {
      const defaultValues = {
        vaccinationCenterId: first(vaccinationCenters)?.id || null,
        dose: vaccinationHistory?.doses?.length === MAX_VACCINATION_COUNT ? undefined : getDoseOptions()[0]?.value,
        appointmentDate: moment(),
        timeslotId: 1,
        appointmentLocation: "Mumbai",
        vaccineName: vaccinationHistory?.vaccine || "",
      };
      if (appointmentDetails.length > 0) {
        const lastItem = last(appointmentDetails);
        if (lastItem.status === "SCHEDULED" || lastItem.status === "PENDING") {
          return {
            id: lastItem?.id,
            vaccinationCenterId: vaccinationCenters.find((item) => item.id == lastItem?.vaccinationCenterId)?.id || "",
            dose: lastItem?.dose,
            appointmentDate: moment(lastItem.appointmentDate),
            timeslotId: lastItem?.timeslotId,
            appointmentLocation: lastItem?.consent?.location || "",
            vaccineName: vaccinationHistory?.vaccine || "",
            status: lastItem?.status || "",
          };
        } else return defaultValues;
      }
      return defaultValues;
    } else if (projectName === PROJECT.ARPAN) {
      const defaultValues = {
        scheduledDate: moment(),
        status: "SCHEDULED",
        centerId: vaccinationCenters ? first(vaccinationCenters).id : "",
        beneficiaryId: beneficiaryId,
        distributedDate: null,
      };
      if (appointmentDetails.length > 0) {
        const lastItem = last(appointmentDetails);
        if (lastItem.status === "SCHEDULED" || lastItem.status === "PENDING") {
          return {
            id: lastItem?.id,
            scheduledDate: moment(lastItem.scheduledDate),
            status: lastItem.status,
            centerId: lastItem.centerId,
            beneficiaryId: lastItem.beneficiaryId,
            distributedDate: lastItem.distributedDate,
          };
        } else return defaultValues;
      }
      return defaultValues;
    }
  };

  const getDoseOptions = () => {
    const dose = [];
    if (vaccinationHistory?.doses?.length === MAX_VACCINATION_COUNT) {
      return [];
    } else if (vaccinationHistory?.doses?.length === 0) {
      dose.push({ label: "First Dose", value: "1" });
      dose.push({ label: "Second Dose", value: "2" });
    } else if (vaccinationHistory?.doses?.includes("Dose-1")) {
      return [{ label: "Second Dose", value: "2" }];
    }

    return dose;
  };

  return (
    <Row justify="center" className="pt-5">
      {timeSlots && appointmentDetails && (
        <Col xs={20} md={16} lg={12}>
          <Title level={4}>
            {projectName === PROJECT.UMEEED ? "Vaccination " : "Ration Distribution "}
            Appointment
          </Title>
          <Formik
            initialValues={getInitialValues()}
            onSubmit={(values) => {
              if (projectName === PROJECT.UMEEED) handleVaccinationDetailsSubmission(values);
              else if (projectName === PROJECT.ARPAN) {
                handleRationSchedule(values);
              }
            }}
            enableReinitialize={true}
          >
            {({ values, submitForm }) => {
              return (
                <Form className="beneficiaryForms">
                  <Row gutter={[16, 8]}>
                    {vaccinationHistory?.doses?.length === MAX_VACCINATION_COUNT && projectName === PROJECT.UMEEED ? (
                      <Col span={24}>
                        <Typography.Text>This beneficiary already took 2 doses of Vaccine</Typography.Text>
                      </Col>
                    ) : (
                      <>
                        <Col span={24}>
                          <Field
                            name={projectName === PROJECT.UMEEED ? "vaccinationCenterId" : "centerId"}
                            component={SelectBox}
                            optionLabel="title"
                            valueLabel="id"
                            options={vaccinationCenters}
                            placeholder="Center"
                          />
                        </Col>
                        <Col span={24}>
                          <Field
                            visible={projectName === PROJECT.UMEEED}
                            name={projectName === PROJECT.UMEEED ? "vaccineName" : ""}
                            component={SelectBox}
                            options={vaccines}
                            placeholder="Vaccine"
                          />
                        </Col>
                        <Col span={24}>
                          <Field
                            visible={projectName === PROJECT.UMEEED}
                            name="dose"
                            placeholder="Dose"
                            component={SelectBox}
                            options={getDoseOptions()}
                          />
                        </Col>

                        <Col span={24}>
                          <Field
                            name={projectName === PROJECT.UMEEED ? "appointmentDate" : "scheduledDate"}
                            placeholder="Date"
                            component={DatePicker}
                          />
                        </Col>
                        <Col span={24}>
                          <Field
                            visible={projectName === PROJECT.UMEEED}
                            name="timeslotId"
                            component={SelectBox}
                            options={timeSlots}
                            valueLabel="id"
                            optionLabel="timeSlot"
                            placeholder="Time Slot"
                          />
                        </Col>
                        <Col span={24}>
                          <Field
                            visible={projectName === PROJECT.UMEEED}
                            name="appointmentLocation"
                            placeholder="Location"
                            component={Input}
                          />
                        </Col>
                      </>
                    )}

                    <Col span={24}>
                      <Row justify="center">
                        {appointmentDetails.length === 0 ||
                        (last(appointmentDetails).status !== "SCHEDULED" &&
                          last(appointmentDetails).status !== "PENDING") ? (
                          <>
                            {projectName === PROJECT.UMEEED ? (
                              vaccinationHistory?.doses?.length !== MAX_VACCINATION_COUNT && (
                                <Col span={8}>
                                  <Button htmlType="button" type="primary" onClick={submitForm}>
                                    Book Appointment
                                  </Button>
                                </Col>
                              )
                            ) : (
                              <Col span={8}>
                                <Button htmlType="button" type="primary" onClick={submitForm}>
                                  Book Appointment
                                </Button>
                              </Col>
                            )}
                          </>
                        ) : /* <Col span={8}>
                            <Button
                              htmlType="button"
                              type="primary"
                              onClick={() => updateAppointment(values)}
                            >
                              Update Appointment
                            </Button>
                          </Col> */
                        null}

                        {appointmentDetails.length > 0 && (
                          <Col span={8}>
                            <Button
                              htmlType="button"
                              type="primary"
                              onClick={() => {
                                history.push(
                                  `${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_DETAILS}/${beneficiaryId}?projectId=${projectId}`
                                );
                              }}
                            >
                              View All Appointments
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Col>
      )}
    </Row>
  );
};

export default BeneficiaryScheduleAppointment;
