import React, {useEffect, useState} from "react";
import {Collapse, message, Timeline} from "antd";
import {appConfigurations} from "../../../../utils/constants";
import ProgramcreationAPI from "../../../../api/programcreationAPI";
import "../previewProject.scss";
import Budget from "../../../../assets/images/program-creation/Financial services.png";
import {PieChart} from "react-minimal-pie-chart";
import "./budgetInfo.scss";
import cost from "../../../../assets/images/programcost.png";
import Benif from "../../../../assets/images/benificiary.png";
import Perunit from "../../../../assets/images/costperunit.png";
import { useParams } from "react-router";

const dataMock = [
  {title: "One", value: 400, color: "#E5DFF7"},
  {title: "Two", value: 60, color: "#B0D1D8"},
];

const colors = ["rgb(229, 223, 247)", "rgb(255, 178, 178)", "rgb(176, 209, 216)", "rgb(255, 238, 181)"];
const subColors = ["rgb(250, 249, 253)", "rgb(254, 246, 246)", "rgb(239, 246, 247)", "rgb(255, 252, 240)"];

const BudgetInfo = () => {
  const projectId = useParams().programId;
  console.log("project id value is",projectId);
  const [budgetDetails, setBudgetDetails] = useState(null);

  useEffect(async () => {
    if (projectId){
      const projectBudgetDetails = await ProgramcreationAPI().fetchProjectbudgetdetails(projectId);

      if (projectBudgetDetails?.data) {
        console.log("project budget details is",projectBudgetDetails.data);
        setBudgetDetails(projectBudgetDetails.data);
      }
    }
  }, []);

  const renderPieChartData = () => {
    const newData = [];

    budgetDetails &&
    budgetDetails.budgetBreakDowns.map((data, index) => {
      newData.push({
        title: data.title,
        value: data.percentage,
        color: colors[index],
      });
    });

    return newData;
  };

  return (
    <div id="budget_previews" className="budget_preview">
      <div className="container-fluid p-0">
        <div className="banner-section"/>
        <div className="row">
          <div className="col-md-12 col-sm-12 right-align-section projectcreation-preview">
            <div className="row">
              <div className="content-info col-md-1">
                <img height="35" src={Budget}/>
              </div>
              <div className="content-info col-md-4">
                <h1 className="previewHeading">Budget1</h1>
              </div>

              <div className="col-md-12 budget_preview_container">
                <div className="row budget_preview_child_container1">
                  <div className="col-md-6 budget_preview_child_container1_1">
                    <PieChart data={renderPieChartData()} lineWidth={20} paddingAngle={1} labelPosition={0}/>
                    <div className="chartText">
                      <h6>Total Budget</h6>
                      <h6 style={{fontWeight: "bold"}}>
                        {budgetDetails?.budgetBreakDowns.reduce(function (sum, current) {
                          return sum + current.amount;
                        }, 0)}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 budget_preview_child_container1_2">
                    {budgetDetails &&
                    budgetDetails.budgetBreakDowns.map((data, index) => (
                      <div className="chartContent" key={index}>
                        <div className="chartContent_child1">
                          <div className="chartContent_child1_1" style={{background: colors[index]}}/>
                          <span className="chartContent_child1_2">{data.percentage}%</span>
                        </div>
                        <h6 className="headingChart">{data.title}</h6>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row budget_preview_child_container2">
                  <p className="budget_preview_child_container2_p">What is your total program budget</p>
                </div>

                <div className="row">
                  <div className="previewLabel col-md-12 previewLabel_div">
                    <p className="m-0">
                      <b>No Of Students Placed in Jobs</b>
                    </p>
                  </div>
                  <div className="previewdata">
                    <p className="m-0 pb-2">{budgetDetails?.totalBudget || "-"}</p>
                  </div>
                </div>

                {budgetDetails &&
                budgetDetails.budgetBreakDowns.map((data, index) => (
                  <div className="row budget_preview_child_container3" key={index}>
                    <div className="budget_preview_child_container3_1" style={{background: colors[index]}}>
                      <p className="budget_preview_child_container3_1_p">{data.title}</p>
                    </div>

                    <div className="budget_preview_child_container3_2" style={{background: subColors[index]}}>
                      <div className="budget_preview_child_container3_2_div">
                        <p className="budget_preview_child_container3_2_p">Total</p>
                        <div className="row justify-content-between">
                          <div className="col-sm-3">
                            <div>
                              <input
                                inputPlaceholder="0 %"
                                value={data.percentage}
                                className="budget_preview_child_container3_2_input"
                                disabled
                              />
                              <p className="budget_preview_child_container3_2_in_p" style={{left: "6.5rem"}}>
                                %
                              </p>
                            </div>
                          </div>
                          <div className="col-sm-8">
                            <div>
                              <input
                                inputPlaceholder="Eg. 2,00,000"
                                value={data.amount}
                                className="budget_preview_child_container3_2_input"
                                style={{textAlign: "end"}}
                                disabled
                              />
                              <p className="budget_preview_child_container3_2_in_p" style={{left: "1.5rem"}}>
                                ₹
                              </p>
                            </div>
                          </div>
                          <div className="col-sm-2"/>
                        </div>
                      </div>
                      <Collapse onChange={() => {
                      }} expandIconPosition={"right"} style={{border: 0}}>
                        <Collapse.Panel header="Breakdown Costs" key="1" className={"collapsePanel"}>
                          {data.detailedBreakDowns.map((costData, index) => (
                            <div>
                              {costData.title}: {costData.amount}
                            </div>
                          ))}
                        </Collapse.Panel>
                      </Collapse>
                    </div>
                  </div>
                ))}

                <div className="row budget_preview_child_container2">
                  <p className="budget_preview_child_container2_p">Unit Cost</p>
                </div>

                <div className="row budget_preview_child_container4">
                  <div className="col-md-12">
                    <div className="row budget_preview_child_container4_div">
                      <div className="col-md-4 costprogram">
                        <img src={cost} className="budget_preview_child_container4_div_img1"/>
                        <div className="costprog">
                          <p className="headingdonors">
                            <b>&#8377; 10,00,000</b>
                            <br/>
                            Program cost
                          </p>
                        </div>
                      </div>
                      <p className="iconsymbol"> &#247;</p>
                      <div className="col-md-4 costprogram">
                        <img src={Benif} className="budget_preview_child_container4_div_img1"/>
                        <div className="costprog">
                          <p className="headingdonors">
                            <b>&#8377; 10,000</b>
                            <br/>
                            Beneficiaries
                          </p>
                        </div>
                      </div>
                      <p className="iconsymbol"> =</p>

                      <div className="col-md-3 costprogram">
                        <img src={Perunit} className="pl-5 budget_preview_child_container4_div_img2"/>
                        <div className="costprog costprogram_div">
                          <p className="headingdonors">
                            <b>&#8377; 100</b>
                            <br/>
                            Cost per unit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Timeline>
                  {budgetDetails &&
                  budgetDetails.milestones.map((data, index) => (
                    <Timeline.Item>
                      <div className="row budget_preview_child_container5">
                        <div className="col-md-12 budget_preview_child_container5_div">
                          <p className="budget_preview_child_container5_div_p_common p_1">Milestone {index + 1}</p>
                          <div className="budget_preview_child_container5_subdiv">
                            <p className="budget_preview_child_container5_div_p_common p_2">
                              What is the target milestone?
                            </p>
                            <p className="budget_preview_child_container5_div_p_common p_3">
                              {data.targetMilestone}
                            </p>
                          </div>
                          <p className="budget_preview_child_container5_div_p_common p_4">
                            What is the duration to achieve this?
                          </p>
                          <div>
                            <p className="budget_preview_child_container5_div_p_common p_5">Duration</p>
                            <p className="budget_preview_child_container5_div_p_common p_6">
                              {data.duration} {data.durationIn}{data?.duration && data?.duration > 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="budget_preview_child_container5_subdiv">
                            <p className="budget_preview_child_container5_div_p_common p_7">
                              What are the key activities?
                            </p>
                            <p className="budget_preview_child_container5_div_p_common p_8">{data.keyActivities}</p>
                          </div>
                        </div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetInfo;
