import { Button, Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import appRoutes from "../../constants/app-routes";
import { useHistory, useParams } from "react-router-dom";
import { OverviewBox } from "../organisationForm/overviewBox/overviewBox";
import { appConfigurations } from "../../utils/constants";
import { last } from "lodash-es";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { useQuery } from "../../utils/utils";
import { useSelector } from "react-redux";
import { PROJECT } from "../../constants/strings";
import { projectIdorName } from "../../api/config";

const BeneficiaryOverveiw = () => {
  const history = useHistory();
  let { beneficiaryId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const projectId = useQuery().get("projectId");
  const projectName = projectIdorName("", projectId);
  const benefeiciarySteps = useSelector((state) => state.ui.beneficiarySteps);

  useEffect(() => {
    if (!beneficiaryId) {
      history.push(`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_LIST}`);
      message.error(appConfigurations.general_error_message);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const appointmentUrl =
        projectName === PROJECT.UMEEED
          ? "vaccination/details"
          : "beneficiary/ration/schedule";
      const response = await beneficiaryAPI().getVaccinationAppointmentDetails(
        beneficiaryId,
        appointmentUrl
      );
      if (response.data) {
        if (projectName === PROJECT.UMEEED) {
          setAppointments(response.data?.appointments || []);
        }
        if (projectName === PROJECT.ARPAN) {
          setAppointments(response?.data);
        }
      }
    };
    fetchData();
  }, []);

  const handleSchedule = () =>
    history.push(
      `/beneficiary/schedule-appointment/${beneficiaryId}?projectId=${projectId}`
    );
  const handleclick = (link) => {};

  return (
    <>
      <Row justify="center" className="pt-5">
        <Col xs={20} md={20} lg={16}>
          <h3>{projectName}</h3>
          <div className="overviewItemsWrapper">
            {benefeiciarySteps.map((item, index) => {
              return (
                <OverviewBox
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  percent={item.percent}
                  time={item.time}
                  link={
                    beneficiaryId
                      ? `${item.link}/${beneficiaryId}?projectId=${projectId}`
                      : `${item.link}?projectId=${projectId}`
                  }
                  click={(link) => handleclick(link)}
                />
              );
            })}
          </div>
        </Col>
      </Row>
      <Row justify="center" className="beneficiaryForms">
        {appointments.length === 0 && (
          <Col xs={24} md={8} lg={6}>
            <Button type="primary" htmlType="button" onClick={handleSchedule}>
              Schedule Appointment
            </Button>
          </Col>
        )}
        {appointments.length > 0 &&
          last(appointments) &&
          (last(appointments).status === "SCHEDULED" || last(appointments).status === "PENDING") && (
            <>
              <Col xs={20} md={8} lg={6}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={handleSchedule}
                >
                  View Scheduled Appointment
                </Button>
              </Col>
              <Col xs={20} md={8} lg={6}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => {
                    history.push(
                      `${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_DETAILS}/${beneficiaryId}?projectId=${projectId}`
                    );
                  }}
                >
                  View All Appointments
                </Button>
              </Col>
            </>
          )}
        {appointments.length > 0 &&
          last(appointments) &&
          (last(appointments).status !== "SCHEDULED" && last(appointments).status !== "PENDING" ) && (
            <>
              <Col xs={20} md={8} lg={6}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={handleSchedule}
                >
                  Schedule Appointment
                </Button>
              </Col>
              <Col xs={20} md={8} lg={6}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => {
                    history.push(
                      `${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_DETAILS}/${beneficiaryId}?projectId=${projectId}`
                    );
                  }}
                >
                  View All Appointments
                </Button>
              </Col>
            </>
          )}
      </Row>
    </>
  );
};

export default BeneficiaryOverveiw;
