import React, { useState } from "react";
import { Input, Divider } from "antd";
import { Link } from "react-router-dom";
import { Redirect, Route } from "react-router";
import smartphoneman from "../../assets/images/smartphone2.png";
import logo from "../../assets/images/header/logo.png";
import { doLogin } from "../../redux/user/userActions";
import { useDispatch } from "react-redux";
import { PasswordInput } from "antd-password-input-strength";
import {preventCopyPaste} from "../../utils/utils";

const Login = () => {
  const [userEmailId, setUserEmailId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [plabel,setPlabel] = useState(true);
  const dispatch = useDispatch();
  const onSubmit = () => {
    
    dispatch(
      doLogin({
        username: userEmailId,
        password: userPassword,
      })
    );
  };
  const handlePasswordClick = (e) => {
    setPlabel(false);
  }

  return (
    <div className="bgcoloroverview w-100">
      <div className="container authForm formStyles">
        <div className="row align-items-center pt-5">
          <div className="col-md-6">
            <div className="authForm passwordreset">
              <h1 className="textHeading">Welcome back to the Good Platform!</h1>
              <p className="textParagraph">Enter your registered details here to get started</p>
              <img height="250" src={smartphoneman} className="imgcreatepass"/>
            </div>
          </div>
          <div className="col-md-5">
            <div className="registrationContent">
              <h5 className="textCenter cardHeading">Login to your account</h5>
              <br></br>

              <div className="row">
                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Input
                        className="form-control"
                        name="userEmailId"
                        id="emailid"
                        value={userEmailId}
                        onChange={(e) => setUserEmailId(e.target.value)}
                        placeholder=" "
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      />
                      <span>Registered Email ID</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="row formStyles">
                <div className="col-sm-12">
                  <label className="has-float-label pass-nostrength">
                    <PasswordInput
                      inputProps={{
                        id: "password",
                        name: "userPassword",
                        type: "password",
                      }}
                      placeholder= {plabel? "Password" : ""}
                      onChange={(e) => setUserPassword(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          onSubmit();
                        }
                      }}
                      onCopy={(e) => preventCopyPaste(e)}
                      onCut={(e) => preventCopyPaste(e)}
                      onClick={(e) => handlePasswordClick(e)}
                      onBlur={(e) => {!userPassword ? setPlabel(true) : setPlabel(false)}}
                    />
                    {!plabel? <span>Password</span>:""}
                  </label>
                </div>
              </div>

              <div className="form-group textCenter authForm">
                <button type="submit" className="btn loginButton" onClick={() => onSubmit()}>
                  LOGIN
                </button>
                <div className="mt-2">
                  <Link className="forgotPasswordButton" to="/forgotPassword">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* <div className="relative authForm">
                <Divider>OR</Divider>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-12 authForm">
                  <a className="btn btn-lg btn-google btn-block" href="#">
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png"></img>
                    <span style={{ marginLeft: "20px" }}>
                      LOG IN WITH GOOGLE
                    </span>
                  </a>
                </div>
              </div> */}
              <br></br>
              <p className="authForm text-inverse text-center registartionText">
                A new user?
                <Link to="/userRegisteration">
                  <span className="authForm loginhere-link">
                    {" "}
                    <u>Create an account</u>
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
