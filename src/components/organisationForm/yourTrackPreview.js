import React, { useEffect, useState } from "react";
import Trackrecord from "../../assets/images/preview/trackrecord.png";
import BeneficiariesPreview from "./beneficiariesPreview";
import Organisationapi from "../../api/organizationapi";
import rsymbol from "../../assets/images/program-creation/rsymbol.png";
import { useParams } from "react-router";

function YourTrackPreview(props) {
  const [trackrecorddetail, settrackrecorddetail] = useState("");
  const [countryStateList, setCountryStateList] = useState([]);
  const organisationId = useParams().organisationId;

  useEffect(() => {
    const fetchData = async () => {
      handletrackrecord();
      handlecountry();
    };

    fetchData();
  }, []);

  const handlecountry = async () => {
    const response = await Organisationapi().fetchCountryState();
    if (response.data) {
      setCountryStateList(response.data);
    }
  };

  const handletrackrecord = async () => {
    if (organisationId !== "") {
      const response = await Organisationapi().fetchTrackRecords(organisationId);
      if (response.data) {
        settrackrecorddetail(response.data);
      }
    }
  };

  const getaddresscountry = (countryid) => {
    if (countryStateList && countryStateList.length > 0 && countryid) {
      var item = countryStateList.find((item) => item.id === parseInt(countryid));
      if (item) {
        return item.countryName;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return (
    <React.Fragment>
      <div id="track_preview">
        <div className="row divSpace">
          <img height="35" src={Trackrecord} />
          <h1 className="previewHeading">Track Record</h1>
        </div>
        <div className="divSpace">
          <p className="userDetailName">History</p>
        </div>
        {trackrecorddetail.budgetHistory &&
          trackrecorddetail.budgetHistory.map((trackrecord) => (
            <>
              <div className="divSpace">
                <div className="userDetailscard">
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="previewData">{trackrecord.financialYear}</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="previewLabel">Overall Budget</p>
                      <p className="previewData">
                        <img src={rsymbol} className="currencySymbol" />
                        {trackrecord.overallBudget}
                      </p>
                    </div>
                  </div>
                  <div className="relative authForm">
                    <div className="verticalLine" />
                  </div>
                  {trackrecord.donorHistory &&
                    trackrecord.donorHistory.map((donorhistory) => (
                      <>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="previewLabel">Doonor Name</p>
                            <p className="previewData">{donorhistory.donorName}</p>
                          </div>
                          <div className="col-sm-6">
                            <p className="previewLabel">country</p>
                            <p className="previewData">{getaddresscountry(donorhistory.country)}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="previewLabel">Amount Funded</p>
                            <p className="previewData">
                              <img src={rsymbol} className="currencySymbol" />
                              {donorhistory.amountFunded}
                            </p>
                          </div>
                          <div className="col-sm-6">
                            <p className="previewLabel">Percentage Contributed</p>
                            <p className="previewData">{donorhistory.percentageContributed} %</p>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </>
          ))}
      </div>
      <BeneficiariesPreview />
    </React.Fragment>
  );
}

export default YourTrackPreview;
