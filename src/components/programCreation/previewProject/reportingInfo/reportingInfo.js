import React, { useEffect, useState } from "react";
import ProgramcreationAPI from "../../../../api/programcreationAPI";
import report from "../../../../assets/images/program-creation/reporting-active.svg";
import "./reportingInfo.scss";
import { useParams } from "react-router";

const ReportingInfo = () => {
  const projectId = useParams().programId;
  const [reportDetails, setReportDetails] = useState(null);
  const [frequency, setFrequency] = useState([]);

  useEffect(async () => {
    if (projectId) {
      const projectReportDetails = await ProgramcreationAPI().fetchProjectReportdetail(
        projectId
      );

      if (projectReportDetails?.data) {
        setReportDetails(projectReportDetails.data);
      }
    }
  }, []);

  useEffect(async () => {
    if (projectId) {
      const response = await ProgramcreationAPI().getReportFrequency();
      if (response.data) {
        const newArrayOfObj = response.data.map(({id: value, frequency: label}) => ({
          value,
          label,
        }));
        setFrequency(newArrayOfObj);
      }
    }
  },[])

  return (
    <div id="reporting_previews" className="reporting_preview budgetInfoContainer">
      <div className="container-fluid p-0">
        <div className="banner-section" />
        <div className="row">
          <div className="col-md-12 col-sm-12 right-align-section projectcreation-preview">
            <div className="row">
              <div className="content-info col-md-1">
                <img height="35" src={report} />
              </div>
              <div className="content-info col-md-4">
                <h1 className="previewHeading">Reporting</h1>
              </div>

              <div className="col-md-12 reporting_preview_container">
                <div className="row reporting_preview_container_div1">
                  <p className="reporting_preview_container_div1_p">Internal System</p>
                </div>

                <div className="row reporting_preview_container_div2">
                  <div className="col-md-12 reporting_preview_container_div2_div">
                    <div className="previewLabel">
                      <p className="m-0">
                        <b>Duration</b>
                      </p>
                    </div>
                    <div className="previewdata">
                      <p className="m-0 pb-2">3 Months</p>
                      <p className="m-0 pb-2">
                        {frequency && frequency.filter(data => data.value === reportDetails?.donorSystemDurationId)[0]?.label || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row reporting_preview_container_div2">
                  <div className="col-md-12 reporting_preview_container_div2_div">
                    <div className="previewLabel">
                      <p className="m-0">
                        <b>Key Activities Reported</b>
                      </p>
                    </div>
                    <div className="previewdata">
                      <p className="m-0 pb-2">{reportDetails?.internalSystemReportDetail}</p>
                      <p className="m-0 pb-2">
                        {reportDetails?.internalSystemReportDetail || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row reporting_preview_container_div1">
                  <p className="reporting_preview_container_div1_p">Donor System</p>
                </div>

                <div className="row reporting_preview_container_div2">
                  <div className="col-md-12 reporting_preview_container_div2_div">
                    <div className="previewLabel">
                      <p className="m-0">
                        <b>Duration</b>
                      </p>
                    </div>
                    <div className="previewdata">
                      <p className="m-0 pb-2">3 Months</p>
                      <p className="m-0 pb-2">
                        {frequency && frequency.filter(data => data.value === reportDetails?.internalSystemDurationId)[0]?.label || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row reporting_preview_container_div2">
                  <div className="col-md-12 reporting_preview_container_div2_div">
                    <div className="previewLabel">
                      <p className="m-0">
                        <b>Key Activities Reported</b>
                      </p>
                    </div>
                    <div className="previewdata">
                      <p className="m-0 pb-2">{reportDetails?.donorSystemReportDetail}</p>
                      <p className="m-0 pb-2">
                        {reportDetails?.donorSystemReportDetail || "-"}
                      </p>
                    </div>
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

export default ReportingInfo;
