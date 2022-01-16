import React, { useEffect, useState } from "react";
import { Radio, Steps } from "antd";
import Purpose from "../../assets/images/preview/purpose.png";
import agriculture from "../../assets/images/agriculture.png";
import Organisationapi from "../../api/organizationapi";
import { useParams } from "react-router";
const { Step } = Steps;

function YourPurposePreview(props) {
  const [purpose, setpurpose] = useState("");
  const organisationId = useParams().organisationId;
  useEffect(() => {
    handlepurpose();
  }, []);

  const handlepurpose = async () => {
    if (organisationId !== "") {
      const response = await Organisationapi().fetchPurpose(organisationId);
      if (response.data) {
        setpurpose(response.data);
      }
    }
  };

  return (
    <div id="purpose_preview">
      <div className="row divSpace">
        <img height="35" src={Purpose} />
        <h1 className="previewHeading">Purpose</h1>
      </div>
      <div className="divSpace">
        <p className="userDetailName">Primary</p>
      </div>
      <div className="divSpace abc">
        <Radio.Group name="targetCategory" buttonStyle="solid">
          <div className="row formStyles">
            {purpose.sectors &&
              purpose.sectors.map((sector) => {
                return (
                  sector &&
                  sector.sector != null &&
                  sector.type == "PRIMARY" && (
                    <div className="col-md-6 mb-3">
                      <Radio.Button className="purpose">
                        <img src={agriculture} alt="" className="radioimage" />
                        {sector.sector}
                      </Radio.Button>
                    </div>
                  )
                );
              })}
          </div>
        </Radio.Group>
      </div>

      <div className="divSpace">
        <p className="userDetailName">Secondary</p>
      </div>
      <div className="divSpace abc">
        <Radio.Group name="targetCategory" buttonStyle="solid">
          <div className="row formStyles">
            {purpose.sectors &&
              purpose.sectors.map((sector) => {
                return (
                  sector &&
                  sector.sector != null &&
                  sector.type == "SECONDARY" && (
                    <div className="col-md-6 mb-3">
                      <Radio.Button className="purpose">
                        <img src={agriculture} alt="" className="radioimage" />
                        {sector.sector}
                      </Radio.Button>
                    </div>
                  )
                );
              })}
          </div>
        </Radio.Group>
      </div>

      <div className="divSpace">
        <Steps
          progressDot
          current={purpose.missionStatements ? purpose.missionStatements.length : 0}
          direction="vertical"
        >
          {purpose.missionStatements &&
            purpose.missionStatements.map((mission, index) => (
              <Step title="Mission Statement" description={mission.statement} />
            ))}
        </Steps>
      </div>

      <div className="divSpace">
        {purpose.about ? (
          <div className="divSpace">
            <p className="previewLabel">About the Organisation</p>
            <p className="previewData">{purpose.about}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default YourPurposePreview;
