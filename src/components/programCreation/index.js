import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import appRoutes from "../../constants/app-routes";
import BasicDetails from "./basicDetails";
import ReportingDetails from "./reportingDetails";
import DonorDetails from './donorDetails/donorDetails';
import BudgetDetails from "./budgetDetails";
import ProgramCreationStepper from "./common/ProgramCreationStepper";
// import TeamDetails from "./teamDetails/teamDetails";
import TeamDetails from "./teamDetails/teamDetailsClone";
import OrganizationalApproval from "./organizationalApproval";
// import Detailview from "./detailview";
import Detailview from "./previewProject/detailviewClone";
import PreviewProject from "./previewProject/previewprojectClone";
import Underreview from "./underreview";
import "./program-creation.scss";
import ImpactCategory from "./impact/ImpactCategory";
import ImpactPriorities from "./impact/ImpactPriorities";
import "./program-creation.scss";
import StrategicGoals from "./impact/StrategicGoals";
import ProgramName from "./impact/ProgramName";
import ProgramOverviewMain from "./programOverviewMain/programOverviewMain";
import MetricsDetails from "./matrics/MetricsDetails";
import Programcreation from "./ProgramCreation";
import ProgramList from "./programlist/ProgramList";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DonorDetailsClone from "./donorDetails/donorDetailsClone";

const ProgramCreation = () => {
  const { path } = useRouteMatch();
  
  return (
    <Switch>
      <Route exact path={`${path}`} component={Programcreation} />
      <Route exact path={`${path}/list`} component={ProgramList} />
      <Route
        exact
        path={`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_IMPACT_CATEGORY}`}
        component={ImpactCategory}
      />
      <Route
        exact
        path={`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_IMPACT_PRIORITIES}`}
        component={ImpactPriorities}
      />
      <Route
        exact
        path={`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_STRATEGIC_GOALS}`}
        component={StrategicGoals}
      />
      <Route
        exact
        path={`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_PROGRAM_NAME}`}
        component={ProgramName}
      />
       <Route
        exact
        path={`${appRoutes.PROGRAM_CREATION}${appRoutes.PROGRAM_OVERVIEW_MAIN}/:programId`}
        component={ProgramOverviewMain}
      />
      <Route
        exact
        path={`${path}/detailview/:programId`}
        component={Detailview}
      />
        <Route
        exact
        path={`${appRoutes.PROGRAM_CREATION}${appRoutes.PROGRAM_PREVIEW}/:programId`}
        component={PreviewProject}
      />
      <Route
        exact
        path={`${path}/underreview/:programId`}
        component={Underreview}
      />
      <Route
        exact
        path={`${path}${appRoutes.PRG_UNDERREVIEW}`}
        component={Underreview}
      />
      <Route
        exact
        path={`${path}/underreview/:programId`}
        component={Underreview}
      />
      <Route
        exact
        path={`${path}${appRoutes.PRG_UNDERREVIEW}`}
        component={Underreview}
      />

      <ProgramCreationStepper>
        <Route
          exact
          path={`${path}${appRoutes.PRG_BASIC}/:programId`}
          component={BasicDetails}
        />
        <Route
          exact
          path={`${path}${appRoutes.PRG_BASIC}`}
          component={BasicDetails}
        />
        <Route
          exact
          path={`${path}${appRoutes.PRG_TEAM}/:programId`}
          component={TeamDetails}
        />
        <Route
          exact
          path={`${path}${appRoutes.PRG_BUDGET}/:programId`}
          component={BudgetDetails}
        />
        <Route
          exact
          path={`${path}${appRoutes.PRG_METRICS}/:programId`}
          component={MetricsDetails}
        />
        <Route
          exact
          path={`${path}${appRoutes.PRG_DONOR}/:programId`}
          // component={DonorDetails}
          component={DonorDetailsClone}
        />
        <Route
          exact
          path={`${path}${appRoutes.PRG_REPORTING}/:programId`}
          component={ReportingDetails}
        />
        <Route
          exact
          path={`${path}${appRoutes.PRG_ORGANIZATIONAL_APPROVAL}/:programId`}
          component={OrganizationalApproval}
        />
      </ProgramCreationStepper>
    </Switch>
  );
};

export default ProgramCreation;
