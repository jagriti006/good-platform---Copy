import React, { Component } from "react";
import { Redirect } from "react-router";
import { Select, Input, message, notification } from "antd";
import userAPI from "../../api/userAPI";
import document from "../../assets/images/illustrators/document.png";
import {preventCopyPaste} from "../../utils/utils";
const Option = Select.Option;

class VolunteerRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      emailid: "",
      contactNumber: "",
      address: "",
      programme: "",
      education: "",
      redirect: false,
      userid: "",
      projectName: "",
    };
  }

  componentDidMount = async () => {
    const response = await userAPI().getUserDetails();
    if (response.success) {
      this.setState({ userid: response.data.userId }, () => {
        console.log("userid", this.state.userid);
      });
      let projectIdPayload = response.data.projects;
      let projectIdsList = [];
      projectIdPayload.map((item) => {
        projectIdsList.push(item);
      });
      sessionStorage.setItem("projectId", projectIdsList[0].id);
      this.setState({ projectName: projectIdsList[0].project }, () => {
        console.log("projectId", this.state.projectName);
      });
      let programName = "";
      if (projectIdsList[0].project == "Ummeed") {
        programName = "Ummeed";
      } else {
        programName = "Arpan";
      }
      this.setState({ programme: programName }, () => {
        console.log("programme", this.state.programme);
      });
      const res = await userAPI().getUserDetailById(response.data.userId);
      if (res.success) {
        let resp = res.data;
        this.setState({
          firstName: resp.firstName,
          emailid: resp.emailId,
          middleName: resp.middleName,
          lastName: resp.lastName,
          contactNumber: resp.contactNumber,
          address: resp.address.addressLine1,
          education: resp.education,
        });
        sessionStorage.setItem("organisationId", resp.organisationId);
      }
    }
  };

  handleChange = (event) => {
    let stateName = event.target.name;
    let value = event.target.value;
    this.setState({ ...this.state, [event.target.name]: value });
  };

  handleEducationChange = (event) => {
    this.setState({ education: event });
  };

  sendData = async () => {
    const data = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      emailId: this.state.emailid,
      contactNumber: this.state.contactNumber,
      programme: this.state.programme,
      educationQualification: this.state.education,
      organisationId: sessionStorage.getItem("organisationId"),
      educationDetails: null,
      addressModel: {
        addressLine1: this.state.address,
        streetName: "",
        city: "",
        state: "",
        pincode: "",
        latitude: 0,
        longitude: 0,
      },
    };
    const response = await userAPI().updateUserDetail(data);
    if (response.success) {
      notification.success({ message: "Details Saved...!" });
      this.setState({ redirect: true });
    } else {
      notification.success({ message: "Not Saved...!" });
    }
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/dashboard" />
    ) : (
      <>
        <div className="documentpage pt-3">
          <div className="row justify-content-center pt-3">
            <div className="col-md-5 pb-4">
              <h4 className="align-center mb-4">Register as a Volunteer</h4>
              <div className=" formStyles">
                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Input
                        className="form-control"
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        placeholder=" "
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      />
                      <span>First Name</span>
                    </label>
                  </div>
                </div>

                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Input
                        className="form-control"
                        name="middleName"
                        id="middleName"
                        value={this.state.middleName}
                        onChange={this.handleChange}
                        placeholder=" "
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      />
                      <span>Middle Name (Optional)</span>
                    </label>
                  </div>
                </div>

                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Input
                        className="form-control"
                        name="lastName"
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        placeholder=" "
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      />
                      <span>Last Name</span>
                    </label>
                  </div>
                </div>

                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Input
                        className="form-control"
                        name="emailid"
                        id="emailid"
                        value={this.state.emailid}
                        onChange={this.handleChange}
                        placeholder="Email id"
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      />
                      <span>Email ID</span>
                    </label>
                  </div>
                </div>

                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Input
                        className="form-control"
                        name="contactNumber"
                        id="contactNumber"
                        value={this.state.contactNumber}
                        onChange={this.handleChange}
                        placeholder=" "
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      />
                      <span>Contact Number</span>
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Input
                        className="form-control"
                        name="address"
                        id="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                        placeholder=" "
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      />
                      <span>Address</span>
                    </label>
                  </div>
                </div>

                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Select
                        className=""
                        value={this.state.programme}
                        defaultValue={this.state.projectName == "Ummeed" ? "Ummeed" : "Arpan"}
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      >
                        <Option value={this.state.projectName == "Ummeed" ? "Ummeed" : "Arpan"} selected>
                          {this.state.projectName == "Ummeed" ? "Ummeed" : "Arpan"}
                        </Option>
                      </Select>
                      <span>Program</span>
                    </label>
                  </div>
                </div>

                <div className="col-sm-12 ">
                  <div className="form-group input-group">
                    <label className="has-float-label">
                      <Select
                        className=""
                        value={this.state.education}
                        onChange={this.handleEducationChange}
                        placeholder=" "
                        onCopy={(e) => preventCopyPaste(e)}
                        
                        onCut={(e) => preventCopyPaste(e)}
                      >
                        <Option value="1" selected>
                          Primary Education
                        </Option>
                        <Option value="2" selected>
                          HSC
                        </Option>
                        <Option value="3" selected>
                          SSC
                        </Option>
                        <Option value="4" selected>
                          Graduation
                        </Option>
                      </Select>
                      <span>Education (Optional)</span>
                    </label>
                  </div>
                </div>

                <div className="col-sm-12 formStyles  floatRight">
                  <button
                    type="submit"
                    style={{ float: "right" }}
                    className="formStyles steps-action  nextbutton"
                    onClick={this.sendData}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <img src={document} alt="" className="leadership-image" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default VolunteerRegistration;
