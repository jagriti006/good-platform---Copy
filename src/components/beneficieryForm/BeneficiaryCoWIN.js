import React, { useEffect, useState } from "react";
import { Button, Col, notification, Row } from "antd";
import { Form, Formik, Field } from "formik";
import { useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import Input from "../FormikComponents/Input/Input";
import { getNextStepLink, useQuery } from "../../utils/utils";
import { useSelector } from "react-redux";

const BeneficiaryCoWIN = () => {
  const history = useHistory();
  const { beneficiaryId } = useParams();
  const projectId = useQuery().get("projectId");
  const [initialState, setInitialState] = useState("");
  const vaccinationDetails = useSelector((state) => state.persisted.vaccinationDetails);

  useEffect(() => {
    const fetchBeneficiaryAgreement = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryAgreement(beneficiaryId);
        if (response.data) {
          setInitialState(response.data);
        }
      }
    };
    fetchBeneficiaryAgreement();
  }, [beneficiaryId]);
  return (
    <>
      <Formik
        initialValues={{
          beneficiaryId: beneficiaryId ? beneficiaryId : "",
          beneficiaryReferenceId: initialState ? initialState.beneficiaryReferenceId : "",
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
          const newValues = {
            ...values,
            vaccine: vaccinationDetails?.vaccine,
            vaccinationStatus: vaccinationDetails.vaccination_status,
            dose1Date: vaccinationDetails.dose1_date,
            dose2Date: vaccinationDetails.dose2_date,
          };
          const response = await beneficiaryAPI().addCoWINBeneficiryId(newValues);
          if (response.data) {
            notification.success({ message: "CoWIN Details Saved..!" });
            history.push(`${getNextStepLink()}/${beneficiaryId}?projectId=${projectId}`);
          }
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="beneficiaryForms">
              <Row justify="center" style={{ marginTop: "1rem" }}>
                <Col xs={12} lg={24}>
                  <Field name="beneficiaryReferenceId" component={Input} placeholder="CoWIN beneficiary ID" />
                </Col>
                <Col xs={12} lg={8}>
                  <Button type="primary" htmlType="submit" className="beneficiaryButton">
                    Submit
                  </Button>
                </Col>
              </Row>
              {!values.beneficiaryReferenceId && (
                <Row justify="space-around" align="middle">
                  <Col>
                    <a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noreferrer">
                      <p style={{ padding: "1rem" }}>
                        Register this <b>Beneficiary</b> in CoWIN portal
                      </p>
                    </a>
                  </Col>
                </Row>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BeneficiaryCoWIN;
