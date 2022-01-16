import React, { Component } from "react";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Party2 from "../../../assets/images/party2.png";
import Party1 from "../../../assets/images/party1.png";
import icon1 from "../../../assets/images/i1.png";
import icon2 from "../../../assets/images/i2.png";
import icon3 from "../../../assets/images/i3.png";
import { Spin, Typography } from "antd";
import { ApartmentOutlined, ForkOutlined, FileOutlined, LoadingOutlined } from "@ant-design/icons";
import "./successMessage.scss";
import { ROLES } from "../../../constants/strings";
import appRoutes from "../../../constants/app-routes";

const { Title } = Typography;

class SuccessMessage extends Component {
  state = { redirect: false };

  componentDidMount() {
    this.userRole = sessionStorage.getItem("userRole");
    this.id = setTimeout(() => this.setState({ redirect: true }), 3000);
    this.isValidator = this.userRole === ROLES.VALIDATOR;
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return this.state.redirect ? (
      <Redirect to={this.isValidator ? `${appRoutes.VALIDATOR}${appRoutes.VALIDATOR_REGISTRATION}` : "/organisation"} />
    ) : (
      <div className={"formStyles"}>
        <div className="container displayFlex justify-content-center align-items-center">
          <div className="row displayFlex flex-column">
            <div className="main displayFlex justify-content-center align-items-center flex-column">
              <div className="row displayFlex align-items-center my-5 justify-content-center">
                <img width={60} src={Party1} />
                <h1 className={"successText font-weight-bold text-center"}>Your account has been created</h1>
                <img width={60} src={Party2} />
              </div>
              <div className="registrationContent displayFlex p-5 align-items-center justify-content-center flex-column">
                <Title className={"registrationContentTitle text-center mb-5"}>
                  While we redirect you, have the following information handy:
                </Title>
                {this.isValidator ? 
                <div className={"displayFlex justify-content-between align-items-center"}>
                  <p className={"displayFlex m-0 mx-5 flex-column text-center registrationContentLabel"}>
                    <img className="imageProperty" src={icon3} />
                    <strong className={"font-weight-normal headings m-2"}>Basic details</strong>
                    <strong className={"font-weight-normal headings"}>for registration</strong>
                  </p>
                  <p className={"displayFlex m-0 mx-5 flex-column text-center registrationContentLabel"}>
                    <img className="imageProperty" src={icon1} />
                    <strong className={"font-weight-normal headings m-2"}>Documents</strong>
                    <strong className={"font-weight-normal headings"}>to upload</strong>
                  </p>
                </div> :
                 <div className={"displayFlex justify-content-between align-items-center"}>
                  <p className={"displayFlex m-0 mx-5 flex-column text-center registrationContentLabel"}>
                    <img className="imageProperty" src={icon3} />
                    <strong className={"font-weight-normal headings m-2"}>Organization's</strong>
                    <strong className={"font-weight-normal headings"}>overview</strong>
                  </p>
                  <p className={"displayFlex m-0 mx-5 flex-column text-center registrationContentLabel"}>
                    <img className="imageProperty" src={icon2} />
                    <strong className={"font-weight-normal headings m-2"}>Organization's</strong>
                    <strong className={"font-weight-normal headings"}>purpose</strong>
                  </p>
                  <p className={"displayFlex m-0 mx-5 flex-column text-center registrationContentLabel"}>
                    <img className="imageProperty" src={icon1} />
                    <strong className={"font-weight-normal headings m-2"}>Registration</strong>
                    <strong className={"font-weight-normal headings"}>Documents</strong>
                  </p>
                </div>
                }
              </div>
            </div>
            <Spin className={"mt-5"} indicator={<LoadingOutlined className={"containerSpinIcon"} />} />
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessMessage;
