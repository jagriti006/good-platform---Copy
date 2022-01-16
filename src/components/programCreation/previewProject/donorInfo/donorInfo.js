import React, {useEffect, useState} from "react";
import {Col, message, Row} from "antd";
import {appConfigurations} from "../../../../utils/constants";
import ProgramcreationAPI from "../../../../api/programcreationAPI";
import {PieChart} from "react-minimal-pie-chart";
import donor from "../../../../assets/images/program-creation/donor-active.svg";
import donor1 from "../../../../assets/images/Ellipse38.png";
import "./donorInfo.scss";
import { useParams } from "react-router";

const dataMock = [
  {title: "One", value: 400, color: "#E5DFF7"},
  {title: "Two", value: 60, color: "#B0D1D8"},
];

const colors = ["rgb(229, 223, 247)", "rgb(255, 178, 178)", "rgb(176, 209, 216)", "rgb(255, 238, 181)"];

const DonorInfo = () => {
  const projectId = useParams().programId;
  const [donorDetails, setDonorDetails] = useState(null);
  const [projectFundModels, setProjectFundModels] = useState([]);

  useEffect(async () => {
    if (projectId) {
      const projectDonorDetails = await ProgramcreationAPI().fetchDonorDetails(projectId);

      if (projectDonorDetails?.data) {
        setDonorDetails(projectDonorDetails.data);
      }
    }
  }, []);

  useEffect(async () => {
    const response = await ProgramcreationAPI().fetchProjectModels();

    if (response.data) {
      setProjectFundModels(response.data);
    }
  }, [])

  const renderPieChartData = () => {
    const newData = [];

    donorDetails &&
    donorDetails.fundingModel.map((data, index) => {
      newData.push({
        title: data.donorName,
        value: data.fundAskPercentage,
        color: colors[index],
      });
    });

    return newData;
  };

  return (
    // <Row justify="center">
    //   <Col xs={24} lg={20}>
    <div id="donor_previews" className="donor_preview budgetInfoContainer">
      <div className="container-fluid p-0">
        <div className="banner-section"/>
        <div className="row">
          <div className="col-md-12 col-sm-12 right-align-section projectcreation-preview">
            <div className="row">
              <div className="content-info col-md-1">
                <img height="35" src={donor}/>
              </div>
              <div className="content-info col-md-4">
                <h1 className="previewHeading">Donor</h1>
              </div>

              <div className="col-md-12 donor_preview_container">
                <div className="row donor_preview_child_container1">
                  <div className="col-md-6 donor_preview_child_container_div1">
                    <PieChart data={renderPieChartData()} lineWidth={20} paddingAngle={1} labelPosition={0}/>
                    <div className="chartText">
                      <h6>Total Budget</h6>
                      <h6 className="chartTextHeading">
                        {donorDetails?.fundingModel.reduce(function (sum, current) {
                          return sum + current.fundAskAmount;
                        }, 0)}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 donor_preview_child_container_div2">
                    {donorDetails &&
                    donorDetails.fundingModel.map((data, index) => (
                      <div className="chartContent">
                        <div>
                          <img src={donor1} alt={""}/>
                          <span className="chartContentSpan">{data.fundAskPercentage}%</span>
                        </div>
                        <h6 className="headingChart">{data.donorName}</h6>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row donor_preview_child_container2">
                  <p className="donor_preview_child_container_p">Self funding (Internal Accrual)</p>
                </div>

                <div className="row donor_preview_child_container3">
                  <div className="col-md-6 donor_preview_child_container_div1">
                    <div className="previewLabel">
                      <p className="m-0">
                        <b>Percentage</b>
                      </p>
                    </div>
                    <div className="previewdata">
                      <p className="m-0 pb-2">{donorDetails?.selfFundingPercentage || 0}%</p>
                    </div>
                  </div>

                  <div className="col-md-6 donor_preview_child_container_div1">
                    <div className="previewLabel">
                      <p className="m-0">
                        <b>Amount</b>
                      </p>
                    </div>
                    <div className="previewdata">
                      <p className="m-0 pb-2">₹ {donorDetails?.selfFundingAmount || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="row donor_preview_child_container4">
                  <div className="col-md-8 donor_preview_child_container4_div1">
                    <p className="donor_preview_child_container4_div1_p">Add donors you would like to involve</p>
                  </div>
                  <div className="col-md-4 donor_preview_child_container4_div2">
                    <p className="donor_preview_child_container4_div2_p">
                      Can’t find a donor?
                      <span className="donor_preview_child_container4_div2_span">Invite</span>
                    </p>
                  </div>
                </div>

                {donorDetails &&
                donorDetails.fundingModel.map((data, index) => (
                  <div className="row donor_preview_child_container5">
                    <div className="col-md-12 donor_preview_child_container5_div1">
                      <p className="donor_preview_child_container5_div1_p">Donor {index + 1}</p>
                      <div className="donor_preview_child_container5_div1_1">
                        <p className="donor_preview_child_container5_div1_1_p p1">Donor Name</p>
                        <p className="donor_preview_child_container5_div1_1_p p2">{data.donorName}</p>
                      </div>

                      <div className="row col-md-12 donor_preview_child_container5_div1_2">
                        <div className="col-md-6 donor_preview_child_container5_div1_2_div">
                          <div className="previewLabel">
                            <p className="m-0">
                              <b>Percentage</b>
                            </p>
                          </div>
                          <div className="previewdata">
                            <p className="m-0 pb-2">{data.fundAskPercentage}%</p>
                          </div>
                        </div>

                        <div className="col-md-6 donor_preview_child_container5_div1_2_div">
                          <div className="previewLabel">
                            <p className="m-0">
                              <b>Amount Donated</b>
                            </p>
                          </div>
                          <div className="previewdata">
                            <p className="m-0 pb-2">₹ {data.fundAskAmount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="row donor_preview_child_container6">
                  <div className="col-md-12 donor_preview_child_container6_div1">
                    <p className="donor_preview_child_container6_div1_p">What is the funding model required?</p>
                  </div>
                </div>

                <div className="row donor_preview_child_container7">
                  <p className="donor_preview_child_container7_p">{donorDetails && projectFundModels && projectFundModels.filter(data => data.id === donorDetails.fundingModelId)[0]?.models || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   </Col>
    // </Row>
  );
};

export default DonorInfo;
