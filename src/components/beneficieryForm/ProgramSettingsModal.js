import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Col, Modal, notification, Row } from "antd";
import { Field, Form, Formik, getIn } from "formik";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import { setStructureData } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { saveProgramSettings } from "../../redux/persisted/persistedActions";

const ProgramSettingsModal = ({ open, setOpen }) => {
  const [dropDownData, setDropDownData] = useState({
    state: [],
    district: [],
    taluk: [],
    village: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await beneficiaryAPI().getAllState();
      if (response.data) {
        setDropDownData({
          ...dropDownData,
          state: setStructureData(response.data),
        });
      }
    };
    fetchData();
  }, []);

  const handleStateChange = async (state, postalCode) => {
    const response = await beneficiaryAPI().getAllDistrictByState(state, postalCode);
    if (response.data) {
      setDropDownData({
        ...dropDownData,
        district: setStructureData(response.data),
      });
    }
  };

  const handleDistrictChange = async (state, district, postalCode) => {
    const talukResponse = await beneficiaryAPI().getAllTalukByDistrict(district, postalCode);
    if (talukResponse.data) {
      setDropDownData({
        ...dropDownData,
        taluk: setStructureData(talukResponse.data),
      });
    }
  };
  const handleTalukChange = async (taluk, postalCode) => {
    const response = await beneficiaryAPI().getAllVillagetsByTaluk(taluk, postalCode);
    if (response.data) {
      setDropDownData({
        ...dropDownData,
        village: setStructureData(response.data),
      });
    }
  };
  return (
    <Modal
      title={"Program Settings"}
      visible={open}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      okText="Save"
      cancelText="Close"
      footer={null}
      centered
    >
      <Formik
        initialValues={{
          state: "",
          district: "",
          taluk: "",
          village: "",
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          state: Yup.string().required("State is required."),
        })}
        onSubmit={(values) => {
          dispatch(saveProgramSettings(values));
          notification.success({ message: "Settings Saved..!" });
          setOpen(false);
        }}
      >
        {({ touched, errors, values }) => {
          return (
            <Form className="beneficiaryForms basicDetalsForm">
              <Row gutter={[16, 8]} justify="center">
                <Col xs={24} lg={12}>
                  <Field
                    name={`state`}
                    component={SelectBox}
                    placeholder="State"
                    options={dropDownData.state}
                    onChange={(e) => handleStateChange(e)}
                    errortext={getIn(touched, `state`) && getIn(errors, `state`) && getIn(errors, `state`)}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    name={`district`}
                    component={SelectBox}
                    placeholder="District"
                    options={dropDownData.district}
                    onChange={(e) => handleDistrictChange(values.state, e)}
                  />
                </Col>

                <Col xs={24} lg={12}>
                  <Field
                    name={`taluk`}
                    component={SelectBox}
                    placeholder="Taluk"
                    options={dropDownData.taluk}
                    onChange={(taluk) => handleTalukChange(taluk)}
                  />
                </Col>

                <Col xs={12}>
                  <Field name={`village`} component={SelectBox} options={dropDownData.village} placeholder="Village" />
                </Col>
                <Col xs={8}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
export default ProgramSettingsModal;
