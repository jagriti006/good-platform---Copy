import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BeneficiaryBasic from "./BeneficiaryBasic";
import BeneficiaryOverveiw from "./BeneficiaryOverveiw";
import BeneficiaryStepper from "./BeneficiaryStepper";
import BeneficiaryEducation from "./BeneficiaryEducation";
import BeneficiaryFinance from "./BeneficiaryFinance";
import BeneficiaryIdentification from "./BeneficiaryIdentification";
import BeneficiaryHealth from "./BeneficiaryHealth";
import BeneficiaryAsset from "./BeneficiaryAsset";
import BeneficiaryAccess from "./BeneficiaryAccess";
import BeneficiarySelfDeclaration from "./BeneficiarySelfDeclaration";
import BeneficiaryHome from "./BeneficiaryHome";
import BeneficiaryIDProof from "../../components/beneficieryForm/BeneficiaryIDProof";
import appRoutes from "../../constants/app-routes";
import BeneficiaryScheduleAppointment from "./BeneficiaryScheduleAppointment";
import BeneficiaryVaccineAppointmentDetails from "./BeneficiaryVaccineAppointmentDetails";
import BeneficiaryAppointmentPDF from "./BeneficiaryAppointmentPDF";
import BeneficiaryCoWIN from "./BeneficiaryCoWIN";
import BeneficiaryList from "./BeneficiaryList";
import BeneficiaryVialAssign from "./BeneficiaryVialAssign";
import { projectIdorName } from "../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { setBeneficiarySteps } from "../../redux/ui/uiActions";
import { useQuery } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import { PROJECT } from "../../constants/strings";
import BeneficiaryVialSearch from "./BeneficiaryVialSearch";

export const overviewBoxConfig = (projects) => {
  return projects.length
    ? [
        {
          id: 1,
          title: "Basic Information",
          description: "Personal Information,Contact, Address",
          percent: "0%",
          time: "approx 25 mins",
          link: `${appRoutes.BENEFICIARY}${appRoutes.BASIC_INFO}`,
          icon: "basic-details",
          enabledProjectIds: [projectIdorName(PROJECT.ARPAN), projectIdorName(PROJECT.UMEEED)],
        },

        {
          id: 2,
          title: "Education History",
          description: "Education status, School, College, Highest Degree/Class",
          percent: "0%",
          time: "approx 25 mins",
          link: `${appRoutes.BENEFICIARY}${appRoutes.EDUCATION_INFO}`,
          enabledProjectIds: [],
        },
        {
          id: 3,
          title: "Financial Information",
          description: "Define your data and metrics as per IRIS",
          percent: "0%",
          time: "approx  25 mins",
          link: `${appRoutes.BENEFICIARY}${appRoutes.FINANCIAL}`,
          enabledProjectIds: [],
        },
        {
          id: 2,
          title: "Identification",
          description: "Provide budget and breakdown details",
          percent: "0%",
          time: "approx 15 mins",
          icon: "reporting",
          link: `${appRoutes.BENEFICIARY}${appRoutes.OTHER_INFO}`,
          enabledProjectIds: [projectIdorName(PROJECT.ARPAN), projectIdorName(PROJECT.UMEEED)],
        },
        {
          id: 3,
          title: "Health",
          description: "Family Health, Personal Health, Medical Allergies, Childhood diseases",
          percent: "0%",
          time: "approx 15 mins",
          icon: "matrics",
          link: `${appRoutes.BENEFICIARY}${appRoutes.HEALTH_INFO}`,
          enabledProjectIds: [projectIdorName(PROJECT.UMEEED)],
        },

        {
          id: 6,
          title: "Asset Ownership",
          description: "Land holding, Vehicles and other assets",
          percent: "0%",
          time: "approx 15 mins",
          link: `${appRoutes.BENEFICIARY}${appRoutes.ASSET_INFO}`,
          enabledProjectIds: [],
        },
        {
          id: 7,
          title: "Access To Services",
          description: "Lifestyle necessities like gas,electricity,internet and others",
          percent: "0%",
          time: "approx 15 mins",
          link: `${appRoutes.BENEFICIARY}${appRoutes.ACCESS_INFO}`,
          enabledProjectIds: [],
        },
        {
          id: 4,
          title: "Consent",
          description: "",
          percent: "0%",
          time: "approx 15 mins",
          icon: "org-approval",
          link: `${appRoutes.BENEFICIARY}${appRoutes.SELF_DECLARATION}`,
          enabledProjectIds: [projectIdorName(PROJECT.ARPAN), projectIdorName(PROJECT.UMEEED)],
        },
        {
          id: 5,
          title: "CoWIN Registration",
          description: "",
          percent: "0%",
          time: "approx 15 mins",
          icon: "donor",
          link: `${appRoutes.BENEFICIARY}${appRoutes.UPDATE_COWIN_ID}`,
          enabledProjectIds: [projectIdorName(PROJECT.UMEEED)],
        },
      ]
    : [];
};
const Beneficiary = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const projectId = useQuery().get("projectId");
  const { projects } = useSelector((state) => state.user.userDetails);
  useEffect(() => {
    const steps = [...overviewBoxConfig(projects)];
    const renderSteps = steps.filter((step) => step.enabledProjectIds.includes(projectId) && step);
    dispatch(setBeneficiarySteps(renderSteps));
  }, [location, path]);
  return (
    <>
      <Switch>
        <Route exact path={path} component={BeneficiaryHome} />
        <Route exact path={`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_LIST}`} component={BeneficiaryList} />
        <Route exact path={`${appRoutes.BENEFICIARY}${appRoutes.VIAL_NUMBER}/assign`} component={BeneficiaryVialAssign} />
        <Route exact path={`${appRoutes.BENEFICIARY}${appRoutes.VIAL_NUMBER}/search`} component={BeneficiaryVialSearch} />
        <Route
          exact
          path={`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_ID_PROOF}`}
          component={BeneficiaryIDProof}
        />
        <Route
          exact
          path={`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_OVERVIEW}/:beneficiaryId`}
          component={BeneficiaryOverveiw}
        />
        <Route
          exact
          path={`${appRoutes.BENEFICIARY}${appRoutes.SCHEDULE_APPOINTMENTS}/:beneficiaryId`}
          component={BeneficiaryScheduleAppointment}
        />
        <Route
          exact
          path={`${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_DETAILS}/:beneficiaryId`}
          component={BeneficiaryVaccineAppointmentDetails}
        />
        <Route
          exact
          path={`${appRoutes.BENEFICIARY}${appRoutes.APPOINTMENT_PDF}/:beneficiaryId`}
          component={BeneficiaryAppointmentPDF}
        />
        <BeneficiaryStepper>
          <Switch>
            <Route exact path={`${path}${appRoutes.BASIC_INFO}`} component={BeneficiaryBasic} />
            <Route exact path={`${path}${appRoutes.BASIC_INFO}/:beneficiaryId`} component={BeneficiaryBasic} />
            <Route exact path={`${path}${appRoutes.EDUCATION_INFO}/:beneficiaryId`} component={BeneficiaryEducation} />
            <Route exact path={`${path}${appRoutes.FINANCIAL}/:beneficiaryId`} component={BeneficiaryFinance} />
            <Route exact path={`${path}${appRoutes.OTHER_INFO}/:beneficiaryId`} component={BeneficiaryIdentification} />
            <Route exact path={`${path}${appRoutes.HEALTH_INFO}/:beneficiaryId`} component={BeneficiaryHealth} />
            <Route exact path={`${path}${appRoutes.ASSET_INFO}/:beneficiaryId`} component={BeneficiaryAsset} />
            <Route exact path={`${path}${appRoutes.ACCESS_INFO}/:beneficiaryId`} component={BeneficiaryAccess} />
            <Route
              exact
              path={`${path}${appRoutes.SELF_DECLARATION}/:beneficiaryId`}
              component={BeneficiarySelfDeclaration}
            />
            <Route exact path={`${path}${appRoutes.UPDATE_COWIN_ID}/:beneficiaryId`} component={BeneficiaryCoWIN} />
          </Switch>
        </BeneficiaryStepper>
      </Switch>
    </>
  );
};
export default Beneficiary;
