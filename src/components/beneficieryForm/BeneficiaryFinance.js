import React, { useEffect, useState } from "react";
import { Button, Col, notification, Row } from "antd";
import { useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { Collapse } from "antd";
import { Formik, Form, Field } from "formik";
import Input from "../FormikComponents/Input/Input";
import appRoutes from "../../constants/app-routes";

const { Panel } = Collapse;
const BeneficiaryFinance = () => {
  const history = useHistory();
  const { beneficiaryId } = useParams();
  const [initialState, setInitialState] = useState("");

  useEffect(() => {
    const fetchBeneficiaryFinance = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryIncome(
          beneficiaryId
        );
        if (response.data) {
          setInitialState(response.data);
        }
      }
    };
    fetchBeneficiaryFinance();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          id: beneficiaryId ? beneficiaryId : "",
          incomeSource: initialState ? initialState.incomeSource : "0",
          annualHouseHold: initialState
            ? initialState.annualHouseholdIncome
            : "0",
          monthlyCurrent: initialState ? initialState.monthlyIncome : "0",
          bankName: initialState ? initialState.bankName : "",
          branchName: initialState ? initialState.branchName : "",
          accountNo: initialState ? initialState.bankAccountNo : "",
          ifsc: initialState ? initialState.ifscCode : "",
          janDhanAccountNo: initialState ? initialState.janDhanAccountNo : "",
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
          const response = await beneficiaryAPI().addBeneficiaryIncome(values);
          if (response.success) {
            notification.success({ message: "Income Details Saved..!" });
            history.push(
              `${appRoutes.BENEFICIARY}${appRoutes.OTHER_INFO}/${beneficiaryId}`
            );
          }
        }}
      >
        {({ values, touched, errors }) => {
          return (
            <Form className="beneficiaryForms">
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Income Details" key="1">
                  <Row justify="space-between">
                    <Col span={11}>
                      <Field
                        name="incomeSource"
                        component={Input}
                        placeholder="Income Source"
                      />
                    </Col>
                    <Col span={11}>
                      <Field
                        name="annualHouseHold"
                        component={Input}
                        placeholder="Annual Household Income"
                      />
                    </Col>
                    <Col span={11}>
                      <Field
                        name="monthlyCurrent"
                        component={Input}
                        placeholder="Monthly Household Income"
                      />
                    </Col>
                  </Row>
                </Panel>
                <Panel header="Bank Details" key="2">
                  <Row justify="space-between">
                    <Col span={11}>
                      <Field name="ifsc" component={Input} placeholder="IFSC" />
                    </Col>
                    <Col span={11}>
                      <Field
                        name="bankName"
                        component={Input}
                        placeholder="Bank Name"
                      />
                    </Col>
                    <Col span={11}>
                      <Field
                        name="accountNo"
                        component={Input}
                        placeholder="Bank Account Number"
                      />
                    </Col>
                    <Col span={11}>
                      <Field
                        name="janDhanAccountNo"
                        component={Input}
                        placeholder="JanDhan Card (Optional)"
                      />
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
              
              <Row justify="end">
                <Col xs={12} lg={6}>
                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BeneficiaryFinance;
