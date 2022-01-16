import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {Button, Col, Modal, notification, Row, Typography} from "antd";
import {Field, Form, Formik} from "formik";
import Input from "../FormikComponents/Input/Input";
import userAPI from "../../api/userAPI";
import {useSelector} from "react-redux";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import successBg from "../../assets/images/illustrators/invite-success.png";
import beneficiaryAPI from "../../api/beneficiaryAPI";

const {Title} = Typography;


const setStructureData = (data) => {
  return (
    (data &&
      data.map((stateData) => {
        return {
          value: stateData,
          label: stateData,
        };
      })) ||
    []
  );
};

const CenterForm = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userDetails = useSelector((state) => state.user.userDetails);
  const projects = userDetails.projects;
  const [addSuccess, setAddSuccess] = useState(false);
  const [dropDownData, setDropDownData] = useState({
    state: [],
    district: [],
    taluk: [],
    village: [],
  });
  const [pincodeChange, setPincodeChange] = useState(false);

  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  
  useEffect(async () => {
    const stateResponse = await beneficiaryAPI().getAllState();
    let allDistrict = [];
    let allTaluk = [];
    let allVillage = [];

    if (props.data){
      const [district, taluk, village] = await Promise.all([
        beneficiaryAPI().getAllDistrictByState(props.data.state),
        beneficiaryAPI().getAllTalukByDistrict(props.data.district),
        beneficiaryAPI().getVillageByTaluk(props.data.taluk)
      ]);

      allDistrict = district.data;
      allTaluk = taluk.data;
      allVillage = village.data;
    }

    const newDropdownData = {
      ...dropDownData,
      state: setStructureData(stateResponse.data),
      district: setStructureData(allDistrict),
      taluk: setStructureData(allTaluk),
      village: setStructureData(allVillage)
    };

    setDropDownData(newDropdownData);
  }, []);

  const handleCancel = (isRefresh) => {
    setIsModalVisible(false);
    props.closeModal();

    if (isRefresh){
      props.onRefresh();
    }
  };

  const renderProjects = () => {
    const project = [];

    projects && projects.map((data) => {
      project.push({
        label: data.project,
        value: data.id
      });
    });

    return project;
  }

  const handleStateChange = async (state) => {
    const response = await beneficiaryAPI().getAllDistrictByState(state);
    if (response.data) {
      setDropDownData({
        ...dropDownData,
        district: setStructureData(response.data),
      });
    }
  };
 
  
  const handleDistrictChange = async (state, district) => {
    let talukResponse = {data: []};
    // if (projectIdorName("", projectId) === PROJECT.ARPAN) {
    talukResponse = await beneficiaryAPI().getAllTalukByDistrict(district);
    // }

    if (talukResponse.data) {
      setDropDownData({
        ...dropDownData,
        taluk: setStructureData(talukResponse.data),
      });
    }
  };


  
  const handlePincodeChange = async (pincode, setFieldValue) => {
    const response = await beneficiaryAPI().getCityDistrictStateByPincode(pincode);
    if (response.data) {
      setDropDownData({
        ...dropDownData,
        state: response.data.state ? setStructureData([response.data.state]) : [],
        district: response.data.district ? setStructureData([response.data.district]) : [],
        taluk: response.data.taluk ? setStructureData(response.data.taluk) : [],
        village: response.data.village ? setStructureData(response.data.village) : [],
      });

      setFieldValue(`state`, response.data.state || "");
      setFieldValue(`district`, response.data.district && response.data.district[0] || "");
      setFieldValue(`taluk`, response.data.taluk && response.data.taluk[0] || "");
    } else {
      setDropDownData({
        ...dropDownData,
        state: [],
        district: [],
        taluk: [],
        village: [],
      });

      setFieldValue(`state`, "");
      setFieldValue(`district`, "");
      setFieldValue(`taluk`, "");
      setFieldValue(`village`, "");
    }
  };

  
  const handleTalukChange = async (taluk) => {
    const response = await beneficiaryAPI().getVillageByTaluk(taluk);
    if (response.data) {
      setDropDownData({
        ...dropDownData,
        village: setStructureData(response.data),
      });
    }
  };

  const getInitialValues = () => {
    const editableData = props.data;
    if (editableData) {
      return {
        id: editableData.id,
        title: editableData.title,
        shortTitle: editableData.shortTitle,
        postalCode: editableData.postalCode,
        state: editableData.state,
        district: editableData.district,
        taluk: editableData.taluk,
        village: editableData.village,
        organisationId: userDetails?.organisationId || "",
        projectId: editableData.projectId,
        street: null,
        city: null,
        country: null,
        buildingNoName: null,
        centerReferenceId: null,
        location: null,
      }
    }else{
      return {
        id: "",
        title: "",
        shortTitle: "",
        postalCode: null,
        state: "",
        district: "",
        taluk: "",
        village: "",
        organisationId: userDetails?.organisationId || "",
        projectId: "",
        street: null,
        city: null,
        country: null,
        buildingNoName: null,
        centerReferenceId: null,
        location: null,
      }
    }
  }

  return (
    <Modal
      title={addSuccess ? null : props.data ? "Update Center" : "Add Center"}
      visible={isModalVisible}
      onCancel={() => handleCancel(false)}
      destroyOnClose
      okText={props.data ? "Update Center" : "Add Center"}
      cancelText="Cancel"
      footer={null}
      centered
      bodyStyle={addSuccess ? {paddingRight: 15, paddingBottom: 0} : null}
    >
      {!addSuccess && (
        <Formik
          initialValues={getInitialValues()}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .required("Title is required.")
              .max(248, "Maximum 248 characters allowed."),
            shortTitle: Yup.string()
              .required("Short Title is required.")
              .max(29, "Maximum 29 characters allowed."),
            postalCode: Yup.string().required("Postal Code is required."),
            state: Yup.string().required("State is required."),
            district: Yup.string().required("District is required."),
            projectId: Yup.string().required("Program is required."),
          })}       
          onSubmit={async (values) => {
            const response = await userAPI().addCenter(values);
            if (response.success) {
              setAddSuccess(true);
            }
          }}
        >         
          {({values, touched, errors, setFieldValue}) => {
            return (
              <Form>
                <Row justify="space-between" gutter={[16, 8]}>
                  <Col span={24}>
                    <Field
                      name="projectId"
                      component={SelectBox}
                      placeholder="Program"
                      errorText={touched.projectId ? errors.projectId : ""}
                      options={renderProjects()}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name="title"
                      component={Input}
                      placeholder="Title"
                      errorText={touched.title ? errors.title : ""}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name="shortTitle"
                      component={Input}
                      placeholder="Short Title"
                      errorText={touched.shortTitle ? errors.shortTitle : ""}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name="postalCode"
                      component={Input}
                      placeholder="Pincode"
                      errorText={touched.postalCode ? errors.postalCode : ""}
                      onChange={(e) => {
                        setPincodeChange(true);
                      }}
                      onBlur={(e) => {
                        if (pincodeChange) {
                          handlePincodeChange(e.target.value, setFieldValue);
                          setPincodeChange(false);
                        }
                      }}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name={`state`}
                      component={SelectBox}
                      placeholder="State"
                      errorText={touched.state ? errors.state : ""}
                      options={dropDownData.state}
                      onChange={(e) => handleStateChange(e)}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      name={`district`}
                      component={SelectBox}
                      placeholder="District"
                      errorText={touched.district ? errors.district : ""}
                      options={dropDownData.district}
                      onChange={(e) => handleDistrictChange(values.state, e)}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      // visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                      name={`taluk`}
                      component={SelectBox}
                      placeholder="Taluk"
                      // errorText={touched.taluk ? errors.taluk : ""}
                      options={dropDownData.taluk}
                      onChange={(taluk) => handleTalukChange(taluk)}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      // visible={projectIdorName("", projectId) === PROJECT.ARPAN}
                      name={`village`}
                      component={SelectBox}
                      options={dropDownData.village}
                      placeholder="Village"
                      // errorText={touched.village ? errors.village : ""}
                    />
                  </Col>
                </Row>
                <Row justify="center" className="beneficiaryForms mt-2">
                  <Col lg={4} sm={12}>
                    <Button
                      key="back"
                      htmlType="submit"
                      type="primary"
                      disabled={
                        (
                          values.title === '' ||
                          values.shortTitle === '' ||
                          values.postalCode === '' ||
                          values.state === '' ||
                          values.district === '' ||
                          values.projectId === ''
                        ) ||
                        !!(
                          errors.title ||
                          errors.shortTitle ||
                          errors.postalCode ||
                          errors.state ||
                          errors.district ||
                          errors.projectId
                        )
                      }
                    >
                      {props.data ? "UPDATE" : "ADD"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      )}
      {addSuccess && (
        <div className="align-items-center justify-content-center pt-4">
          <div className="row flex-column text-center">
            <div className="col">
              <Title level={3}>You've {props.data ? 'update' : 'add'} a Center!</Title>
            </div>
            <div className="col">
              <Button key="back" onClick={() => handleCancel(true)} type="link">
                View all centers
              </Button>
            </div>
          </div>
          <div className="row mt-4 justify-content-end">
            <img src={successBg} alt="Add Success"/>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CenterForm;
