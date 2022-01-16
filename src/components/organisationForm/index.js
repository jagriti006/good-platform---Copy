import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router";
import Organisationapi from "../../api/organizationapi";
import documentActive from "../../assets/images/soOnboardingIcons/documentActive.png";
import documentInactive from "../../assets/images/soOnboardingIcons/documentInactive.png";
import leadershiActive from "../../assets/images/soOnboardingIcons/leadershiActive.png";
import leadershipInactive from "../../assets/images/soOnboardingIcons/leadershipInactive.png";
import locationActive from "../../assets/images/soOnboardingIcons/locationActive.png";
import locationInactive from "../../assets/images/soOnboardingIcons/locationInactive.png";
import overviewActive from "../../assets/images/soOnboardingIcons/overviewActive.png";
import overviewInactive from "../../assets/images/soOnboardingIcons/overviewInactive.png";
import purposeActive from "../../assets/images/soOnboardingIcons/purposeActive.png";
import purposeInactive from "../../assets/images/soOnboardingIcons/purposeInactive.png";
import trackRecordActive from "../../assets/images/soOnboardingIcons/trackRecordActive.png";
import trackRecordInactive from "../../assets/images/soOnboardingIcons/trackRecordInactive.png";
import appRoutes from "../../constants/app-routes";
import { fetchUserData } from "../../redux/user/userActions";
import Beneficiaries from "./beneficiaries";
import Documents from "./document/documents";
import Leadership from "./leadership";
import Legal from "./legal";
import Location from "./location";
import OrganisationDetails from "./organisation";
import OrganisationOverview from "./organisationOverview";
import OrganisationStepper from "./OrganisationStepper/OrganisationStepper";
import Preview from "./preview";
import Purpose from "./purpose/purposeClone";
// import TrackRecords from "./trackRecords";
import TrackRecords from "./trackRecordsClone";

const Organisation = () => {
  const { path } = useRouteMatch();
  const [sector, setSector] = useState("");
  const [stepperOptions, setStepperOptions] = useState([]);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails.organisations);
  console.log(userDetails);
  const fetchPercent = async () => {
    if (userDetails) {
      const response = await Organisationapi().fetchPercent(userDetails);
      if (response) {
        if (response.data) {
          setSector(response.data);
        }
      }
    }
  };

  useEffect(() => {
    if (sector.length != 0) {
      const stepperData = [
        {
          id: 1,
          title: "Overview",
          description: "General details about your organization",
          percent: `${sector.overview}`,
          name: "overview",
          heading: "Overview",
          heading1: "",
          link: `${appRoutes.ORGANISATION}${appRoutes.OVERVIEW}`,
          icon: <img src={overviewActive} alt="" />,
          iconInactive: <img src={overviewInactive} alt="" />,
          borderColorValue: "#3A8D9D",
        },
        {
          id: 2,
          title: "Leadership",
          description: "Founder, board of directors, leadership personnel",
          percent: `${sector.leadership}`,
          name: "leadership",
          heading: "Leadership",
          heading1: "",
          link: `${appRoutes.ORGANISATION}${appRoutes.LEADERSHIP}`,
          icon: <img src={leadershiActive} alt="" className="leadership" />,
          iconInactive: <img src={leadershipInactive} alt="" />,
          borderColorValue: "#FFB2B2",
        },
        {
          id: 3,
          title: "Locations",
          description: "Registered headquarters and other locations",
          percent: `${sector.location}`,
          name: "locations",
          heading: "Headquarters",
          heading1: "",
          link: `${appRoutes.ORGANISATION}${appRoutes.LOCATION}`,
          icon: <img src={locationActive} alt="" />,
          iconInactive: <img src={locationInactive} alt="" />,
          borderColorValue: "#FFD447",
        },
        { 
          id: 4,
          title: "Purpose",
          description: "Company vision, mission and sector",
          percent: `${sector.purpose}`,
          name: "purpose",
          heading: "Purpose",
          heading1: "",
          link: `${appRoutes.ORGANISATION}${appRoutes.PURPOSE}`,
          icon: <img src={purposeActive} alt="" />,
          iconInactive: <img src={purposeInactive} alt="" />,
          borderColorValue: "#BDB0EB",
        },
        {
          id: 5,
          title: "Track Record",
          description: "Budget, donor and beneficiary",
          percent: `${sector.trackRecord}`,
          name: "track-record-history",
          heading1: "Track Record",
          heading: "",
          link: `${appRoutes.ORGANISATION}${appRoutes.TRACK_RECORDS}`,
          icon: <img src={trackRecordActive} alt="" />,
          iconInactive: <img src={trackRecordInactive} alt="" />,
          borderColorValue: "#3A8D9D",
        },
        {
          id: 7,
          title: "Documents",
          description: "Legal and financial documents",
          percent: `${sector.documents}`,
          name: "financial-documents",
          heading1: "Documents",
          // heading: "Financial",
          link: `${appRoutes.ORGANISATION}${appRoutes.DOCUMENTS}`,
          icon: <img src={documentActive} alt="" />,
          iconInactive: <img src={documentInactive} alt="" />,
          borderColorValue: "#FFB2B2",
        },
        {
          id: 9,
          title: "Validation",
          description: "Verify the information provided",
          percent: `${sector.overview}`,
          name: "approx 15 mins",
          heading: "Legal",
          heading1: "",
          link: `${appRoutes.ORGANISATION}${appRoutes.ORG_PREVIEW}`,
          icon: <img src={documentActive} alt="" />,
          iconInactive: <img src={documentInactive} alt="" />,
          hasButton: true,
          buttonTitle: "SUBMIT",
          borderColorValue: "red",
        },
      ];
      setStepperOptions(stepperData);
    } else {
      const stepperData = [
        {
          id: 1,
          title: "Overview",
          description: "General details about your organization",
          percent: "0",
          name: "overview",
          heading: "Overview",
          link: `${appRoutes.ORGANISATION}${appRoutes.OVERVIEW}`,
          icon: <img src={overviewActive} alt="" />,
          iconInactive: <img src={overviewInactive} alt="" />,
          borderColorValue: "#3A8D9D",
        },
        {
          id: 2,
          title: "Leadership",
          description: "Add your founder and other leadership members",
          percent: "0",
          name: "leadership",
          heading: "Leadership",
          link: `${appRoutes.ORGANISATION}${appRoutes.LEADERSHIP}`,
          icon: <img src={leadershiActive} alt="" className="leadership" />,
          iconInactive: <img src={leadershipInactive} alt="" />,
          borderColorValue: "#FFB2B2",
        },
        {
          id: 3,
          title: "Locations",
          description: "Add your organization headquarters and other locations",
          percent: "0",
          name: "locations",
          heading: "Headquarters",
          link: `${appRoutes.ORGANISATION}${appRoutes.LOCATION}`,
          icon: <img src={locationActive} alt="" />,
          iconInactive: <img src={locationInactive} alt="" />,
          borderColorValue: "#FFD447",
        },
        {
          id: 4,
          title: "Purpose",
          description: "Tell us about your organization mission and purpose",
          percent: "0",
          name: "purpose",
          heading: "Purpose",
          link: `${appRoutes.ORGANISATION}${appRoutes.PURPOSE}`,
          icon: <img src={purposeActive} alt="" />,
          iconInactive: <img src={purposeInactive} alt="" />,
          borderColorValue: "#BDB0EB",
        },
        {
          id: 5,
          title: "Track Record",
          description: "Add your organisation’s past program budgets and donors",
          percent: "0",
          name: "track-record-history",
          heading1: "Track Record",
          heading: "History",
          link: `${appRoutes.ORGANISATION}${appRoutes.TRACK_RECORDS}`,
          icon: <img src={trackRecordActive} alt="" />,
          iconInactive: <img src={trackRecordInactive} alt="" />,
          borderColorValue: "#3A8D9D",
        },
        {
          id: 7,
          title: "Documents",
          description: "These documents will help us validate your organisation faster",
          percent: "0",
          name: "financial-documents",
          heading1: "Documents",
          heading: "Financial",
          link: `${appRoutes.ORGANISATION}${appRoutes.DOCUMENTS}`,
          icon: <img src={documentActive} alt="" />,
          iconInactive: <img src={documentInactive} alt="" />,
          borderColorValue: "#FFB2B2",
        },
        {
          id: 9,
          title: "Validation",
          description: "Verify the information provided",
          percent: `${sector.overview}`,
          name: "approx 15 mins",
          heading: "Legal",
          link: `${appRoutes.ORGANISATION}${appRoutes.ORG_PREVIEW}`,
          icon: <img src={documentActive} alt="" />,
          iconInactive: <img src={documentInactive} alt="" />,
          hasButton: true,
          buttonTitle: "SUBMIT",
          borderColorValue: "red",
        },
      ];
      setStepperOptions(stepperData);
    }
  }, [sector]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchUserData());
    };
    fetchData();
    fetchPercent();
  }, []);

  return (
    <Switch>
      <Route exact path={`${path}`} render={() => <OrganisationOverview sector={sector} steps={stepperOptions} />} />
      <Route exact path={`${path}${appRoutes.ORG_PREVIEW}/:organisationId`} component={Preview} />
      <Route exact path={`${path}${appRoutes.ORG_PREVIEW}`} component={Preview} />
      <OrganisationStepper sector={sector} stepList={stepperOptions}>
        <Route exact path={`${path}${appRoutes.OVERVIEW}/:organisationId`} component={OrganisationDetails} />
        <Route exact path={`${path}${appRoutes.OVERVIEW}`} component={OrganisationDetails} />
        <Route exact path={`${path}${appRoutes.LEADERSHIP}/:organisationId`} component={Leadership} />
        <Route exact path={`${path}${appRoutes.LOCATION}/:organisationId`} component={Location} />
        <Route exact path={`${path}${appRoutes.PURPOSE}/:organisationId`} component={Purpose} />
        <Route exact path={`${path}${appRoutes.TRACK_RECORDS}/:organisationId`} component={TrackRecords} />
        <Route exact path={`${path}${appRoutes.ORG_BENEFICIARIES}/:organisationId`} component={Beneficiaries} />
        <Route exact path={`${path}${appRoutes.DOCUMENTS}/:organisationId`} component={Documents} />
        <Route exact path={`${path}${appRoutes.LEGAL}/:organisationId`} component={Legal} />
      </OrganisationStepper>
    </Switch>
  );
};

export default Organisation;
