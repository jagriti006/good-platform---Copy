import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactRoundedImage from "react-rounded-image";
import { Redirect } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import user from "../../assets/images/header/avathar.png";
import help from "../../assets/images/header/help.png";
import logo from "../../assets/images/header/logo.png";
import appRoutes from "../../constants/app-routes";
import { sidebarActions } from "../../redux/ui/uiActions";
import apiRequest from "../../utils/api-utils/api-request";

const sidebarRoutes = [
  `/dashboard`,
  // `${appRoutes.ORGANISATION}`,
  `${appRoutes.PROGRAM_OVERVIEW}`,
  `${appRoutes.BENEFICIARY}`,
  `${appRoutes.BENEFICIARY_LIST}`,
  `/ProgramOverviewMain`,
  `/invite-user`,
  `/add-center`,
  `/daily-report`,
  `${appRoutes.IMPLEMENTATION_PARTNERS}`,
  `${appRoutes.PROGRAMS}`,
];

const Header = () => {
  const [uData, setUData] = useState({
    responseData: "",
    firstName: "User",
    redirect: true,
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (sidebarRoutes.includes(location.pathname)) {
      dispatch(sidebarActions.showSidebar());
    } else {
      dispatch(sidebarActions.hideSidebar());
    }
  }, [location.pathname]);

  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (uData.redirect === false || token == null) {
      return <Redirect to="/login" />;
    }
  }, []);

  const doLogout = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    return apiRequest({
      url: "/auth/v1/auth/logout",
      method: "POST",
      data: {
        refreshToken: refreshToken,
      },
    });
  };

  const logout = async () => {
    await doLogout();
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("headerVisibility");
    sessionStorage.clear();
    dispatch(sidebarActions.hideSidebar());
    history.push("/login");
  };

  return (
    <>
      {token ? (
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center h-100">
            <a className=" mr-auto " onClick={() => history.push("/dashboard")}>
              <img src={logo} />
            </a>
            <nav className="nav-menu ">
              <ul>
                <li>
                  <ReactRoundedImage image={help} roundedSize="0" imageWidth="30" imageHeight="30" />
                </li>
                <li className="drop-down">
                  <div style={{ display: "flex" }}>
                    <ReactRoundedImage image={user} roundedSize="0" imageWidth="40" imageHeight="32" />
                    <FontAwesomeIcon icon={faAngleDown} style={{ margin: "auto 6px" }} />
                  </div>
                  <ul>
                    <li>
                      <a onClick={() => logout()}>Logout</a>
                    </li>
                    {/* <li>
                      <a href="#">Drop Down 2</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 3</a>
                    </li> */}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
