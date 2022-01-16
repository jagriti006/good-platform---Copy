import { Button, Checkbox, Col, List, notification, Row } from "antd";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { removeEmptyOrNull, trasformToValueAndLabel, useQuery } from "../../utils/utils";
import DatePicker from "../FormikComponents/Date/Date";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";

const BeneficiaryVialAssign = () => {
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [countByVail, setCountByVail] = useState(0);
  const [listByFormSearch, setListByFormSearch] = useState([]);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const projectId = useQuery().get("projectId");
  const history = useHistory();
  useEffect(() => {
    const fetchCenters = async () => {
      const response = await beneficiaryAPI().getVaccinationCenters(projectId, "");
      if (response.data) {
        setVaccinationCenters(trasformToValueAndLabel(response.data, "title"));
      }
    };
    fetchCenters();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      const response = await beneficiaryAPI().getBeneficiaryTimeSlots();
      if (response.data) {
        setTimeSlots(trasformToValueAndLabel(response.data, "timeSlot"));
      }
    };
    fetchSlots();
  }, []);

  const saveVailNumber = async (values) => {
    const payload = {
      projectId: projectId,
      vialNo: values.vialNo,
      healthWorkerId: sessionStorage.userId,
      centerId: values.centerId,
    };
    await beneficiaryAPI().saveVialNumber(payload);
  };

  const getCountByVailNumber = async (vialNo) => {
    const response = await beneficiaryAPI().getCountByVialNumber(vialNo);
    if (response.data > -1) {
      setCountByVail(response.data);
    }
  };
  const fetchBeneficiariesByFormData = async (values) => {
    let payload = { ...values, vialNo: "", projectId: projectId };
    if (values.vaccinatedDate) {
      const formattedDate = moment(values.vaccinatedDate).format("YYYY-MM-DD");
      payload = {
        ...payload,
        vaccinatedDate: formattedDate,
      };
    }
    const filter = new URLSearchParams(removeEmptyOrNull(payload)).toString();
    const response = await beneficiaryAPI().fetchBeneficiariesByFormData(filter);
    if (response.data) {
      setListByFormSearch(response.data);
    }
  };

  const onBeneficiaryCheck = (checkedItems) => {
    if (checkedItems.length + countByVail > 10) {
      notification.error({ message: "Cannot Select more than 10 beneficiaries" });
      return;
    }
    setSelectedBeneficiaries(checkedItems);
  };

  const onSubmitBeneficiaryList = async (values) => {
    const payload = {
      beneficiaryIds: selectedBeneficiaries.toString(),
      vialNo: values.vialNo,
      vaccinatedDate: moment(values.vaccinatedDate).format("YYYY-MM-DD"),
    };
    const urlData = new URLSearchParams(removeEmptyOrNull(payload)).toString();
    const response = await beneficiaryAPI().assignVialToBeneficiaryList(urlData);
    if (response.data) {
      notification.success({ message: "Assigned Successfully" });
      setSelectedBeneficiaries([]);
    }
  };
  return (
    <Row gutter={[16, 16]} className="p-5 bg-white" justify="center">
      <Col xs={24} >
        <h4
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "25px",
            lineHeight: "37px",
            letterSpacing: "0.01em",
            color: "#39364F",
            textAlign:"center"
          }}
        >
          Beneficiary Vail
        </h4>
      </Col>
      <Col xs={24} lg={12}>
        <h3>Assign Vial Number</h3>

        <Formik
          initialValues={{
            centerId: "",
            vialNo: "",
            vaccinatedDate: "",
            timeslotId: "",
          }}
          validationSchema={Yup.object().shape({
            centerId: Yup.string().required("Center is required."),
            vialNo: Yup.string().required("Vial Number is required."),
            vaccinatedDate: Yup.string().required("Date is required."),
            timeslotId: Yup.string().required("Time Slot is required."),
          })}
          onSubmit={async (values) => {
            saveVailNumber(values);
            getCountByVailNumber(values.vialNo);
            fetchBeneficiariesByFormData(values);
          }}
        >
          {({ values, touched, errors, setFieldValue }) => {
            return (
              <Form>
                <Row gutter={[16]} justify="center">
                  <Col xs={24}>
                    <Field
                      name="vialNo"
                      component={Input}
                      placeholder="Vial Number"
                      errortext={touched.vialNo ? errors.vialNo : ""}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      name="vaccinatedDate"
                      component={DatePicker}
                      format="DD/MM/YYYY"
                      placeholder="Date"
                      errortext={touched.vaccinatedDate ? errors.vaccinatedDate : ""}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      name="centerId"
                      component={SelectBox}
                      placeholder="Vaccination Center"
                      options={vaccinationCenters || []}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      name="timeslotId"
                      component={SelectBox}
                      placeholder="Vaccination Time Slot"
                      options={timeSlots || []}
                    />
                  </Col>
                  <Col xs={12}>
                    <Button type="primary" htmlType="submit" className="w-100">
                      Search
                    </Button>
                  </Col>
                  <Col xs={24} className="py-3">
                    <span style={{ color: countByVail === 10 ? "red" : "#3a8d9d" }}>
                      Beneficiary currently mapped with this vial number : {selectedBeneficiaries.length + countByVail}
                      /10
                    </span>
                  </Col>
                  <Col
                    xs={24}
                    style={{
                      maxHeight: 500,
                      overflow: "auto",
                    }}
                  >
                    <Checkbox.Group className="w-100" onChange={onBeneficiaryCheck}>
                      <List
                        itemLayout="horizontal"
                        dataSource={listByFormSearch}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Checkbox value={item.beneficiaryId} disabled={countByVail === 10} />}
                              title={item.firstName}
                              description={
                                <div className="d-flex justify-content-between">
                                  <div>{item.gender}</div>
                                  <div>Dose {item?.vaccinationAppointments?.dose}</div>
                                  <div>{item?.vaccinationAppointments?.status}</div>
                                </div>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Checkbox.Group>
                  </Col>
                  {selectedBeneficiaries.length > 0 && (
                    <Col xs={12}>
                      <Button type="primary" className="w-100" onClick={() => onSubmitBeneficiaryList(values)}>
                        Submit
                      </Button>
                    </Col>
                  )}
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Col>
    </Row>
  );
};

export default BeneficiaryVialAssign;
