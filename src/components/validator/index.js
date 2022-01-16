import { Route, Switch, useRouteMatch } from "react-router";
import appRoutes from "../../constants/app-routes";
import OrganisationList from "./OrganisationList";
import OrganisationPreviewValidation from "./OrganisationValidationPreview";
import ProgramValidation from "./ProgramValidation";
import ProposalList from "./ProposalList";
import "./validator.scss";
import ValidatorDashboard from "./ValidatorDashboard";
import ValidatorRegistration from './validatorRegistration';
import ValidatorDocs from './validatorDocs';

const Proposal = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <div className="validator-screen">
        <Route exact path={`${path}`} component={ValidatorDashboard} />
        <Route exact path={`${path}${appRoutes.VALIDATOR_DASHBOARD}`} component={ValidatorDashboard} />
        <Route exact path={`${path}${appRoutes.PROPOSALS}`} component={ProposalList} />
        <Route exact path={`${path}${appRoutes.ORGANISATIONS}`} component={OrganisationList} />
        <Route exact path={`${path}${appRoutes.PROPOSALS}/:programId`} component={ProgramValidation} />
        <Route exact path={`${path}${appRoutes.ORGANISATIONS}/:organisationId`} component={OrganisationPreviewValidation} />
        <Route exact path={`${path}${appRoutes.VALIDATOR_REGISTRATION}`} component={ValidatorRegistration} />
        <Route exact path={`${path}${appRoutes.VALIDATOR_REGISTRATION}${appRoutes.VALIDATOR_DOCUMENTS}`} component={ValidatorDocs} />
      </div>
    </Switch>
  );
};
export default Proposal;
