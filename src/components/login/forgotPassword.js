import React, { Component } from "react";
import { Input, message, notification } from "antd";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import userAPI from "../../api/userAPI";
import logo from "../../assets/images/header/logo.png";
import smartphoneman from "../../assets/images/smartphone2.png";
import {preventCopyPaste} from "../../utils/utils";

class ForgotPassword extends Component {
  state = { emailid: "", success: "", responseData: "", redirect: "" };

  handleChange(e) {
    sessionStorage.setItem([e.target.name], e.target.value);
    this.setState({ [e.target.name]: e.target.value }, () => {
      // console.log(this.state);
    });
  }

  onSubmit = async() => {
    const emailid = this.state.emailid;
    const response = await userAPI().forgetPassword({email: emailid});
    if(response.success){
      const data = response.data;
      console.log("data is",data);
      localStorage.setItem("userCreatedId", data.userId);
      localStorage.setItem("userCreatedEmailId", data.email);
      localStorage.setItem("emailId", data.email);
      localStorage.setItem("passwordUpdate", true);
      this.setState({ redirect: true }, () => {
        console.log("redirect");
      });
    }else{
      notification.error({ message: "User doesn't exists" });
    }
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
                <h1 className="textHeading">Welcome back to the Good Platform!</h1>
                <p className="textParagraph">Enter your registered details here to get started</p>
                <img height="350" src={smartphoneman} />
              </div>
            </div>
            <div className="col-md-5 authForm">
              <div className="registrationContent">
                <h5 className="textCenter cardHeading">Forgot your password</h5>
                <p className="authForm text-inverse text-center registartionText">
                  It happens to the best of us, we'll send you a link to reset your password
                </p>
                <br></br>
                <div className="formStyles form-group input-group">
                  <label className="has-float-label">
                    <Input
                      className="form-control"
                      name="emailid"
                      id="emailid"
                      placeholder=" "
                      onChange={(e) => this.handleChange(e)}
                      placeholder=" "
                      onCopy={(e) => preventCopyPaste(e)}
                      
                      onCut={(e) => preventCopyPaste(e)}
                    />
                    <span>Registered Email ID</span>
                  </label>
                </div>

                <div className="form-group textCenter authForm">
                  <button onClick={() => this.onSubmit()} type="submit" className="btn forgotPasswordSubmitButton">
                    Reset my password
                  </button>
                </div>

                <br></br>
                <p className="authForm text-inverse text-center registartionText">
                  Don't have account?
                  <Link to="/userRegisteration">
                    <span className="authForm loginhere-link"> Sign Up</span>
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

export default ForgotPassword;
