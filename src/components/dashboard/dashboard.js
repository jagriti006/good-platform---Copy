import {Col, Row} from "antd";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import "../../assets/css/dashboard.css";
import "../../assets/css/dashboard.scss";
import CreateProgramIllustrator from "../../assets/images/CreateProgramIllustrator.png";
import bulb from "../../assets/images/help.png";
import line from "../../assets/images/linedashboard.png";
import mask from "../../assets/images/maskpic.png";
import frameIcon from "../../assets/images/preview/frame1.png";
import forwardIcon from "../../assets/images/preview/vector.png";
import appRoutes from "../../constants/app-routes";
import userAPI from "./../../api/userAPI";
import "./index.scss";
import {ROLES} from "../../constants/strings";

const Dashboard = () => {
  const history = useHistory();
  const [signedAgreement, setSignedAgreement] = useState(false);
  const [totalPartners, setTotalPartners] = useState(0);
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [totalBeneficiary, setTotalBeneficiary] = useState(0);
  const isAdmin = sessionStorage.getItem("userRole") === ROLES.ADMIN ? true : false;

  useEffect(() => {
    sessionStorage.setItem("projectId", "");
    if (!isAdmin) {
      checkAgreementStatus();
    }else if (isAdmin){
      getOraganisationData();
      getProgramData();
      getBeneficiaryCountData();
    }
  }, []);

  const getOraganisationData = () => {
    userAPI()
      .getAdminOrganisationData()
      .then((res) => {
        const {data} = res;
        if (data) {
          setTotalPartners(data.totalElements);
        }
      });
  }

  const getProgramData = () => {
    userAPI()
      .getAdminProgramData()
      .then((res) => {
        const {data} = res;
        if (data) {
          setTotalPrograms(data.totalElements);
        }
      });
  }

  const getBeneficiaryCountData = () => {
    userAPI()
      .getAdminBeneficiaryCountData()
      .then((res) => {
        const {data} = res;
        if (data) {
          setTotalBeneficiary(data);
        }
      });
  }

  const checkAgreementStatus = () => {
    const signedStat = sessionStorage.getItem("signedAgreement") === "true" ? true : false;
    setSignedAgreement(signedStat);
    const orgId = sessionStorage.getItem("organisationId");
    if (!signedStat) {
      userAPI()
        .getAgreementStatus(orgId)
        .then((res) => {
          const {data} = res;
          if (data) {
            sessionStorage.setItem("signedAgreement", data?.signedAgreement);
            setSignedAgreement(data?.signedAgreement);
          }
        });
    }
  };

  const handleCompleteRegistrationClick = () => {
    history.push(`${appRoutes.AGREEMENT}`);
  };

 const handleReportClick = () => {
   history.push(`${appRoutes.REPORTING}`)
 };

  const handleProgramCreationClick = () => {
    history.push(`${appRoutes.PROGRAM_CREATION}`); 
  };

  const handleMilestoneClick = () => {
history.push(`${appRoutes.MILESTONE}`);
  };

  const handleProposalClick = ()  => {
    history.push(`${appRoutes.PROPOSAL_SUMMARY}`);
  };


  return !isAdmin ? (
    <>
      {!signedAgreement && (
        <Row style={{background: "#FFFFFF", height: "92vh"}}>
          <Col sm={20} lg={24} className="dashboard-content">
            <div className="row paddingTopMedium" justify="space-between">
              <div className="col-md-8">
                <img src={mask} alt={"mask"}/>
                <img src={line} alt={"line"}/>
              </div>
              <div className="col-md-4 boxshadow">
                <img src={bulb} alt={"bulb"}/>
                <h5 className={"content-heading"}>HOW THE GOOD PLATFORM WORKS?</h5>
                <h6 className={"content-description"}>
                  Once you receive your validation you can start creating programs and build your network.
                </h6>
              </div>
              <div className="col-md-8">
                <p className="titleheading">
                  Woo Hoo!
                  <br/>
                  You’re one step closer
                </p>
                <p className="subtitle mb-0">Your agreement is ready!</p>
                <p className="paragraphtitle">
                  Your profile has been validated. Accept and sign the agreement to complete your registration.
                </p>
                <button className="signbutton" onClick={handleCompleteRegistrationClick}>
                  VIEW & SIGN
                </button>
              </div>
              <div className="col-md-4 boxshadow mt-5">
                <img src={bulb} alt={"bulb"}/>
                <h5 className={"content-heading"}>HOW TO BUILD YOUR NETWORK?</h5>
                <h6 className={"content-description"}>
                  Once you receive your validation you can start creating programs and build your network.
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      )}
      {signedAgreement && (
        <Row style={{background: "#FFFFFF", height: "92vh"}}>
          <Col sm={20} lg={24} className="dashboard-content">
            <div className="row paddingTopMedium" justify="space-between">
              <div className="col-md-12">
                <p className="titleheading">Congrats, you have been successfully registered!</p>
                <p className="missionheading">
                  You now have full access to The Good Platform dashboard. Update your organisation or get started with
                  your first program.
                </p>
                <div className="avout formStyles p-15 divSpace">
                  <div className="row col-md-12 col-sm-12 titleprevRed">
                    <div className="col-md-1">
                      <img src={frameIcon} alt=""/>
                    </div>
                    <div className="col-md-10">
                      <label class="alignleft">
                        <strong className="noticeHeading">Update Organisation Profile</strong>
                        <br/>
                        <span className="noticeText">
                          Improve your organisation profile by adding more information such as company and financial
                          history
                        </span>
                      </label>
                    </div>
                    <div className="col-md-1">
                      <a href="" target="_blank">
                        <img className="forwardButton" src={forwardIcon} alt=""/>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row avout formStyles p-15 divSpace">
                  <div className="col-md-12 col-sm-12 titleprev contentLeft" style={{display: "flex"}}>
                    <div className="col-md-6 col-sm-6 titleprev contentLeft">
                      <p className="noticeHeading">Create your first program</p>
                      <p className="paragraphtitle">
                        Fill in your detals and get started on your <br/>
                        funding journey.
                      </p>
                      <button className="signbutton marginZero" onClick={handleProgramCreationClick}>
                        GET & STARTED
                      </button>
                        

                      <div style={{display: "flex"}}>
                      <button className="signbutton marginZero" onClick={handleMilestoneClick}>
                      MILESTONE
                      </button>

                      <button className="signbutton marginZero" onClick={handleReportClick}>
                      REPORTING
                      </button>

                      <button className="signbutton marginZero" onClick={handleProposalClick}>
                     PROPOSAL SUMMARY
                      </button>
</div>
                    </div>
                    <div className="col-md-6 col-sm-6 contentLeft">
                      <img src={CreateProgramIllustrator} alt={"CreateProgramIllustrator"}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  ) : (
    <Row style={{height: '80vh', background: 'white'}}>
      <Col sm={20} lg={24} className="dashboard-content">
        <h3 className={'font-weight-bold'}>Hi, Super Admin</h3>
        <p style={{fontSize: '0.8rem'}}>Lett's explore your Dashboard</p>

        <div className={'row'} style={{gap: '3rem'}}>
          <div className={'col-md-3 dashboardCard'} onClick={() => history.push(appRoutes.IMPLEMENTATION_PARTNERS)}>
            <div className={'dashboardCardHeading'}>
              <h3 className={'font-weight-bold'}>{totalPartners}</h3>
              <img src={frameIcon}/>
            </div>
            <h5 className={'font-weight-bold'}>Implementation Partners</h5>
            <p className={'dashboardCardP'}>Last updated : 10 March 2021</p>
          </div>
          <div className={'col-md-3 dashboardCard'} onClick={() => history.push(appRoutes.PROGRAMS)}>
            <div className={'dashboardCardHeading'}>
              <h3 className={'font-weight-bold'}>{totalPrograms}</h3>
              <img src={frameIcon}/>
            </div>
            <h5 className={'font-weight-bold'}>Programs Undergoing</h5>
            <p className={'dashboardCardP'}>Last updated : 10 March 2021</p>
          </div>
          <div className={'col-md-3 dashboardCard'} onClick={() => history.push(appRoutes.IMPLEMENTATION_PARTNERS)}>
            <div className={'dashboardCardHeading'}>
              <h3 className={'font-weight-bold'}>{totalBeneficiary}</h3>
              <img src={frameIcon}/>
            </div>
            <h5 className={'font-weight-bold'}>Beneficiaries Onborded</h5>
            <p className={'dashboardCardP'}>Last updated : 10 March 2021</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
