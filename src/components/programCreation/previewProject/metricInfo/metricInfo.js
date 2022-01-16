import React from "react";
import Metrics from "../../../../assets/images/preview/Metric.png";
import "../previewProject.scss";
import "./metricInfo.scss";
import MetricsDetails from "../../matrics/MetricsDetails";

const MetricInfo = () => {
  return (
    <div id="metrics_previews" className="metrics_preview">
      <div className="container-fluid p-0">
        <div className="banner-section" />
        <div className="row">
          <div className="col-md-12 col-sm-12 right-align-section projectcreation-preview">
            <div className="row">
              <div className="content-info col-md-1">
                <img height="35" src={Metrics} />
              </div>
              <div className="content-info col-md-4">
                <h1 className="previewHeading">Metrics</h1>
              </div>
            </div>

            <MetricsDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricInfo;
