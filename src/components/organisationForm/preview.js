import { Alert, Anchor, notification, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Organisationapi from "../../api/organizationapi";
import mailbox from "../../assets/images/preview/mailbox.png";
import profile from "../../assets/images/preview/profile.png";
import phone from "../../assets/images/preview/telephone.png";
import appRoutes from "../../constants/app-routes";
import DocumentPreview from "./documentPreview";
import LeadershipPreview from "./leadershipPreview";
import LocationPreview from "./locationPreview";
import OrganisationPreview from "./organisationPreview";
import YourPurposePreview from "./yourPurposePreview";
import YourTrackPreview from "./yourTrackPreview";
import validatorAPI from "../../api/validatorAPI";
import { camelCased } from "../../utils/utils";
import {ROLES, STATUS} from "../../constants/strings";
const { Link } = Anchor;

export const componentArr = [
  { link: "#organisation_preview", component: <OrganisationPreview />, title: "Overview", name: "overview" },
  { link: "#leadership_preview", component: <LeadershipPreview />, title: "Leadership", name: "leadership" },
  { link: "#location_preview", component: <LocationPreview />, title: "Location", name: "location" },
  { link: "#purpose_preview", component: <YourPurposePreview />, title: "Purpose", name: "purpose" },
  { link: "#track_preview", component: <YourTrackPreview />, title: "Track Record", name: "track-record-history" },
  { link: "#document_preview", component: <DocumentPreview />, title: "Document", name: "financial-doc" },
];
const Preview = (props) => {
  const history = useHistory();
  const [sector, setSector] = useState("");
  const [founder, setFounder] = useState("");
  const [countryHeadquarter, setCountryHeadquarter] = useState("");
  const [data, setData] = useState({
    name: "",
    approvalStatus: "",
  });
  const [sectionStatuses, setSectionStatuses] = useState("");
  const organisationId = useParams().organisationId;
  const isAdmin = sessionStorage.getItem("userRole") === ROLES.ADMIN ? true : false;

  const getComponents = () => {

    const getAlertColor = (status)=>{
      if(status===STATUS.APPROVED) return "success"
      if(status===STATUS.REJECTED) return "error"
      return "info"
    }
    return componentArr.map((item) => {
      const verificationStatus = sectionStatuses[`${camelCased(item.name)}Status`];
      const verificationComment = sectionStatuses[`${camelCased(item.name)}Comment`];
      return (
        <>
          {item.component}
          <Alert
            message={`Approval Status of ${item.title} : ${verificationStatus || "No Data Available"}`}
            description={`Comments : ${verificationComment || "No Data Available"}`}
            type={getAlertColor(verificationStatus)}
            showIcon
          />
        </>
      );
    });
  };

  const handlesubmitClick = async () => {
    const response = await Organisationapi().submitforValidation(organisationId);
    if (response.data) {
      notification.success({ message: "Suucessfully submitted for validation..!" });
      history.push(`${appRoutes.SO_SUBMIT}`);
    }
  };

  const setOrganisationName = async () => {
    if (organisationId) {
      const response = await Organisationapi().fetchOrganization(organisationId);
      if (response.data) {
        const { name, approvalStatus } = response.data;
        setData({ name, approvalStatus });
        setCountryList(response.data.headquarterCountry);
      }
    }
  };

  const fetchPurpose = async () => {
    if (organisationId) {
      const response = await Organisationapi().fetchPurpose(organisationId);
      if (response.data) {
        if (response.data.sectors.length > 0) {
          setSector(response.data.sectors[0].sector);
        }
      }
    }
  };

  const setCountryList = async (cid) => {
    const responseData = await Organisationapi().fetchCountries();
    if (responseData?.data) {
      const filter_countryname = responseData.data.filter((country) => country.id == cid);
      setCountryHeadquarter(filter_countryname[0].countryName);
    }
  };

  const getFounderName = async () => {
    if (organisationId) {
      const response = await Organisationapi().fetchLeadership(organisationId);
      if (response.data) {
        const data = response.data;
        if (data && data.organisationMembersList) {
          setFounder(data.organisationMembersList[0].name);
        }
      }
    }
  };

  const fetchSectionwiseStatus = async () => {
    const response = await validatorAPI().fetchSectionwiseStatus(organisationId);
    if (response.data) {
      setSectionStatuses(response.data);
    }
  };

  useEffect(() => {
    setOrganisationName();
    fetchPurpose();
    getFounderName();
    fetchSectionwiseStatus();
  }, []);

  const handleClick = (e, link) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="customsidebar" style={{ background: "#fff" }}>
        <div className="row">
          <div className="col-md-2 anchorContainer anchorContainerMenu">
            <Anchor
              getContainer={() => document.getElementById("my-scroll-layout")}
              showInkInFixed={true}
              affix={false}
              onClick={handleClick}
            >
              {componentArr.map((item) => (
                <Anchor.Link href={item.link} title={item.title} key={item.title} />
              ))}
            </Anchor>
          </div>
          <div className="col-md-6 scroll mrg-l-a" id="my-scroll-layout">
            {getComponents()}
          </div>
          <div className="col-md-4 organisationContainer">
            <div className="card-container">
              <h5 className="textCenter cardHeading previewOrgName">{data.name}</h5>

              <div className="form-group textCenter authForm">
                {isAdmin ? (
                  <button
                    type="submit"
                    className="btn registrationButton"
                    onClick={() => history.push('/programs')}
                    style={{marginTop: '2%'}}
                  >
                    VIEW ALL PROGRAMS
                  </button>
                ) : (
                  data.approvalStatus === STATUS.APPROVED || data.approvalStatus === "REVIEW" ? (
                    <h3>Status : {data.approvalStatus}</h3>
                  ) : (
                    <button type="submit" className="btn registrationButton" onClick={handlesubmitClick}>
                      SUBMIT FOR VALIDATION
                    </button>
                  )
                )}
              </div>

              <div className="organisationContent">
                <h5 className="orgCardHeading">Overview</h5>
                <p className="orgCardLoc pt-3">Location</p>
                <p>{countryHeadquarter}</p>
                <div className="relative">
                  <div className="verticalLine" />
                </div>
                <hr style={{ width: "100%" }} />
                <p className="orgCardLoc pt-3">Category</p>
                <h5 className="orgCardHeading">{sector}</h5>
                <div className="relative">
                  <div className="verticalLine" />
                </div>
                <hr style={{ width: "100%" }} />
                <p className="orgCardLoc">Founder</p>
                <div className="row">
                  <div className="col-sm-5">
                    <h5 className="orgCardHeading">{founder}</h5>
                  </div>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-sm-4">
                        <img src={mailbox} />
                      </div>
                      <div className="col-sm-4">
                        <img src={phone} />
                      </div>
                      <div className="col-sm-4">
                        <img src={profile} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="organisationContent">
                <h5 className="orgCardHeading">Tips to ensure a quick validation</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
