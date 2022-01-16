import { useEffect, useState } from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
  View,
} from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, message, Row, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import appRoutes from "../../constants/app-routes";
import { appConfigurations } from "../../utils/constants";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { isEmpty, isArray, values } from "lodash";
import moment from "moment";
import { useQuery } from "../../utils/utils";

const noDataMessage = "No Data";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    fontFamily: "Oswald",
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
  },
  userMeta: {
    fontSize: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
  },
  appointmentHeader: {
    fontSize: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 4,
    lineHeight: 1.5,
  },
  RegNumber: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 14,
    fontSize: 12,
    fontFamily: "Oswald",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  appointment: {
    fontSize: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },

  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },

  imageStyle: {
    marginVertical: 2,
    width: "300px",
    height: "auto",
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  questionAnswer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 14,
    alignItems: "center",
    padding: "8px 0px",
  },
  question: {
    width: "90%",
  },
});

// Create Document Component
const MyDocument = ({
  beneficiaryDetails,
  appointment,
  beneficiaryId,
  timeSlots,
  vaccinationCenters,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const { preVaccineQuestionaire } = beneficiaryDetails;

  useEffect(() => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, beneficiaryId, {
      displayValue: false,
    });
    setImageUrl(canvas.toDataURL("image/jpg", 0.5));
  }, []);

  const time = (appointment) =>
    isArray(timeSlots) &&
    !isEmpty(timeSlots) &&
    timeSlots.find((item) => item.id === appointment?.timeslotId);

  const vaccinationCenter = (appointment) =>
    isArray(vaccinationCenters) &&
    !isEmpty(vaccinationCenters) &&
    vaccinationCenters.find(
      (item) => item.id === appointment?.vaccinationCenterId
    );
  const booleanToString = (value) => {
    if (value === true) return "YES";
    else if (value === false) return "NO";
    else return noDataMessage;
  };

  return (
    <>
      {imageUrl && (
        <Document>
          <Page style={styles.body}>
            <Text style={styles.title}>
              {beneficiaryDetails?.firstName
                ? `${beneficiaryDetails.firstName} ${
                    beneficiaryDetails?.lastname
                      ? beneficiaryDetails.lastname
                      : ""
                  }`
                : noDataMessage}
            </Text>
            <Text style={styles.userMeta}>
              Age :{" "}
              {beneficiaryDetails?.age ||
                moment().diff("1981-01-01", "years") ||
                noDataMessage}
            </Text>
            <Text style={styles.userMeta}>
              Designation :{beneficiaryDetails?.occupation || noDataMessage}
            </Text>
            <Text style={styles.userMeta}>
              Location :{" "}
              {beneficiaryDetails?.state
                ? `${beneficiaryDetails.state}, ${
                    beneficiaryDetails?.district
                      ? `${beneficiaryDetails?.district}`
                      : ""
                  }`
                : noDataMessage}
            </Text>
            <Image style={styles.imageStyle} src={imageUrl} />
            <Text style={styles.subHeading}>Appointment Scheduled</Text>
            <Text style={styles.appointmentHeader}>
              You appointment has been Scheduled, your registration number is :{" "}
            </Text>
            <Text style={styles.RegNumber}>{beneficiaryId}</Text>
            <Text style={styles.appointment}>
              Vaccination Center :{" "}
              {vaccinationCenter(appointment)?.title || noDataMessage}
            </Text>
            <Text style={styles.appointment}>
              Date :{" "}
              {appointment?.appointmentDate
                ? moment(appointment?.appointmentDate).format("DD MMM YYYY")
                : noDataMessage}
            </Text>
            <Text style={styles.appointment}>
              Time : {time(appointment)?.timeSlot || noDataMessage}
            </Text>
            <Text style={styles.subHeading}>Pre-vaccination questionnaire</Text>

            {preVaccineQuestionaire != null && (
              <>
                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>
                    1. Do you have fever, cough, breatheness, malalse, myaigia,
                    diarrhea ?
                  </Text>
                  <Text>
                    {booleanToString(preVaccineQuestionaire.hasFever) ||
                      noDataMessage}
                  </Text>
                </View>
                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>
                    2. Is any of your family members experiencing similar
                    symptoms ?
                  </Text>
                  <Text>
                    {booleanToString(
                      preVaccineQuestionaire.anyFamilyMembersWithSymptoms
                    ) || noDataMessage}
                  </Text>
                </View>

                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>
                    3. Have you come in contact with anyone else, expet for your
                    family members, who have similar symptoms ? Eg. at your
                    workplace or neighborhood
                  </Text>
                  <Text>
                    {booleanToString(
                      preVaccineQuestionaire.hasExternalContact
                    ) || noDataMessage}
                  </Text>
                </View>
                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>
                    4. Have you attended a gathering outside of your home in the
                    past one month ?
                  </Text>
                  <Text>
                    {booleanToString(
                      preVaccineQuestionaire.hasAttendedGathering
                    ) || noDataMessage}
                  </Text>
                </View>
                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>
                    5. Do you live in an area that in currently 'Containment
                    Area' by Govt./ BMC ?
                  </Text>
                  <Text>
                    {booleanToString(
                      preVaccineQuestionaire.fromContainmentArea
                    ) || noDataMessage}
                  </Text>
                </View>

                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>
                    6. Direct contact with known or suspected case or suspected
                    case of COVID-19, in the last 21 days ?
                  </Text>
                  <Text>
                    {booleanToString(preVaccineQuestionaire.hasDirectContact) ||
                      noDataMessage}
                  </Text>
                </View>

                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>
                    7. Have you ever been tested positive for COVID-19 ?
                  </Text>
                  <Text>
                    {booleanToString(
                      preVaccineQuestionaire.hadTestedPositive
                    ) || noDataMessage}
                  </Text>
                </View>
                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>
                    8. Have you handled dead/sick birds in the last 7 days ?
                  </Text>
                  <Text>
                    {booleanToString(
                      preVaccineQuestionaire.hasHandledDeadBird
                    ) || noDataMessage}
                  </Text>
                </View>
              </>
            )}

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        </Document>
      )}
    </>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const BeneficiaryAppointmentPDF = () => {
  const [beneficiaryDetails, setBeneficiaryDetails] = useState();
  const [timeSlots, setTimeSlots] = useState(null);
  const [vaccinationCenters, setVaccinationCenters] = useState("");
  const [appointment, setAppointment] = useState(null);
  const { beneficiaryId } = useParams();
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    // dont allow access to this page with out beneficiary id
    if (!beneficiaryId) {
      history.push(`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_LIST}`);
      message.error(appConfigurations.general_error_message);
    }
  }, [beneficiaryId]);

  useEffect(() => {
    const fetchDetails = async () => {
      const fetchData = async () => {
        const [responseDetails, timeSlotDetails, vaccinationCenters] =
          await Promise.all([
            beneficiaryAPI().getVaccinationAppointmentDetails(beneficiaryId),
            beneficiaryAPI().getBeneficiaryTimeSlots(),
            beneficiaryAPI().getVaccinationCenters(),
          ]);

        setBeneficiaryDetails(
          responseDetails?.data,
          query.get("appointmentId")
        );
        setAppointment(
          responseDetails?.data?.appointments.find(
            (appointment) => appointment.id === query.get("appointmentId")
          )
        );
        setTimeSlots(timeSlotDetails?.data);
        setVaccinationCenters(vaccinationCenters?.data);
      };
      fetchData();
    };
    fetchDetails();
  }, []);

  return (
    <div className="container">
      {beneficiaryDetails ? (
        <>
          <Button
            type="primary"
            onClick={() =>
              history.push(
                `${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_DETAILS}/${beneficiaryId}`
              )
            }
            className="mb-4"
          >
            <LeftOutlined /> Back to Appointment Details
          </Button>
          <div style={{ height: "100vh" }}>
            <PDFViewer height="100%" width="100%">
              <MyDocument
                beneficiaryDetails={beneficiaryDetails}
                appointment={appointment}
                beneficiaryId={beneficiaryId}
                timeSlots={timeSlots}
                vaccinationCenters={vaccinationCenters}
              />
            </PDFViewer>
          </div>
        </>
      ) : (
        <Typography> Loading..</Typography>
      )}
    </div>
  );
};

export default BeneficiaryAppointmentPDF;
