import React, { useEffect, useState } from "react";
import { Button, Col, Divider, notification, Row } from "antd";
import { useHistory, useParams } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { Collapse } from "antd";
import { Formik, Form, Field } from "formik";
import Input from "../FormikComponents/Input/Input";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Switch from "../FormikComponents/Switch/Switch";
import appRoutes from "../../constants/app-routes";

const { Panel } = Collapse;

const flexStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 0",
};
const BeneficiaryAccess = () => {
  const { beneficiaryId } = useParams();
  const history = useHistory();
  const [initialState, setInitialState] = useState("");

  useEffect(() => {
    const fetchBeneficiaryAccess = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryAccess(
          beneficiaryId
        );
        if (response.data && response.data.assetAccessDetails !== null) {
          setInitialState(response.data.assetAccessDetails);
        }
      }
    };
    fetchBeneficiaryAccess();
  }, []);
  return (
    <>
      <Formik
        initialValues={{
          beneficiaryId: beneficiaryId ? beneficiaryId : "",
          solarElectricity: initialState
            ? initialState.solarElectricity
            : false,
          govtElectricity: initialState ? initialState.govtElectricity : false,
          fuelElectricity: initialState ? initialState.fuelElectricity : false,
          internet: initialState ? initialState.internet : false,
          internetType: initialState ? initialState.internetType : "",
          cookingGas: initialState ? initialState.cookingGas : false,
          cookingGasType: initialState ? initialState.cookingGasType : "",
          drinkingWater: initialState ? initialState.drinkingWater : false,
          sanitationWater: initialState ? initialState.sanitationWater : false,
          irrigationWater: initialState ? initialState.irrigationWater : false,
          healthCareCenter: initialState
            ? initialState.healthCareCenter
            : false,
          schoolPrimary: initialState ? initialState.schoolPrimary : false,
          schoolHigher: initialState ? initialState.schoolHigher : false,
          governmentScheme: initialState
            ? initialState.governmentScheme
            : false,
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (initialState && initialState.id) values["id"] = initialState.id;
          const response = await beneficiaryAPI().addBeneficiaryAccess(values);
          if (response.data) {
            notification.success({ message: "Access details saved..!" });
            history.push(
              `${appRoutes.BENEFICIARY}${appRoutes.SELF_DECLARATION}/${beneficiaryId}`
            );
          }
        }}
      >
        {({ values, touched, errors }) => {
          return (
            <Form className="beneficiaryForms">
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Access" key="1">
                  <>
                    <h6>Electricity</h6>
                    <Row justify="space-between">
                      <Col span={7} style={flexStyle}>
                        <label>Solar</label>
                        <Field
                          name="solarElectricity"
                          component={Switch}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Col>
                      <Col span={7} style={flexStyle}>
                        <label>Governent Supply</label>
                        <Field
                          name="govtElectricity"
                          component={Switch}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Col>
                      <Col span={7} style={flexStyle}>
                        <label>Fuel Based</label>
                        <Field
                          name="fuelElectricity"
                          component={Switch}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Col>
                    </Row>
                  </>
                  <Divider />
                  <>
                    <h6>Data</h6>
                    <Row justify="space-between">
                      <Col span={11} style={flexStyle}>
                        <label>Internet</label>
                        <Field
                          name="internet"
                          component={Switch}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Col>
                      <Col span={11} style={flexStyle}>
                        <label>Data (2G/3G/4G)</label>
                        <Field
                          name="internetType"
                          component={Switch}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Col>
                    </Row>
                  </>
                </Panel>
                <Panel header="Cooking Gas" key="2">
                  <Row justify="space-between">
                    <Col span={11} style={flexStyle}>
                      <label>Cooking Gas</label>
                      <Field
                        name="cookingGas"
                        component={Switch}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Col>
                    <Col span={11}>
                      <Field
                        name="cookingGasType"
                        component={Input}
                        placeholder="Cooking Gas Type"
                      />
                    </Col>
                  </Row>
                </Panel>
                <Panel header="Water" key="3">
                  <Row justify="space-between">
                    <Col span={7} style={flexStyle}>
                      <label>Drinking Water</label>
                      <Field
                        name="drinkingWater"
                        component={Switch}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Col>
                    <Col span={7} style={flexStyle}>
                      <label>Sanitation Water</label>
                      <Field
                        name="sanitationWater"
                        component={Switch}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Col>
                    <Col span={7} style={flexStyle}>
                      <label>Irrigation Water</label>
                      <Field
                        name="irrigationWater"
                        component={Switch}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Col>
                  </Row>
                </Panel>
                <Panel header="Healthcare Center" key="4">
                  <Row>
                    <Col span={12} style={flexStyle}>
                      <label>Healthcare Center</label>
                      <Field
                        name="healthCareCenter"
                        component={Switch}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Col>
                  </Row>
                </Panel>
                <Panel header="School" key="5">
                  <Row justify="space-between">
                    <Col span={11} style={flexStyle}>
                      <label>Primary School</label>
                      <Field
                        name="schoolPrimary"
                        component={Switch}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Col>
                    <Col span={11} style={flexStyle}>
                      <label>Higher Secondary</label>
                      <Field
                        name="schoolHigher"
                        component={Switch}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Col>
                  </Row>
                </Panel>
                <Panel header="Government Scheme" key="6">
                  <Row>
                    <Col span={12} style={flexStyle}>
                      <label>Government Scheme</label>
                      <Field
                        name="governmentScheme"
                        component={Switch}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
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

export default BeneficiaryAccess;
