import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../assets/css/dashboard.css";
import "../../assets/css/dashboard.scss";
import spider from "../../assets/images/spidergroup.png";
import appRoutes from "../../constants/app-routes";
import { sidebarActions } from "../../redux/ui/uiActions";
import { fetchUserData } from "../../redux/user/userActions";

const Programcreation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    if (userDetails?.projects?.length > 0) {
      history.push(`${appRoutes.PROGRAM_CREATION}/list`);
      return;
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchUserData());
      dispatch(sidebarActions.showSidebar());
    };
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row style={{ background: "#FFFFFF", height: "92vh" }} className="program-creation-form program-creation-stepper">
      <Col sm={18} lg={20} className="dashboard-content">
        <div className="row paddingTopMedium" justify="space-between">
          <div className="col-md-12">
            <p className="programtitle">Programs</p>
          </div>
          <div className="col-md-4">
            <img src={spider} alt={"mask"} />
          </div>
          <div className="col-12 col-lg-4">
            <p className="programdesc">
              Looks empty...
              <br />
              Start your first program now!
            </p>
            <Text
              className="progdescbutt"
              onClick={() => history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_IMPACT_CATEGORY}`)}
            >
              CREATE PROGRAM
            </Text>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Programcreation;
