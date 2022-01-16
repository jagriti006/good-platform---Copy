import React, { useState, useEffect } from "react";
import { List, Tabs, Typography } from "antd";
import { Anchor } from "antd";
import axios from "axios";
// import { Link } from "react-router-dom";
import BasicInfo from "./previewProject/basicInfo/basicInfo";
import QuickInfo from "./quickinfo";
import TeamInfo from "./previewProject/teamInfo/teaminfo";
import LocationPreview from "../organisationForm/locationPreview";
import Alert from "../layouts/alert";
import Organisationapi from "../../api/organizationapi";
import Ellipse55 from "../../assets/images/Ellipse55.png";
import education from "../../assets/images/education.png";
import employment from "../../assets/images/Employmentpreview.png";
import finance from "../../assets/images/Financialservicespreview.png";
import arrow from "../../assets/images/arrow.png";
import frame from "../../assets/images/Frame.png";
import humanreview from "../../assets/images/humanreview.png";
import help from "../../assets/images/bulb.png";
import mail from "../../assets/images/mail.png";
import call from "../../assets/images/call.png";
import profile from "../../assets/images/profileic.png";
import reviewfirst from "../../assets/images/reviewfirst.png";
import reviewsecond from "../../assets/images/reviewsecond.png";
import star from "../../assets/images/Star.png";
import stars from "../../assets/images/Stars.png";
import ProgramcreationAPI from "../../api/programcreationAPI";
import OrganisationForm from "../organisationForm/organisationForm";
import Dashboard from "../dashboard/dashboard";
const { Link } = Anchor;

const { TabPane } = Tabs;
const Underreview = (props) => {
  const [cartIsShow, setCartIsShow] = useState(false);
  const [sector, setSector] = useState("");
  const [founder, setFounder] = useState("");
  const [data, setData] = useState({
    name: "",
  });
  const showCartHAndler = () => {
    setCartIsShow(true);
  };
  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  const setOrganisationName = async () => {
    const projectId = sessionStorage.getItem("projectId");
    const token = sessionStorage.getItem("access_token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    const res = await fetch(`http://3.108.162.127:8081/project-management/v1/project/${projectId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("organisation data is", data);
        if (data.success) {
          return data.data;
        }
      })
      .catch((err) => console.log(err));
    if (res) {
      const { name } = res;
      setData({
        name,
      });
    }
  };

  const replace_String = (string, numberofchar, chartoreplace) => {
    return string
      .substring(0, numberofchar)
      .split("")
      .map((ele) => (ele = chartoreplace))
      .join("")
      .concat(string.substring(numberofchar, string.length));
  };

  const fetchPurpose = async () => {
    const projectId = sessionStorage.getItem("projectId");
    if (projectId) {
      const response = await ProgramcreationAPI().fetchProjectbasicdetail(projectId);
      if (response.data) {
        console.log("purpose  data is", response.data);
      }
    }
  };

  const getFounderName = async () => {
    var axios = require("axios");
    const organisationId = sessionStorage.getItem("organisationId");
    if (organisationId) {
      const token = sessionStorage.getItem("access_token");
      var config = {
        method: "get",
        url: `http://3.108.162.127:8081/social-org/v1/organisation/leadership/${organisationId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
    axios(config)
      .then(function (response) {
        const data = response.data.data;
        if (data && data.organisationMembersList) {
          setFounder(data.organisationMembersList[0].name);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setOrganisationName();
    fetchPurpose();
    getFounderName();
  }, []);

  const steps = [
    {
      title: "Basics",
      id: 1,
      link: "basicinfo",
    },

    {
      title: "Team",
      id: 2,
      link: "teams",
    },
  ];

  const handleClick = (e, link) => {
    e.preventDefault();
  };

  function callback(key) {
    console.log(key);
  }

  return (
    <div style={{ marginTop: "0%" }}>
      <div className="customsidebar projectcreationstyle" style={{ background: "#fff" }}>
        <div className="row">
          <div className="sidebar review col-md-2">{/* <Dashboard/> */}</div>
          <div className="col-md-6 scroll previewbg projectcreationstyle" id="my-scroll-layout">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-6">
                <img src={star} />
                <img src={reviewfirst} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <p className="congrat">Congratulations!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-7 pr-0">
                <p className="congratdesc">
                  Your program is currently being validated. This process can take 3 business days
                </p>
                <img src={reviewsecond} className="bottomline" />
                <img src={stars} />
              </div>
              <div className="col-md-5 pl-0">
                <img src={humanreview} className="huma" />
              </div>
            </div>
          </div>
          {/* <div className="row"> */}
          <div className="col-md-4 organisationContainer ">
            <div className="card-container">
              <div className="row pt-5">
                <div className="col-md-7">
                  <h5 className="textCenter cardHeading previewOrgName">Pathways to Progress</h5>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                  <div className="textCenter">
                    <button type="submit" className="btn loginButton1">
                      <img src={Ellipse55} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11">
                  <button className="underreviewbutton">
                    <img src={frame} />
                    Under Review
                  </button>
                </div>
              </div>
              <div className="organisationContent">
                <h5 className="orgCardHeading">Overview</h5>
                <h5 className="reviewHeading">Date</h5>
                <div className="relative">
                  <p className="monthd">18 Months</p>
                  <div className="verticalLine">
                    <hr />
                  </div>
                </div>
                <br></br>
                <h5 className="reviewHeading">Categories</h5>
                <div className="relative">
                  <div className="verticalLine" />
                </div>

                <div className="row">
                  <div className="col-sm-1">
                    <img src={education} />
                  </div>
                  <div className="col-sm-10">
                    <p className="orgCardLoc">
                      <b>Education</b>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1">
                    <img src={employment} />
                  </div>
                  <div className="col-sm-10">
                    <p className="orgCardLoc">
                      <b>Employment</b>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1">
                    <img src={finance} />
                  </div>
                  <div className="col-sm-10">
                    <p className="orgCardLoc">
                      <b>Financial Inclusion</b>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="verticalLine">
                      <hr />
                    </div>
                    <h5 className="reviewHeading">Primary Contact</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="nametitle">John Deo</p>
                  </div>
                  <div className="col-md-8">
                    <img src={mail} className="mail" />
                    <img src={call} className="mail" />
                    <img src={profile} className="mail" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button type="button" className="ant-btn steps-action formStyles previewreview">
                      PREVIEW
                    </button>
                  </div>
                </div>
              </div>

              <div className="organisationContent">
                <img src={help} />

                <div className="row mt-1">
                  <div className="col-md-10">
                    <p className="textbulb">Want to know how to ace your proposal?</p>
                  </div>
                  <div className="col-md-2">
                    <img src={arrow} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Underreview;
