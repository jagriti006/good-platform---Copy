import React from "react";
import { Button, Col, Row, Typography, Collapse, message, Card, notification } from "antd";
import { Modal } from "antd";
import { isArray, isEmpty, values } from "lodash";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import appRoutes from "../../constants/app-routes";
import { appConfigurations } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useQuery } from "../../utils/utils";
import { PROJECT } from "../../constants/strings";
import { projectIdorName } from "../../api/config";

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const noDataMessage = "No Data";

const BeneficiaryVaccineAppointmentDetails = () => {
  const [beneficiaryDetails, setBeneficiaryDetails] = useState();
  const [timeSlots, setTimeSlots] = useState(null);
  const [vaccinationCenters, setVaccinationCenters] = useState("");
  const { beneficiaryId } = useParams();
  const projectId = useQuery().get("projectId");
  const projectName = projectIdorName("", projectId);
  const history = useHistory();
  const steps = useSelector((state) => state.ui.beneficiarySteps);
  const [serverTime, setServerTime] = useState();
  const appointmentUrl = projectName === PROJECT.UMEEED ? "vaccination/details" : "beneficiary/ration/schedule";

  useEffect(() => {
    // dont allow access to this page with out beneficiary id
    if (!beneficiaryId) {
      history.push(`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_LIST}`);
      message.error(appConfigurations.general_error_message);
    }
  }, [beneficiaryId]);

  useEffect(() => {
    const fetchData = async () => {
      const [responseDetails, timeSlotDetails, vaccinationCenters, benefeiciary, serverTimeData] = await Promise.all([
        beneficiaryAPI().getVaccinationAppointmentDetails(beneficiaryId, appointmentUrl),
        beneficiaryAPI().getBeneficiaryTimeSlots(),
        beneficiaryAPI().getVaccinationCenters(projectId),
        beneficiaryAPI().fetchBeneficiaryDetails(beneficiaryId),
        beneficiaryAPI().getServerTime(),
      ]);

      if (projectName === PROJECT.UMEEED) {
        setBeneficiaryDetails(responseDetails?.data);
        setServerTime(serverTimeData.data);
      }
      if (projectName === PROJECT.ARPAN) {
        setBeneficiaryDetails({
          ...benefeiciary?.data,
          appointments: responseDetails?.data,
        });
      }

      setTimeSlots(timeSlotDetails?.data);
      setVaccinationCenters(vaccinationCenters?.data);
    };
    fetchData();
  }, []);

  const time = (appointment) =>
    isArray(timeSlots) && !isEmpty(timeSlots) && timeSlots.find((item) => item.id === appointment?.timeslotId);
  const vaccinationCenter = (appointment) =>
    isArray(vaccinationCenters) &&
    !isEmpty(vaccinationCenters) &&
    vaccinationCenters.find((item) => item.id === appointment?.vaccinationCenterId);

  const updateVaccination = async (appointment, status) => {
    if (projectName === PROJECT.UMEEED) {

      let formData = {
        ...appointment,
        status,
      };
      if (status === "VACCINATED") {
        formData ={
          ...formData,
          vaccinatedTimestamp : moment().format("YYYY-MM-DD")
        }
        if (moment(appointment?.appointmentDate).format("YYYY-MM-DD") !== moment(serverTime).format("YYYY-MM-DD")) {
          notification.error({
            message: "Status cannot updated since the appointment data and current date are same",
          });
          return;
        }
      }
      const response = await beneficiaryAPI().updateVaccinationAppointment(formData, appointment.id);
      if (response.success) {
        notification.success({ message: "Status updated..!" });
        const refreshListResponse = await beneficiaryAPI().getVaccinationAppointmentDetails(
          beneficiaryId,
          appointmentUrl
        );
        if (response.data != null) {
          setBeneficiaryDetails(refreshListResponse?.data);
        }
      }
    }
    if (projectName === PROJECT.ARPAN) {
      const newValues = {
        ...appointment,
        distributedDate: status === "DONE" ? moment().format("YYYY-MM-DD") : null,
        status,
      };
      const response = await beneficiaryAPI().scheduleAppointment(newValues, "beneficiary/ration/schedule", "PUT");
      if (response.success) {
        notification.success({ message: response.message });
      }
    }
  };
  const showActionConfirmation = (appointment, status) => {
    confirm({
      title: `Proceed with ${status} action ?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Proceed",
      cancelText: "Cancel",
      onOk() {
        updateVaccination(appointment, status);
      },
    });
  };

  return (
    <Row className="pt-4">
      {beneficiaryDetails ? (
        <Col span={20} offset={2}>
          <Title level={2}>Appointment Scheduled</Title>
          <Title level={4}>
            {beneficiaryDetails?.firstName
              ? `${beneficiaryDetails.firstName} ${beneficiaryDetails?.lastname ? beneficiaryDetails.lastname : ""}`
              : noDataMessage}
          </Title>
          {projectName === PROJECT.UMEEED &&
            beneficiaryDetails?.appointments.map((appointment) => {
              return (
                <Card style={{ width: "100%" }} key={appointment.id}>
                  <Paragraph> Vaccination Center : {vaccinationCenter(appointment).title || noDataMessage}</Paragraph>
                  <Paragraph> Dose : {appointment?.dose === "1" ? "1st Dose" : "2nd Dose" || noDataMessage}</Paragraph>
                  <Paragraph>
                    {" "}
                    Date :{" "}
                    {appointment?.appointmentDate
                      ? moment(appointment?.appointmentDate).format("DD MMM YYYY")
                      : noDataMessage}
                  </Paragraph>
                  <Paragraph> Time : {time(appointment)?.timeSlot || noDataMessage}</Paragraph>
                  <Paragraph> Registration Number : {appointment?.beneficiaryId || noDataMessage} </Paragraph>
                  <Paragraph> Location : {appointment?.consent?.location || noDataMessage} </Paragraph>
                  <Paragraph> Status : {appointment?.status || noDataMessage} </Paragraph>
                  <Row gutter={[6, 6]} justify="center" className="beneficiaryForms">
                    <Col lg={6} sm={20}>
                      <Button
                        type="primary"
                        onClick={() =>
                          history.push({
                            pathname: `${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_PDF}/${beneficiaryId}`,
                            search: `?appointmentId=${appointment.id}`,
                          })
                        }
                      >
                        Print Booking Form
                      </Button>
                    </Col>
                    {appointment.status === "SCHEDULED" && (
                      <>
                        <Col lg={6} sm={10}>
                          <Button
                            type="primary"
                            danger
                            onClick={() => showActionConfirmation(appointment, "CANCELLED")}
                          >
                            Cancel Appointment
                          </Button>
                        </Col>
                        <Col lg={6} sm={10}>
                          <Button
                            type="primary"
                            danger
                            onClick={() => showActionConfirmation(appointment, "VACCINATED")}
                          >
                            Vaccinated
                          </Button>
                        </Col>
                        <Col lg={6} sm={10}>
                          <Button
                            type="primary"
                            danger
                            onClick={() => showActionConfirmation(appointment, "NOT VACCINATED")}
                          >
                            Not Vaccinated
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                </Card>
              );
            })}

          {projectName === PROJECT.ARPAN &&
            beneficiaryDetails?.appointments?.map((appointment) => {
              return (
                <Card style={{ width: "100%" }} key={appointment.id}>
                  <Paragraph>
                    Center :{" "}
                    {(vaccinationCenters &&
                      vaccinationCenters.find((item) => item.id === appointment.centerId).title) ||
                      noDataMessage}{" "}
                  </Paragraph>
                  <Paragraph>
                    Date :
                    {appointment?.scheduledDate
                      ? moment(appointment?.scheduledDate).format("DD MMM YYYY")
                      : noDataMessage}
                  </Paragraph>
                  <Paragraph>Status : {appointment?.status || noDataMessage} </Paragraph>
                  <Row gutter={[16, 16]} className="beneficiaryForms" align="center">
                    {(appointment.status === "SCHEDULED" || appointment.status === "PENDING") && (
                      <>
                        <Col lg={6} sm={10}>
                          <Button type="primary" danger onClick={() => showActionConfirmation(appointment, "DONE")}>
                            Done
                          </Button>
                        </Col>
                        <Col lg={6} sm={10}>
                          <Button type="primary" danger onClick={() => showActionConfirmation(appointment, "PENDING")}>
                            Pending
                          </Button>
                        </Col>
                        <Col lg={6} sm={10}>
                          <Button
                            type="primary"
                            danger
                            onClick={() => showActionConfirmation(appointment, "CANCELLED")}
                          >
                            Cancel
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                </Card>
              );
            })}

          <Collapse defaultActiveKey={["1"]} className="mt-4">
            {steps.map((item, index) => {
              return (
                <Panel header={item.title} key={index + 1}>
                  <Button>
                    <Link to={`${item.link}/${beneficiaryId}?projectId=${projectId}`} rel="noopener noreferrer">
                      Check details
                    </Link>
                  </Button>
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      ) : (
        <Typography>Loading..</Typography>
      )}
    </Row>
  );
};

export default BeneficiaryVaccineAppointmentDetails;
