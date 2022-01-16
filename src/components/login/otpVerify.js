import React, { Component } from "react";
import { Input, notification } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import OtpInput from "react-otp-input";
import { Redirect } from "react-router";
import userAPI from "../../api/userAPI";
import smartphoneman from "../../assets/images/smartphone2.png";
import Countdown from "react-countdown";
import { preventCopyPaste } from "../../utils/utils";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>OTP expired please try to resend again</span>;
  } else {
    // Render a countdown
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  }
};

class OtpVerify extends Component {
  state = { otp: "", redirect: "", responseData: "", success: "" };
  constructor(props) {
    super(props);
    this.currentPathname = null;
    this.currentSearch = null;
  }
  handleChange = (otp) => this.setState({ otp });

  submit = async () => {
    const userCreatedEmailId = localStorage.getItem("emailId");
    const userCreatedId = localStorage.getItem("userCreatedId");
    const response = await userAPI().emailOtpVerify(userCreatedId, {
      email: userCreatedEmailId,
      emailOtp: this.state.otp,
    });
    if (response.success == true) {
      this.setState({ responseData: response.data }, () => {
        this.setState({ success: true }, () => {
          console.log("success message", this.state.success);
        });
        localStorage.setItem("LoggedInUserId", this.state.responseData.id);
        notification.success({ message: "OTP verified successfully" });
      });
    } else {
      notification.error({ message: "Please enter correct OTP" });
    }
  };

  resendOTP = async () => {
    const userCreatedEmailId = localStorage.getItem("emailId");
    const response = await userAPI().sendOtpToEmail(userCreatedEmailId);
    console.log("resend otp response is", response);
    if (response.success) {
      notification.success({ message: "New OTP is sent to your Email ID" });
    } else {
      notification.error({ message: "Please retry again" });
    }
  };

  componentDidMount() {
    const { history } = this.props;

    history.listen((newLocation, action) => {
      if (action === "PUSH") {
        if (newLocation.pathname !== this.currentPathname || newLocation.search !== this.currentSearch) {
          this.currentPathname = newLocation.pathname;
          this.currentSearch = newLocation.search;

          history.push({
            pathname: newLocation.pathname,
            search: newLocation.search,
          });
        }
      } else {
        history.go(1);
      }
    });
  }

  componentWillUnmount() {
    window.onpopstate = null;
  }

  render() {
    const checkValue = localStorage.getItem("passwordUpdate");
    const emailid = localStorage.getItem("userCreatedEmailId");
    var checkMobile = localStorage.getItem("userCreatedMobileNo");
    if (checkMobile) {
      var getMobileNo = "xxxxxxx" + localStorage.getItem("userCreatedMobileNo").slice(-4);
    } else {
      var getMobileNo = "xxxxxxxxxxx";
    }

    const { redirect } = this.state;

    const { success } = this.state;

    if (success == true) {
      return <Redirect to="/passwordReset" />;
    }

    return (
      <>
        <div className="container authForm">
          <div className="row align-items-center authFormMargin">
            <div className="col-md-6">
              <div className="authForm passwordreset">
                <h1 className="textHeading">Welcome to the Good Platform!</h1>
                <p className="textParagraph">Before we get started, let's quickly set up your account</p>
                <img height="250" src={smartphoneman} className="imgcreatepass" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="registrationContent">
                <h5 className="textCenter cardHeading">Verify your details</h5>
                <br></br>
                <p className="marginAuto textCenter otpVerifyMessage">
                  {checkValue == "false"
                    ? `Enter the 4-digit OTP sent to mobile number +91- ${getMobileNo}`
                    : `Enter the 4-digit OTP sent to your Email Id ${emailid}`}
                </p>
                <br></br>
                <div className="form-group d-flex content-center">
                  <OtpInput
                    value={this.state.otp}
                    onChange={this.handleChange}
                    numInputs={4}
                    inputStyle="inputWidth"
                    separator={<span>-</span>}
                    onCopy={(e) => preventCopyPaste(e)}
                    onCut={(e) => preventCopyPaste(e)}
                  />
                </div>
                <p className="textCenter">
                  <Countdown date={Date.now() + 180000} renderer={renderer} />
                </p>

                <div className="form-group textCenter authForm">
                  <button type="submit" className="btn loginButton" onClick={() => this.submit()}>
                    Verify
                  </button>
                </div>

                <p className="authForm text-inverse text-center registartionText">
                  Didn't get OTP?
                  <Link>
                    <span className="loginhere-link resendButton">
                      <button
                        className="authForm loginhere-link resendButton"
                        type="submit"
                        onClick={() => this.resendOTP()}
                      >
                        <u>Resend</u>
                      </button>
                    </span>
                  </Link>
                </p>

                <p className=" authForm text-inverse text-center registartionText">
                  Already have an account?{" "}
                  <span className="loginhere-link">
                    <u>Sign in</u>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(OtpVerify);
