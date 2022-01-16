import React, {Component, useEffect, useState} from "react";
import moment from "moment";
import Organisationapi from "../../api/organizationapi";
import Overview from "../../assets/images/preview/overview.png";
import mailbox from "../../assets/images/preview/mailbox.png";
import phone from "../../assets/images/preview/telephone.png";
import profile from "../../assets/images/preview/profile.png";
import {useParams} from "react-router";

const OrganisationOverviewPreview = () => {
  const [responseData, setResponseData] = useState("");
  const organisationId = useParams().organisationId;
  useEffect(() => {
    const fetchData = async () => {
      if (organisationId !== "") {
        const response = await Organisationapi().fetchOrganization(organisationId);
        if (response.data) {
          setResponseData(response.data);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div id="organisation_preview">
      <div className="row">
        <img height="35" src={Overview}/>
        <h1 className="previewHeading">Overview</h1>
      </div>

      <div className="row">
        <div className="divSpace divSpace col-sm-6">
          <p className="previewLabel">Registered as</p>
          <p className="previewData">{responseData?.type}</p>
        </div>
        <div className="divSpace divSpace col-sm-6">
          <p className="previewLabel">GST Number</p>
          <p className="previewData">{responseData?.gstNumber}</p>
        </div>
      </div>

      <div className="row">
        <div className="divSpace col-sm-6">
          <p className="previewLabel">Year Founded</p>
          <p className="previewData">{moment(responseData?.yearFounded).format("DD/MM/YYYY")}</p>
        </div>
        <div className="divSpace col-sm-6">
          <p className="previewLabel">No. of Employees</p>
          <p className="previewData">{responseData?.noOfEmployees}</p>
        </div>
      </div>

      <div className="row">
        <div className="divSpace col-sm-6">
          <p className="previewLabel">Organisation Email</p>
          <p className="previewData">{responseData?.emailId}</p>
        </div>
        <div className="divSpace col-sm-6">
          <p className="previewLabel">Website URL</p>
          <p className="previewData">{responseData?.website}</p>
        </div>
      </div>
      <div className={'row'}>
        <div className="divSpace col-sm-12">
          <p className="previewLabelBold">User Details</p>
          <div className="userDetailscard">
            <h4>
              <span className="userDetailName">{responseData?.fullName}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span className="userDetailType">{responseData?.memberType}</span>
            </h4>
            <div className="row">
              <div className="col-sm-1">
                <img src={mailbox}/>
              </div>
              <div className="col-sm-11 userDetailData">{responseData?.emailId}</div>
            </div>
            <div className="row">
              <div className="col-sm-1">
                <img src={phone}/>
              </div>
              <div className="col-sm-11 userDetailData">
                {`${responseData?.mobile || "-"}`.replace(/.(?=.{3})/g, "X")}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-1">
                <img src={profile}/>
              </div>
              <div className="col-sm-11 userDetailData">
                <span className="userDetailData">{responseData?.idProof}</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span className="userDetailData">
                {`${responseData?.idProofNumber || "-"}`.replace(/.(?=.{3})/g, "X")}
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
};
export default OrganisationOverviewPreview;
