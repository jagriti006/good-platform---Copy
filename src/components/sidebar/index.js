import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import beneficiaryIcon from "../../assets/images/dashboardIcons/beneficiary.png";
import dashboardIcon from "../../assets/images/dashboardIcons/dashboard.png";
import eventIcon from "../../assets/images/dashboardIcons/events.png";
import illustration from "../../assets/images/dashboardIcons/illustration.png";
import inviteuser from "../../assets/images/dashboardIcons/inviteUser.png";
import myNetworkIcon from "../../assets/images/dashboardIcons/myNetwork.png";
import programIcon from "../../assets/images/dashboardIcons/program.png";
import registrationIcon from "../../assets/images/dashboardIcons/registration.png";
import appRoutes from "../../constants/app-routes";
import { ROLES } from "../../constants/strings";

const { Sider } = Layout;

const getMenuItems = (organisationId, signedAgreement, isAdmin) => isAdmin ? [
  {
    id: 0,
    option: "Dashboard",
    link: "/dashboard",
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={dashboardIcon} alt="" />,
  },
  {
    id: 1,
    option: "Implementation Partners",
    link: appRoutes.IMPLEMENTATION_PARTNERS,
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={dashboardIcon} alt="" />,
  },
  {
    id: 2,
    option: "Knowledge Partners",
    link: "/knowledge-partners",
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={beneficiaryIcon} alt="" />,
  },
  {
    id: 3,
    option: "Programs",
    link: appRoutes.PROGRAMS,
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={programIcon} alt="" />,
  },
  {
    id: 4,
    option: "Beneficiary",
    link: "/beneficiary",
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={beneficiaryIcon} alt="" />,
  },
  {
    id: 5,
    option: "Job Portal",
    link: "/job-portal",
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={dashboardIcon} alt="" />,
  },
  {
    id: 6,
    option: "My Network",
    link: "/my-network",
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={myNetworkIcon} alt="" />,
  },
  {
    id: 7,
    option: "Invite User",
    link: "/invite-user",
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={inviteuser} alt="" />,
  },
  {
    id: 8,
    option: "Settings",
    link: "/settings",
    isActive: true,
    roles: [ROLES.ADMIN],
    icon: <img src={dashboardIcon} alt="" />,
  },
] : [
  {
    id: 0,
    option: "Dashboard",
    link: "/dashboard",
    isActive: true,
    roles: [ROLES.SOCIAL_ADMIN, ROLES.ADMIN],
    icon: <img src={dashboardIcon} alt="" />,
  },
  {
    id: 1,
    option: "Overview",
    link: appRoutes.ORGANISATION,
    isActive: true,
    roles: [ROLES.SOCIAL_ADMIN],
    icon: <img src={programIcon} alt="" />,
  },
  {
    id: 2,
    option: "Programs",
    link: appRoutes.PROGRAM_CREATION,
    isActive: signedAgreement,
    roles: [ROLES.SOCIAL_ADMIN],
    icon: <img src={eventIcon} alt="" />,
  },
  {
    id: 3,
    option: "Beneficiary",
    link: sessionStorage.userRole == [ROLES.SOCIAL_ADMIN] ? `${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_LIST}` : appRoutes.BENEFICIARY,
    isActive: signedAgreement || sessionStorage.userRole === ROLES.HEALTH_WORKER,
    roles: [ROLES.FIELD_AGENT, ROLES.SOCIAL_ADMIN, ROLES.HEALTH_WORKER],
    icon: <img src={beneficiaryIcon} alt="" />,
  },
  {
    id: 4,
    option: "Report",
    link: "/report",
    roles: [ROLES.SOCIAL_ADMIN, ROLES.ADMIN],
    isActive: sessionStorage.getItem("userRole") === ROLES.ADMIN ? true : signedAgreement,
    icon: <img src={eventIcon} alt="" />,
  },
  {
    id: 5,
    option: "My Networks",
    link: "/dashboard",
    isActive: false,
    roles: [ROLES.SOCIAL_ADMIN],
    icon: <img src={myNetworkIcon} alt="" />,
  },
  {
    id: 6,
    option: "Invite Users",
    link: "/invite-user",
    isActive: organisationId && signedAgreement,
    roles: [ROLES.SOCIAL_ADMIN],
    icon: <img src={inviteuser} alt="" />,
  },
  {
    id: 7,
    option: "Self Registration",
    link: "/volunteerRegistration",
    isActive: true,
    roles: [ROLES.FIELD_AGENT],
    icon: <img src={registrationIcon} alt="" />,
  },
  {
    id: 8,
    option: "Add Center",
    link: "/add-center",
    isActive: organisationId && signedAgreement,
    roles: [ROLES.SOCIAL_ADMIN],
    icon: <img src={inviteuser} alt="" />,
  },
  {
    id: 9,
    option: "Dashbord",
    link: `${appRoutes.VALIDATOR}${appRoutes.VALIDATOR_DASHBOARD}`,
    isActive: true,
    roles: [ROLES.VALIDATOR],
    icon: <img src={dashboardIcon} alt="" />,
  },
  {
    id: 10,
    option: "Proposals",
    link: `${appRoutes.VALIDATOR}${appRoutes.PROPOSALS}`,
    isActive: true,
    roles: [ROLES.VALIDATOR],
    icon: <img src={registrationIcon} alt="" />,
  },
  {
    id: 11,
    option: "Organisations",
    link: `${appRoutes.VALIDATOR}${appRoutes.ORGANISATIONS}`,
    isActive: true,
    roles: [ROLES.VALIDATOR],
    icon: <img src={programIcon} alt="" />,
  },
  {
    id: 12,
    option: "Daily Report",
    link: "/daily-report",
    isActive: signedAgreement,
    roles: ["SOCIAL-ADMIN"],
    icon: <img src={eventIcon} alt="" />,
  },
];

const SideBar = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const signedAgreement = sessionStorage.getItem("signedAgreement") === "true" ? true : false;
  const isAdmin = sessionStorage.getItem("userRole") === ROLES.ADMIN ? true : false;

  return (
    <Sider width={225} className="dashboardMenu site-layout-background" style={{ height: "92vh" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {getMenuItems(userDetails?.organisationId, signedAgreement, isAdmin).map((item) => {
          if (item.roles.includes(userDetails.userRole))
            return (
              <Menu.Item key={item.id} disabled={!item.isActive}>
                <Link to={item.link}>
                  {item.icon}
                  <span
                    style={{
                      paddingLeft: "16px",
                      fontSize: "13px",
                    }}
                  >
                    <b>{item.option}</b>
                  </span>
                </Link>
              </Menu.Item>
            );
          else return null;
        })}
        {!isAdmin ? <img src={illustration} alt={"illustration"} className="dashboardMenu menuImage" /> : null}
      </Menu>
    </Sider>
  );
};

export default SideBar;
