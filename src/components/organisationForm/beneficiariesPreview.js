import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";
import { Radio, Checkbox, Input } from "antd";
import { appConfigurations } from "../../utils/constants";
import People from "../../assets/images/people.png";
import Infrastructure from "../../assets/images/infrastructure.png";
import Children from "../../assets/images/trackrecord/child.png";
import Elderly from "../../assets/images/trackrecord/elderly.png";
import Women from "../../assets/images/trackrecord/empowerment.png";
import SpeciallyAbled from "../../assets/images/trackrecord/specially.png";
import Transgender from "../../assets/images/trackrecord/transgender.png";
import Veterans from "../../assets/images/trackrecord/veteran.png";
import Youth from "../../assets/images/trackrecord/youth.png";
import Organisationapi from "../../api/organizationapi";

function BeneficiariesPreview(props) {
  const [beneficieriesdetail, setbeneficieriesdetail] = useState("");
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    handlebeneficieries();
  }, []);

  var data = JSON.stringify({});
  const handlebeneficieries = async () => {
    const organisationId = sessionStorage.getItem("organisationId");
    if (organisationId) {
      const response = await Organisationapi().fetchBenificiary(organisationId);
      if (response.data) {
        const data = response.data;
        setbeneficieriesdetail(data);
      }
    }
  };

  const selectimage = (imageType) => {
    var arr = {
      Children,
      Elderly,
      Women,
      SpeciallyAbled,
      Transgender,
      Veterans,
      Youth,
      People,
      Infrastructure
    };
    return arr[imageType];
  };

  return (
    <div id="beneficiaries_preview">
      <div className="divSpace">
        <p className="userDetailName">Beneficiary</p>
      </div>
      <div className="divSpace abc">
        <Radio.Group name="beneficiaryType" buttonStyle="solid">
          <div className="row formStyles">
            <div className="col-sm-6">
              <Radio.Button  className="purpose">
                <img src={selectimage(beneficieriesdetail.beneficiaryType)} alt="" className="radioimage" />
                {beneficieriesdetail.beneficiaryType}
              </Radio.Button>
            </div>
          </div>
        </Radio.Group>
      </div>
      <div className="divSpace abc">
        <Radio.Group name="targetCategory" buttonStyle="solid">
          <div className="row formStyles">
            {beneficieriesdetail.targetCategory &&
              beneficieriesdetail.targetCategory.map((tcategory) => (
                <div className="col-md-3 mb-3">
                  <Radio.Button className="purpose">
                    <img
                      src={selectimage(tcategory)}
                      alt=""
                      className="radioimage"
                    />
                    {tcategory}
                  </Radio.Button>
                </div>
              ))}
          </div>
        </Radio.Group>
      </div>
      <div className="row divSpace">
        <div className="divSpace col-sm-6">
            <p className="organiztion alignLeft">Age Range</p>
        </div>
        <div className="divSpace col-sm-6">
            <p className="organiztion1">
              <b>18-35 years</b>
            </p>
        </div>
      </div>
      <div className="divSpace">
        <p className="organiztion">Total Beneficiary Impacted</p>
      </div>
      {beneficieriesdetail.beneficiaryImpactedHistory &&
        beneficieriesdetail.beneficiaryImpactedHistory.map(
          (beneficieryImpact) => (
            <>
              <div className="row">
                <div className="divSpace col-sm-6 alignLeft">
                  <p className="previewLabel">Total Beneficiary Impacted</p>
                  <p className="previewData">
                    {beneficieryImpact.totalBeneficiaryImpacted}
                  </p>
                </div>
                <div className="divSpace col-sm-6">
                  <p className="previewLabel">Financial Year</p>
                  <p className="previewData">
                    {beneficieryImpact.financialYear}
                  </p>
                </div>
              </div>
            </>
          )
        )}
      <div className="divSpace">
        <p className="organiztion">Location</p>
      </div>
      <div className="row formStyles col-sm-12">
        {beneficieriesdetail.beneficiaryLocations &&
          beneficieriesdetail.beneficiaryLocations.map((tcategory) => (
            <div className="col-md-5 col-sm-12 p-15 mt-2 mr-2 titleprev divSpace">
              <label class="alignleft">{tcategory.location}</label>
              <p className="previewData">{tcategory.locationTitle}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BeneficiariesPreview;
