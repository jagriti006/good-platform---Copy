import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import success from "../../assets/images/success.png";
import { ROLES } from "../../constants/strings";
import appRoutes from "../../constants/app-routes";

const { Title } = Typography;

const finalSubmit = () => {
  const userRole = sessionStorage.getItem("userRole");
  const isValidator = userRole === ROLES.VALIDATOR;
  return (
    <>
      <div className={"formStyles"} style={{ background: "white", marginTop: "-8%" }}>
        <div className="container displayFlex justify-content-center align-items-center" style={{ padding: "3%" }}>
          <div className="row displayFlex flex-column">
            <div className="main displayFlex justify-content-center align-items-center flex-column">
              <div className="row displayFlex align-items-center justify-content-center">
                <img src={success} />
              </div>
              <div
                className="registrationContent displayFlex  align-items-center justify-content-center flex-column"
                style={{ boxShadow: "none" }}
              >
                {isValidator ? 
                <h1
                  className={"successText font-weight-bold text-center"}
                  style={{ width: "100%", marginBottom: "5%" }}
                >
                  Your registration is complete
                </h1> :
                <h1
                  className={"successText font-weight-bold text-center"}
                  style={{ width: "100%", marginBottom: "5%" }}
                >
                  Your Organisation has been created
                </h1>
                }

                <Title className={"registrationContentTitle text-center mb-5"}>
                  We will validate your profile and you will <b>receive an email</b> in 48 hours!
                </Title>
                <div className={"displayFlex justify-content-between align-items-center"}>
                  <Link to={isValidator ? `${appRoutes.VALIDATOR}${appRoutes.VALIDATOR_DASHBOARD}` : "/dashboard"}>
                    <Button type="primary" key="console">
                      Proceed to dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default finalSubmit;
