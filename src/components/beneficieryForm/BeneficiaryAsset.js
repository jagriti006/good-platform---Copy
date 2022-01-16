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
const BeneficiaryAsset = () => {
  const { beneficiaryId } = useParams();
  const history = useHistory();
  const [initialState, setInitialState] = useState("");

  useEffect(() => {
    const fetchBeneficiaryAsset = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryAsset(
          beneficiaryId
        );
        if (response.data && response.data.assetAccessDetails !== null) {
          setInitialState(response.data.assetAccessDetails);
        }
      }
    };
    fetchBeneficiaryAsset();
  }, []);
  return (
    <>
      <Formik
        initialValues={{
          beneficiaryId: beneficiaryId ? beneficiaryId : "",
          tv: initialState ? initialState.tv : false,
          tvOwned: initialState ? initialState.tvOwned : false,
          fridge: initialState ? initialState.fridge : false,
          fridgeOwned: initialState ? initialState.fridgeOwned : false,
          cooler: initialState ? initialState.cooler : false,
          coolerOwned: initialState ? initialState.coolerOwned : false,
          airConditioner: initialState ? initialState.airConditioner : false,
          airConditionerOwned: initialState
            ? initialState.airConditionerOwned
            : false,
          computer: initialState ? initialState.computer : false,
          computerOwned: initialState ? initialState.computerOwned : false,
          mobile: initialState ? initialState.mobile : false,
          mobileOwned: initialState ? initialState.mobileOwned : false,
          otherAssetName: initialState ? initialState.otherAssetName : "",
          otherAssetOwned: initialState ? initialState.otherAssetOwned : false,
          twoWheeler: initialState ? initialState.twoWheeler : false,
          twoWheelerOwned: initialState ? initialState.twoWheelerOwned : false,
          threeWheeler: initialState
            ? initialState.threeWheeler === null
              ? false
              : initialState.threeWheeler
            : false,
          threeWheelerOwned: initialState
            ? initialState.threeWheelerOwned
            : false,
          fourWheelerOwned: initialState
            ? initialState.fourWheelerOwned
            : false,
          landDetails: initialState ? initialState.landDetails : "",
          house: initialState ? initialState.house : false,
          cattles: initialState ? initialState.cattles : "",
          machinery: initialState ? initialState.machinery : false,
          machineryOwned: initialState ? initialState.machineryOwned : false,
          shop: initialState ? initialState.shop : false,
          shopOwned: initialState ? initialState.shopOwned : false,
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (initialState && initialState.id) values["id"] = initialState.id;
          const response = await beneficiaryAPI().addBeneficiaryAsset(values);
          if (response.data) {
            notification.success({ message: "Asset Details Saved..!" });
            history.push(
              `${appRoutes.BENEFICIARY}${appRoutes.ACCESS_INFO}/${beneficiaryId}`
            );
          }
        }}
      >
        {({ values, touched, errors }) => {
          return (
            <Form className="beneficiaryForms">
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Asset" key="1">
                  <>
                    <h6>White Goods</h6>
                    <Row justify="space-between">
                      <Col span={11} style={flexStyle}>
                        <Field name="tv">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              TV
                            </Checkbox>
                          )}
                        </Field>
                        <div>
                          <Field
                            name="tvOwned"
                            component={Switch}
                            checkedChildren="Owned"
                            unCheckedChildren="Leased"
                          />
                        </div>
                      </Col>
                      <Col span={11} style={flexStyle}>
                        <Field name="fridge">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              Fridge
                            </Checkbox>
                          )}
                        </Field>
                        <div>
                          <Field
                            name="fridgeOwned"
                            component={Switch}
                            checkedChildren="Owned"
                            unCheckedChildren="Leased"
                          />
                        </div>
                      </Col>
                      <Col span={11} style={flexStyle}>
                        <Field name="cooler">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              Cooler
                            </Checkbox>
                          )}
                        </Field>
                        <div>
                          <Field
                            name="coolerOwned"
                            component={Switch}
                            checkedChildren="Owned"
                            unCheckedChildren="Leased"
                          />
                        </div>
                      </Col>
                      <Col span={11} style={flexStyle}>
                        <Field name="airConditioner">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              Air Condition
                            </Checkbox>
                          )}
                        </Field>
                        <div>
                          <Field
                            name="airConditionerOwned"
                            component={Switch}
                            checkedChildren="Owned"
                            unCheckedChildren="Leased"
                          />
                        </div>
                      </Col>
                      <Col span={11} style={flexStyle}>
                        <Field name="computer">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              Computer
                            </Checkbox>
                          )}
                        </Field>
                        <div>
                          <Field
                            name="computerOwned"
                            component={Switch}
                            checkedChildren="Owned"
                            unCheckedChildren="Leased"
                          />
                        </div>
                      </Col>
                      <Col span={11} style={flexStyle}>
                        <Field name="mobile">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              Mobile
                            </Checkbox>
                          )}
                        </Field>
                        <div>
                          <Field
                            name="mobileOwned"
                            component={Switch}
                            checkedChildren="Owned"
                            unCheckedChildren="Leased"
                          />
                        </div>
                      </Col>
                    </Row>
                  </>
                  <Divider />
                  <>
                    <h6>Vehicle</h6>
                    <Row justify="space-between">
                      <Col span={11} style={flexStyle}>
                        <Field name="twoWheeler">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              2 Wheeler
                            </Checkbox>
                          )}
                        </Field>
                        <Field
                          name="twoWheelerOwned"
                          component={Switch}
                          checkedChildren="Owned"
                          unCheckedChildren="Leased"
                        />
                      </Col>
                      <Col span={11} style={flexStyle}>
                        <Field name="threeWheeler">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              3 Wheeler
                            </Checkbox>
                          )}
                        </Field>
                        <Field
                          name="threeWheelerOwned"
                          component={Switch}
                          checkedChildren="Owned"
                          unCheckedChildren="Leased"
                        />
                      </Col>
                      <Col span={11} style={flexStyle}>
                        <Field name="fourWheeler">
                          {({
                            field: { value, name },
                            form: { setFieldValue },
                          }) => (
                            <Checkbox
                              checked={value}
                              onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                              }}
                            >
                              4 Wheeler
                            </Checkbox>
                          )}
                        </Field>
                        <Field
                          name="fourWheelerOwned"
                          component={Switch}
                          checkedChildren="Owned"
                          unCheckedChildren="Leased"
                        />
                      </Col>
                    </Row>
                  </>
                </Panel>
                <Panel header="Land Holding" key="2">
                  <Field
                    name="landDetails"
                    component={Input}
                    placeholder="Land Details"
                  />
                </Panel>
                <Panel header="House" key="3">
                  <Col span={11} style={flexStyle}>
                    <Field name="house">
                      {({
                        field: { value, name },
                        form: { setFieldValue },
                      }) => (
                        <Checkbox
                          checked={value}
                          onChange={(event) => {
                            setFieldValue(name, event.target.checked);
                          }}
                        >
                          House
                        </Checkbox>
                      )}
                    </Field>
                    <Field
                      name="houseOwned"
                      component={Switch}
                      checkedChildren="Owned"
                      unCheckedChildren="Leased"
                    />
                  </Col>
                </Panel>
                <Panel header="Cattles" key="4">
                  <Field
                    name="cattles"
                    component={Input}
                    placeholder="Cattles"
                  />
                </Panel>
                <Panel header="Equipments and Machinery" key="5">
                  <Field name="machinery">
                    {({ field: { value, name }, form: { setFieldValue } }) => (
                      <Checkbox
                        checked={value}
                        onChange={(event) => {
                          setFieldValue(name, event.target.checked);
                        }}
                      >
                        Machinery
                      </Checkbox>
                    )}
                  </Field>
                  <Field
                    name="machineryOwned"
                    component={Switch}
                    checkedChildren="Owned"
                    unCheckedChildren="Leased"
                  />
                </Panel>
                <Panel header="Shop" key="6">
                  <Field name="shop">
                    {({ field: { value, name }, form: { setFieldValue } }) => (
                      <Checkbox
                        checked={value}
                        onChange={(event) => {
                          setFieldValue(name, event.target.checked);
                        }}
                      >
                        Machinery
                      </Checkbox>
                    )}
                  </Field>
                  <Field
                    name="shopOwned"
                    component={Switch}
                    checkedChildren="Owned"
                    unCheckedChildren="Leased"
                  />
                </Panel>
                <Panel header="Other" key="7"></Panel>
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

export default BeneficiaryAsset;
