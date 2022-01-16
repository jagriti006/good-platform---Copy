import React, { Component } from "react";
import { withRouter, Link, useHistory, NavLink } from "react-router-dom";
import "../../assets/css/pages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhoneVolume,
  faCalendar,
  faWhatsappSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Beneficiaries from "../organisationForm/beneficiaries";

class BeneficiariesListing extends Component {
  render() {
    return (
      <>
        <div className="container-fluid p-0">
          <div className="banner-section">
            <div className="row listing-page-banner">
              <div className="col-md-8 col-sm-12">
                <div className="pad-left-14">
                  <div className="row">
                    <h3 class="col-md-9">Ummeed</h3>
                  </div>

                  <p>Healthcare | COVID-19</p>
                  <p>
                    <FontAwesomeIcon icon={faCalendar} /> Due on 20 June 2021
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div class="vertical-listing"></div>
                <div className="right-align">
                  <p className="m-0">
                    <b>Project Manager</b>
                  </p>
                  <p className="m-0">Shivashish Patel</p>
                  <br />
                  <h3 className="m-0">
                    <FontAwesomeIcon icon={faPhoneVolume} />{" "}
                    <FontAwesomeIcon icon={faEnvelope} />
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-sm-12 bgcolor-count">
              <h5>Beneficiaries added</h5>
              <h4>0</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-sm-12">
              <br />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-2 col-sm-12 ml-4 pt-3 addbuttonbg">
              <Form.Item>
                <Button
                  type="dashed"
                  className="add-benif"
                  // onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add a benificiary
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-2 col-sm-12 ml-4 pt-5">
              <h4>NEED HELP?</h4>
              <p>Learn how to add a benificiary and manage the information</p>

              <a href="#">Learn more</a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BeneficiariesListing;
