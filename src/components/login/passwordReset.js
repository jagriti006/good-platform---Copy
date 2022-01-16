import React, { Component } from "react";
import { notification } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import userAPI from "../../api/userAPI";
import smartphoneman from "../../assets/images/smartphone2.png";
import logo from "../../assets/images/header/logo.png";
import { Typography, Slider } from "antd";
import {preventCopyPaste} from "../../utils/utils";


const { Paragraph } = Typography;

class PasswordReset extends Component {
  state = {
    warning: "",
    responseData: "",
    roleid: "",
    password: "",
    confirmPassword: "",
    success: "",
    plabel:true,
    cplabel:true,
  };

  async componentDidMount() {
    const response = await userAPI().fetchRoles();
    if(response.success) {
      const isValidator = sessionStorage.getItem("isValidator");
      const doubleValue = response.data.map((number)=>{   
        var result=null;
        if(!isValidator && number.role === "SOCIAL-ADMIN") {
          result = number.id;
          this.setState({ roleid: result }, () => {
            console.log("responseData", result);
          });
        } else if (isValidator && number.role === "VALIDATOR") { 
          result = number.id;
          this.setState({ roleid: result });
        }  
    });   
    
    }
  }

  handleChange(e) {
    sessionStorage.setItem([e.target.name], e.target.value);
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  }

  handlePasswordClick(e) {
    this.setState({plabel:false});
  }
  
  handleConfirmPasswordClick(e) {
    this.setState({cplabel:false});
  }

  onSubmit = async () => {
    const passsword = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    if (passsword) {
      if (passsword !== confirmPassword) {
        notification.error({ message: "Password not matching" });
      } else {
        const emailId = localStorage.getItem("userCreatedEmailId");
        const userId = localStorage.getItem("LoggedInUserId");
        const password = this.state.password;
        const roleid = this.state.roleid;
        const passwordUpdate = localStorage.getItem("passwordUpdate");
        const res = (passwordUpdate === "true" ? await userAPI().passwordCreate({email: emailId,password: password}):await userAPI().passwordUpdate(userId,{emailId: emailId,password: password,roleId: roleid}));
        if (res.success) {
          sessionStorage.setItem("LoggedInUserId", res.data.id);
          this.setState({ success: true }, () => {
            console.log("success message", this.state.success);
          });
          notification.success({ message: "Password Reset successfully" });
        }else{
          notification.error({ message: "Please enter correct credentials" });
        } 
      }
    } else {
      notification.error({ message: "Please enter password" });
    }
  };

  render() {
    const { success } = this.state;

    if (success == true) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <div className="container authForm">
          <div className="row align-items-center authFormMargin">
            <div className="col-md-6">
              <div className="authForm passwordreset">
                <h1 className="textHeading">Welcome to the Good Platform!</h1>
                <p className="textParagraph">Before we get started, let's quickly set up your account</p>
                <img height="250" src={smartphoneman} className="imgcreatepass"/>
              </div>
            </div>
            <div className="col-md-5 formStyles authForm">
              <div className="registrationContent authForm">
                <h5 className="textCenter cardHeading">Create Password</h5>
                <br></br>
                <div className="form-group input-group mb-3">
                  <label className="has-float-label pass-strength-conatiner">
                    <PasswordInput
                      inputProps={{
                        id: "password",
                        name: "password",
                        type: "password",
                      }}
                      placeholder= {this.state.plabel? "Password" : ""}
                      onChange={(e) => this.handleChange(e)}
                      onCopy={(e) => preventCopyPaste(e)}
                      onCut={(e) => preventCopyPaste(e)}
                      onClick={(e) => this.handlePasswordClick(e)}
                      onBlur={(e) => {!this.state.password ? this.setState({plabel:true}) : this.setState({plabel:false})}}
                    />
                    {!this.state.plabel? <span>Password</span>:""}
                    {this.state.password && (
                      <Paragraph
                        type="secondary"
                        style={{
                          fontSize: 10,
                          display: "flex",
                          justifyContent: "flex-end",
                          marginBottom: 0,
                          marginTop: 4,
                        }}
                      >
                        <b>Strength</b>
                      </Paragraph>
                    )}
                  </label>
                </div>
                <div className="form-group input-group">
                  <label className="has-float-label pass-nostrength">
                    <PasswordInput
                      inputProps={{
                        id: "confirmPassword",
                        name: "confirmPassword",
                        type: "password",
                      }}
                      placeholder= {this.state.cplabel? "Re-confirm Password" : ""}
                      onChange={(e) => this.handleChange(e)}
                      onCopy={(e) => preventCopyPaste(e)}
                      onCut={(e) => preventCopyPaste(e)}
                      onClick={(e) => this.handleConfirmPasswordClick(e)}
                      onBlur={(e) => {!this.state.confirmPassword ? this.setState({cplabel:true}) : this.setState({cplabel:false})}}
                    />
                    {!this.state.cplabel? <span>Re-confirm Password</span>:""}
                  </label>
                </div>
                <div className="form-group textCenter authForm">
                  <button type="submit" className="btn passwordResetButton" onClick={() => this.onSubmit()}>
                    CREATE PASSWORD
                  </button>
                </div>

                <p className="authForm text-inverse text-center registartionText">
                  Already have an account?{" "}
                  <Link to="/">
                    <span className="loginhere-link">
                      <u>Sign in</u>
                    </span>
                  </Link>
                </p>

                {/* <br></br> */}
                {/* <p className="authForm text-inverse text-center">Already have an account?<Link to="/userRegisteration"><a className="loginhere-link">Sign in</a></Link></p> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PasswordReset;
