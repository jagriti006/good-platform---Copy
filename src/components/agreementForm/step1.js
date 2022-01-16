import React, { Component } from "react";
import { InputField } from "../form/inputField";
import { Button, Checkbox, Row, Col, Typography, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Organisationapi from "./../../api/organizationapi";
import CommonFileUpload from "./../common/common-file-upload";
import beneficiaryAPI from "./../../api/beneficiaryAPI";

const { Text, Link } = Typography;

class Step1 extends Component {
  state = {
    parameters: [
      {
        id: 1,
        name: "aadharNumber",
        placeholder: "",
        labelName: "",
        type: "text",
        spacing: "12",
        background: "none",
        value: "",
      },
    ],
    orgName: "",
    showUpload: false,
  };
  benificiaryApiMethod = beneficiaryAPI().uplaodImageAndGetURL;
  imageUrls = [];
  async componentDidMount() {
    const response = await Organisationapi().fetchOrganization();
    if (response.data) {
      this.setState({ orgName: response.data?.name });
    }
  }

  setValue = (e, i) => {
    const parameters = this.state.parameters.slice();
    parameters[i].value = e.target.value;
    this.setState({
      parameters,
    });
    this.props.aadharPayload(this.state.parameters[i].value);
  };

  setFiles = (url) => {
    if (this.imageUrls.length) {
      this.imageUrls[1] = url;
      this.props.aadharPayload(this.imageUrls);
    } else {
      this.imageUrls[0] = url;
    }
  };

  render() {
    return (
      <>
        <Text>Please enter your Aadhar / VID Number</Text>
        <Row justify={"space-between"}>
          {this.state.parameters.map((item, index) => {
            return (
              <Col md={18} lg={18}>
                <InputField
                  id={item.id}
                  name={item.name}
                  placeholder={item.placeholder}
                  labelName={item.labelName}
                  spacing={item.spacing}
                  background={item.background}
                  type="number"
                  maxLength={12}
                  onChange={(v) => this.setValue(v, index)}
                />
              </Col>
            );
          })}
          <Col md={4} lg={4}>
            <Button
              icon={<UploadOutlined />}
              size="large"
              style={{ borderRadius: 5 }}
              onClick={() =>
                this.setState((prevState) => ({
                  showUpload: !prevState.showUpload,
                }))
              }
            />
          </Col>
        </Row>
        <Checkbox
          id="Agree"
          value="agree"
          style={{ marginTop: "1rem" }}
          onChange={(e) => this.props.checked(e.target.checked)}
        >
          I have read the Terms Of Service and agree to eSign the document.
        </Checkbox>
        <div className={"displayFlex align-center"} style={{ marginTop: "5rem" }}>
          {/* <Link href={''} className={'fontSize12'} style={{ marginLeft: '1.5rem' }}>
            <span style={{ textDecoration: 'underline' }}>
              Terms & Conditions
            </span>
          </Link> */}
        </div>
        {this.state.showUpload && (
          <Modal
            title="Upload Aadhar"
            visible={true}
            onCancel={() =>
              this.setState((prevState) => ({
                showUpload: !prevState.showUpload,
              }))
            }
            destroyOnClose
            centered
            footer={null}
          >
            <div className="p-4">
              <div className="row flex-column">
                <div className="col mb-3">
                  <CommonFileUpload
                    label="Aadhar Front Image"
                    id="front"
                    uploadApiService={this.benificiaryApiMethod}
                    setUrl={this.setFiles}
                    fileExt="image/*"
                  ></CommonFileUpload>
                </div>
                <div className="col">
                  <CommonFileUpload
                    label="Aadhar Back Image"
                    id="back"
                    uploadApiService={this.benificiaryApiMethod}
                    setUrl={this.setFiles}
                    fileExt="image/*"
                  ></CommonFileUpload>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default Step1;
