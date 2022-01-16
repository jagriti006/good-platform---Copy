import React, { Component } from "react";
import { InputField } from "../form/inputField";
import {Typography} from "antd";

const { Text, Link } = Typography;

class Step2 extends Component {
  state = {
    parameters: [
      {
        id: 1,
        name: "otp",
        placeholder: "Enter OTP",
        labelName: "Enter OTP number sent to your mobile number / email",
        type: "text",
        spacing: "12",
        background: "none",
      },
    ],
  };
  render() {
    return (
      <>
        <div className="marginBottom6">
          <label>Aadhar Number</label>
          <br />
          <span>XXXX XXXX 3625</span>
        </div>
        {this.state.parameters.map((item, index) => {
          return (
            <InputField
              id={item.id}
              name={item.name}
              placeholder={item.placeholder}
              labelName={item.labelName}
              spacing={item.spacing}
              background={item.background}
            />
          );
        })}
        <Text className={'displayFlex justify-content-center align-center'}>00:35</Text>
        <div className={'displayFlex justify-content-center align-center'} style={{ marginTop: '5rem' }}>
          <Text className={'fontSize12'}>Didn't get OTP?</Text>
          <Link href={''} className={'fontSize12'} style={{ fontWeight: 'bold', marginLeft: '0.5rem' }}>
            <span style={{ color:'#3a8d9e', fontWeight: 'bold' }}>
              Resend
            </span>
          </Link>
        </div>
      </>
    );
  }
}

export default Step2;
