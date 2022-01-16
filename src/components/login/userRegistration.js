import React, { Component } from "react";
import { Input, message, Form, notification, Divider } from "antd";
import { Redirect } from "react-router";
import smartphoneman from "../../assets/images/smartphone2.png";
import { Link } from "react-router-dom";
import userAPI from "../../api/userAPI";
import {preventCopyPaste} from "../../utils/utils";

class UserRegistration extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    redirect: "",
    responseData: "",
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const isValidator = urlParams.get('user');
    if (isValidator && isValidator === "validator") {
      sessionStorage.setItem("isValidator", true);
    } else if(!isValidator && sessionStorage.getItem("isValidator")) {
      sessionStorage.removeItem("isValidator");
    }
  }

  handleChange = (event) => {
    let stateName = event.target.name;
    let value = event.target.value;
    if (stateName == "phoneNumber") {
      const re = /^[0-9\b]+$/;
      if (event.target.value === "" || re.test(event.target.value)) {
        this.setState({ [event.target.name]: value });
        sessionStorage.setItem([event.target.name], value);
        localStorage.setItem([event.target.name], value);
      }
    } else {
      this.setState({ [event.target.name]: value });
      sessionStorage.setItem([event.target.name], value);
      localStorage.setItem([event.target.name], value);
    }
  };

  sendData = async () => {
    if(this.state.phoneNumber.length < 10){
      notification.error({ message: "Please fill mobile number properly" });
      return false;
    }

    if (this.state.emailId == "" || this.state.phoneNumber == "") {
      notification.error({ message: "Please fill all the fields" });
      return false;
    }

    const re_email =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re_email.test(this.state.emailId)) {
      notification.error({ message: "Please enter correct Email ID" });
      return false;
    }
    const res = await userAPI().createUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
      phone: this.state.phoneNumber,
    });
    if (res.success) {
      this.setState({ responseData: res.data }, () => {
        localStorage.setItem("userCreatedId", this.state.responseData.id);
        localStorage.setItem("userCreatedEmailId", this.state.emailId);
        localStorage.setItem("userCreatedMobileNo", this.state.phoneNumber);
        localStorage.setItem("passwordUpdate", false);
        this.setState({ redirect: true }, () => {
          console.log("redirect");
        });
      });
      notification.success({ message: "OTP sent to your Email ID" });
    } 
    // else {
    //   notification.error({ message: "User already exists" });
    // }
  };

  render() {
    const { redirect } = this.state;

    if (redirect == true) {
      return <Redirect to="/otpVerify" />;
    }

    return (
      <>
        <div className="container authForm">
          <div className="row align-items-center authFormMargin">
            <div className="col-md-6">
              <div className="authForm">
                <h1 className="textHeading">Welcome to the Good Platform!</h1>
                <p className="textParagraph">Before we get started, let's quickly set up your account</p>
                <img height="350" src={smartphoneman} />
              </div>
            </div>
            <div className="col-md-5 formStyles">
              <div className="registrationContent ">
                <h5 className="textCenter cardHeading">Create your account</h5>
                <br></br>

                <div className="form-group input-group">
                  <label className="has-float-label">
                    <Input
                      className="form-control"
                      type="text"
                      maxLength="45"
                      name="firstName"
                      id="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      placeholder=" "
                      onCopy={(e) => preventCopyPaste(e)}
                      
                      onCut={(e) => preventCopyPaste(e)}
                    />
                    <span>First Name*</span>
                  </label>
                </div>

                <div className="form-group input-group">
                  <label className="has-float-label">
                    <Input
                      className="form-control"
                      type="text"
                      maxLength="45"
                      name="lastName"
                      id="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      placeholder=" "
                      onCopy={(e) => preventCopyPaste(e)}
                      
                      onCut={(e) => preventCopyPaste(e)}
                    />
                    <span>Last Name*</span>
                  </label>
                </div>
                <div className="form-group input-group">
                  <label className="has-float-label">
                    <Input
                      className="form-control"
                      type="email"
                      name="emailId"
                      id="emailId"
                      value={this.state.emailId}
                      onChange={this.handleChange}
                      placeholder=" "
                      onCopy={(e) => preventCopyPaste(e)}
                      
                      onCut={(e) => preventCopyPaste(e)}
                    />
                    <span>Email Address*</span>
                  </label>
                </div>
                <div className="form-group input-group">
                  <label className="has-float-label">
                    <Input
                      className="form-control"
                      name="phoneNumber"
                      id="phoneNumber"
                      maxLength="10"
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                      placeholder=" "
                      onCopy={(e) => preventCopyPaste(e)}
                      
                      onCut={(e) => preventCopyPaste(e)}
                    />
                    <span>Mobile No*</span>
                  </label>
                </div>

                <div className="form-group textCenter authForm">
                  <button type="submit" className="btn registrationButton" onClick={this.sendData}>
                    CREATE ACCOUNT
                  </button>
                </div>

                {/* <div className="relative authForm">
                  <Divider>OR</Divider>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-md-12 authForm">
                    <a className="btn btn-lg btn-google btn-block " href="#">
                      <img src="https://img.icons8.com/color/16/000000/google-logo.png"></img>
                      <span style={{ marginLeft: "20px" }}>SIGN UP WITH GOOGLE</span>
                    </a>
                  </div>
                </div> */}
                <br></br>
                <p className="authForm text-inverse text-center registartionText">
                  Already have an account?{" "}
                  <Link to="/">
                    <span className="authForm loginhere-link">
                      <u>Sign in</u>
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserRegistration;
