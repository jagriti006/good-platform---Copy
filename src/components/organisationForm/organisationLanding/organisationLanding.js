import React, {useState} from "react";
import computeWoman from "../../../assets/images/computeWoman.png";
import {FormikProvider, useFormik, Form, Field} from "formik";
import Input from "../../FormikComponents/Input/Input";
import "./organisationLanding.scss";
// import "../overviewBox/overviewBox.scss";
import {Link} from "react-router-dom";
import {Col, Row} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import vector from "../../../assets/images/preview/vector.png"
import Organisationapi from "../../../api/organizationapi";
import appRoutes from "../../../constants/app-routes";
import { SearchOutlined } from "@ant-design/icons";

const OrganisationLanding = (props) => {
  const [cidChange,setCidChange] = useState(false);
  const [companyData,setCompanydata] = useState(null);

  const formik = useFormik({
    initialValues: {
      cin: ""
    }
  });

  const searchOrganisation = async () => {
    if (formik.values.cin){
      const response = await Organisationapi().searchCompanyDetails(formik.values);

      if (response){
        setCompanydata(response);
      }
    }else{
      setCompanydata(null);
    }
  }

  const renderAddress = () => {
    let address = "";

    if (companyData?.result?.splitAddress?.addressLine){
      address += companyData.result?.splitAddress?.addressLine + ', ';
    }
    if (companyData?.result?.splitAddress?.city){
      address += companyData.result?.splitAddress?.city[0] + ', ';
    }
    if (companyData?.result?.splitAddress?.district){
      address += companyData.result?.splitAddress?.district[0] + ', ';
    }
    if (companyData?.result?.splitAddress?.state){
      address += companyData.result?.splitAddress?.state[0][0] + ', ';
    }
    if (companyData?.result?.splitAddress?.pincode){
      address += companyData.result?.splitAddress?.pincode + ', ';
    }
    if (companyData?.result?.splitAddress?.country){
      address += companyData.result?.splitAddress?.country[0] + ', ';
    }

    return address.substr(0,address.length - 2);
  }

  return (
    <div className="row organizationLandingPage">
      <div className="col-md-7">
        <p className="formInfop">
          Want to save time? Enter the name or the registration number of your company (e.g....) and retrieve your company details
        </p>
        <FormikProvider value={formik}>
          <Form className="formStyles">
            <div className="row pt-3">
              <div className="col-sm-10">
                <Field
                  name="cin"
                  class="form-control"
                  component={Input}
                  placeholder="Registration Number or Company Name"
                  onChange={(e) => {
                    setCidChange(true);
                  }}
                />
              </div>
              <div className="col-md-2 col-sm-2 displayFlex justify-content-center align-items-center">
                <div className="search_div">
                  <SearchOutlined
                    className={"searchIcon"}
                    onClick={() => {
                      if (cidChange){
                        searchOrganisation()
                        setCidChange(false);
                      }
                    }}
                  />
                </div>
              </div>
              {companyData && companyData?.result && (
                <div className="col-md-12" style={{paddingTop: "2rem"}}>
                  <p className="p_custom">Here’s what we found</p>
                  <div
                    className="formStyles organisationStepper"
                  >
                    <Link
                      to={{
                        pathname: `${appRoutes.ORGANISATION}${appRoutes.OVERVIEW}/${companyData?.id}`,
                        state: companyData,
                      }}
                      gutter={[16, 16]}
                      onClick={() => sessionStorage.setItem("organisationId",companyData?.id)}>
                      <Row align="middle" justify="center">
                        <Col
                          xs={24}
                          lg={22}
                          className="p-left"
                          style={{paddingLeft: "0rem"}}
                        >
                          <p className="p_padding">{companyData?.result?.companyName || "-"}</p>
                          <p className="p_padding">Registration no: {companyData?.result?.registrationNumber || "-"}</p>
                          <p className="p_padding">
                            {renderAddress()}
                          </p>
                          <p className="p_padding">www.XYZ.in</p>
                        </Col>
                        <Col
                          xs={24}
                          lg={2}
                          className="d-flex justify-content-end"
                        >
                          <img src={vector} alt=""/>
                        </Col>
                      </Row>
                    </Link>
                  </div>
                </div>
              )}
              <div className="col-md-12 right-align pt-2">
                <p className="common_font">
                  Not Your Organisation?
                  <span className="p_span common_font anchor_color" onClick={props.onclick}>
                    Add it manually
                  </span>
                </p>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <div className="col-md-3">
        <img src={computeWoman} alt=""/>
      </div>
    </div>
  );
}

export default OrganisationLanding;