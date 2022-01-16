import "antd/dist/antd.css";
import { createBrowserHistory } from "history";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import "./App.css";
import "./assets/css/form.scss";
import "./assets/css/loginForm.scss";
import "./assets/css/previewcreation.scss";
import "./assets/css/soOnboarding.scss";
import "./assets/css/stepper.css";
import "./assets/css/style.css";
import Milestone from "./components/allPrograms/mileStone"; 
import CenterList from "./components/addCenter/centerList";
import AgreementForm from "./components/agreementForm/agreement";
import Beneficiary from "./components/beneficieryForm/index";
import BeneficiaryList from "./components/beneficieryList";
import ImplementationPartners from "./components/adminPages/ImplementationPartners";
import CookieBanner from "./components/cookieAndPrivacy/cookieBanner";
import DataRetention from "./components/cookieAndPrivacy/dataRetention";
import PrivacyPolicy from "./components/cookieAndPrivacy/privacyPolicy";
import Dashboard from "./components/dashboard/dashboard";
import BeneficiariesListing from "./components/detailPages/beneficiariesListing";
import InviteUserList from "./components/inviteUser/inviteUserList";
import Footer from "./components/layouts/footer.js";
import Header from "./components/layouts/header";
import PrivateRoute from "./components/layouts/PrivateRoute";
import Spinner from "./components/layouts/Spinner";
import ForgotPassword from "./components/login/forgotPassword";
import Login from "./components/login/login";
import SuccessMessage from "./components/login/LoginSuccess/successMessage";
import OtpVerify from "./components/login/otpVerify";
import PasswordReset from "./components/login/passwordReset";
import UserRegistration from "./components/login/userRegistration";
import FinalSubmit from "./components/organisationForm/finalSubmit";
import Organisation from "./components/organisationForm/index";
import OrganisationForm from "./components/organisationForm/organisationForm";
import Preview from "./components/organisationForm/preview";
import ProgramCreation from "./components/programCreation";
import ProgramOverview from "./components/programCreation/common/programOverview";
import BasicInfo from "./components/programCreation/previewProject/basicInfo/basicInfoClone";
import Detailview from "./components/programCreation/previewProject/detailviewClone";
import PreviewProject from "./components/programCreation/previewProject/previewprojectClone";
import ProgramOverviewMain from "./components/programCreation/programOverviewMain/programOverviewMain";
import QuickInfo from "./components/programCreation/quickinfo";
import Report from "./components/programCreation/report";
import Underreview from "./components/programCreation/underreview";
import Proposal from "./components/validator";
import VolunteerRegistration from "./components/registrationForm/volunteerRegistration";
import ScrollToTop from "./components/ScrollToTop";
import SideBar from "./components/sidebar";
import appRoutes from "./constants/app-routes";
import { getCookie } from "./utils/cookie.util";
import DailyReport from './components/dailyReport/daily-report';
import Programs from "./components/adminPages/Programs";
import InviteUser from "./components/inviteUser";
import TaskManager from "./components/allPrograms";
import Proposal_summary from "./components/allPrograms/proposal";
import Reporting from "./components/allPrograms/reporting";
export const history = createBrowserHistory();

function App() {
  const showSidebar = useSelector((state) => state.ui.showSidebar);
  const condition = sessionStorage.getItem("access_token");
  const isCookieAccepted = getCookie("cookied");

  return (
    <Spinner>
      <Router history={history}>
        <ScrollToTop />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={() => <Redirect to="/dashboard" />} />
          <Route exact path="/userRegisteration" component={UserRegistration} />
          <Route exact path="/otpVerify" component={OtpVerify} />
          <Route exact path="/passwordReset" component={PasswordReset} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/successMessage" component={SuccessMessage} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/data-retention" component={DataRetention} />
        </Switch>
        {condition && (
          <Fragment>
            <Header />
            <div style={{ display: "flex", marginTop: "75px" }}>
              {showSidebar && <SideBar />}
              {/*style={{ height: '92vh', width: '100%', overflowY: 'scroll' }}*/}
              <main
                id="main"
                style={{
                  height: "calc(100vh - 75px)",
                  width: "100%",
                  overflowY: "scroll",
                }}
              >
                <section style={{ margin: 0 }}>
                  <Switch>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/invite-user" component={InviteUser} />
                    <PrivateRoute exact path="/add-center" component={CenterList} />
                    <PrivateRoute path={appRoutes.ORGANISATION} component={Organisation} />
                    <PrivateRoute exact path="/organisationSetting" component={OrganisationForm} />
                    <Route exact path="/preview" component={Preview} />
                    <PrivateRoute exact path="/basicInfo" component={BasicInfo} />
                    <PrivateRoute exact path="/quickinfo" component={QuickInfo} />
                    <PrivateRoute path={appRoutes.MILESTONE} component={Milestone} />
                    <PrivateRoute path={appRoutes.REPORTING} component={Reporting} />
                    <PrivateRoute path={appRoutes.PROPOSAL_SUMMARY} component={Proposal_summary} />
                    <PrivateRoute path={appRoutes.TASK_MANAGER} component={TaskManager} />
                    <PrivateRoute exact path="/underreview" component={Underreview} />
                    <PrivateRoute exact path="/detailview" component={Detailview} />
                    <PrivateRoute exact path="/previewproject" component={PreviewProject} />
                    <PrivateRoute path={appRoutes.BENEFICIARY} component={Beneficiary} />
                    <PrivateRoute path={appRoutes.BENEFICIARY_LIST} component={BeneficiaryList} />
                    <PrivateRoute path={appRoutes.IMPLEMENTATION_PARTNERS} component={ImplementationPartners} />
                    <PrivateRoute exact path="/soSubmit" component={FinalSubmit} />
                    <PrivateRoute exact path="/agreement" component={AgreementForm} />
                    
                    <PrivateRoute path={appRoutes.PROGRAM_CREATION} component={ProgramCreation} />
                    <PrivateRoute exact path="/programOverview" component={ProgramOverview} />
                    <PrivateRoute exact path="/volunteerRegistration" component={VolunteerRegistration} />
                    <PrivateRoute exact path="/report" component={Report} />
                    <PrivateRoute exact path="/daily-report" component={DailyReport} />
                    <PrivateRoute path={appRoutes.VALIDATOR} component={Proposal} />

                    <PrivateRoute exact path={appRoutes.PROGRAMS} component={Programs} />

                    {/* This should be kept at the end  */}
                    {/* <Route  exact path="*" component={Notfound} /> */}
                  </Switch>
                </section>
                <Footer />
              </main>
            </div>
            {!isCookieAccepted && <CookieBanner />}
          </Fragment>
        )}
      </Router>
    </Spinner>
  );
}

export default App;
