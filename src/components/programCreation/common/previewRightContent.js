import Ellipse55 from "../../../assets/images/Ellipse55.png";
import timer from "../../../assets/images/program-creation/timer.svg";
import education from "../../../assets/images/education.png";
import Employment from "../../../assets/images/program-creation/Employment.png";
import Financial from "../../../assets/images/program-creation/Financial services.png";
import primaryImage from "../../../assets/images/primary.png";
import secondaryImage from "../../../assets/images/secondary.png";
import React from "react";
import {ROLES} from "../../../constants/strings";

const PreviewRightContent = () => {

  const isAdmin = sessionStorage.getItem("userRole") === ROLES.ADMIN ? true : false;

  return (
    <div className="col-md-4 previewContainer">
      <div className="card-container" style={{margin: '4rem'}}>
        <div className="previewContentDiv">
          <h5 className="cardHeading previewProgramName">
            Pathways to Progress
          </h5>
          <img src={Ellipse55} alt="" className="inprogess_image"/>
        </div>
        <div className="inprogress_div">
          <img src={timer} alt="" className="previewoverviewimage"/>
          <p className="inprogress_div_text">In Progress</p>
        </div>
        <div className="previewContent">
          <h5 className="previewCardHeading">Overview</h5>
          <p className="previewCardLoc pt-3">
            With the belief that “Care” actually “Works”, Careworks
            Foundation (CWF) was formed in 2014 to act as a catalyst of
            change and create better lives. Driven by the belief that
            education & training and health are the two major pillars.
          </p>
          <hr style={{width: "100%"}}/>
          <p className="previewCardHeading pt-3">Impact Categories</p>
          <div className="overview_div">
            <img src={education} alt="" className="overview_div_img"/>
            <p className="overview_div_p">Education</p>
          </div>
          <div className="overview_div">
            <img src={Employment} alt="" className="overview_div_img"/>
            <p className="overview_div_p">Employment</p>
          </div>
          <div className="overview_div">
            <img src={Financial} alt="" className="overview_div_img"/>
            <p className="overview_div_p">Financial Inclusion</p>
          </div>

          {!isAdmin && (
            <>
              <hr style={{width: "100%"}}/>
              <div className="form-group textCenter previewForm">
                <button type="submit" className="btn previewButton">
                  SUBMIT FOR VALIDATION
                </button>
              </div>
            </>
          )}
        </div>

        <div>
          <h5 className="previewCardHeading">UNSDGs</h5>
          <div className="UNSG_child_div">
            <div>
              <h6 className="UNSG_child_div_heading">Primary</h6>
              <img src={primaryImage} alt=""/>
            </div>
            <div>
              <h6 className="UNSG_child_div_heading">Secondary</h6>
              <img src={secondaryImage} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewRightContent;