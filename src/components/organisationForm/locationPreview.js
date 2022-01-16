import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Organisationapi from "../../api/organizationapi";
import Location from "../../assets/images/preview/location.png";

function LocationPreview() {
  const [locationdetail, setLocationdetail] = useState("");
  const [countryStateList, setCountryStateList] = useState([]);
  const organisationId = useParams().organisationId;
  useEffect(() => {
    const fetchData = async () => {
      await handlelocation();
      await handleCountryState();
    };
    fetchData()
  }, []);

  const handlelocation = async () => {
    if (organisationId !== "") {
      const response = await Organisationapi().fetchAddress(organisationId);
      if (response.data) {
        setLocationdetail(response.data);
      }
    }
  };

  const handleCountryState = async () => {
    const response = await Organisationapi().fetchCountryState();
    if (response.data) {
      setCountryStateList(response.data);
    }
  };

  const getaddresscountry = (countryid) => {
    if (countryStateList && countryStateList.length > 0 && countryid) {
      var item = countryStateList.find((item) => item.id === countryid);
      if (item) {
        return item.countryName;
      } else {
        return "";
      }
    }
  };

  const getStateName = (countryId, stateId) => {
    if (countryId && stateId) {
      if (countryStateList && countryStateList.length > 0) {
        let searchItem = countryStateList.find((item) => item.id === countryId);
        if (searchItem) {
          let searchstate = searchItem.stateList.find((item) => item.id === parseInt(stateId));
          if (searchstate) {
            return searchstate.stateName;
          } else {
            return "";
          }
        } else {
          return "";
        }
      }
    } else {
      return "";
    }
  };

  return (
    countryStateList.length > 0 &&
    locationdetail && (
      <div id="location_preview">
        <div className="row">
          <img height="35" src={Location} />
          <h1 className="previewHeading">Location</h1>
        </div>

        <div className="divSpace">
          <p className="previewLabel">Country of Headquarter</p>
          <p className="previewData">{getaddresscountry(locationdetail.countryId)}</p>
        </div>
        <br></br>

        {locationdetail.addressList &&
          locationdetail.addressList.map((addresslist, index) => (
            <React.Fragment key={index}>
              <div className="relative authForm">
                <div className="verticalLine" />
              </div>

              <div className="divSpace">
                <p className="previewLabel">Address Title</p>
                <p className="previewData">{addresslist.title}</p>
              </div>

              <div className="divSpace">
                <p className="previewLabel">Address</p>
                <p className="previewData">{addresslist.address}</p>
              </div>

              <div className="row col-sm-12">
                <div className="divSpace col-sm-6">
                  <p className="previewLabel">Country</p>
                  <p className="previewData">{getaddresscountry(addresslist.country)}</p>
                </div>
                <div className="divSpace col-sm-6">
                  <p className="previewLabel">State</p>
                  <p className="previewData">{getStateName(addresslist.country, addresslist.state)}</p>
                </div>
              </div>

              <div className="row col-sm-12">
                <div className="divSpace col-sm-6">
                  <p className="previewLabel">City</p>
                  <p className="previewData">{addresslist.city}</p>
                </div>
                <div className="divSpace col-sm-6">
                  <p className="previewLabel">Pincode</p>
                  <p className="previewData">{addresslist.pincode}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
    )
  );
}

export default LocationPreview;
