import { message, notification } from "antd";
import { first, last } from "lodash";
import userAPI from "../../api/userAPI";
import { history } from "../../App";
import { getProjectId } from "../../utils/utils";
import { USER } from "../action-constants";
import { sidebarActions } from "../ui/uiActions";
import { store } from "./../store";
import { ROLES } from "../../constants/strings";
import appRoutes from "../../constants/app-routes";

export const saveUserData = (payload) => {
  sessionStorage.setItem("userRole", payload?.userRole);
  sessionStorage.setItem("userId", payload?.userId);
  sessionStorage.setItem("organisationId", payload?.organisationId);
  sessionStorage.setItem("email", payload?.email);
  sessionStorage.setItem("detailsUpdated", payload?.detailsUpdated);
  return {
    type: USER.SAVE_USER_DATA,
    payload: payload,
  };
};

export const fetchUserData = () => async (dispatch) => {
  const response = await userAPI().getUserDetails();
  if (response.data) {
    const { data } = response;
    if (data) {
      dispatch(
        saveUserData({
          ...data,
          projectId: data.projects && data.projects[0] ? getProjectId(first(data.projects)) : "",
          projects: data.projects,
          userRole: data.userRole,
          userId: data.userId,
          organisationId: data.organisations && data.organisations[0] ? first(data.organisations) : "",
          detailsUpdated: data?.detailsUpdate
        })
      );
    }
  }
};

export const doLogin = (data) => async (dispatch) => {
  const response = await userAPI().doLogin(data);
  if (response?.accessToken) {
    const { accessToken } = response;
    sessionStorage.setItem("access_token", accessToken.access_token);
    sessionStorage.setItem("refresh_token", accessToken.refresh_token);
    sessionStorage.setItem("headerVisibility", true);
    store.dispatch(fetchUserData()).then(() => {
      dispatch(sidebarActions.showSidebar());
      const orgId = sessionStorage.getItem("organisationId");
      if (orgId) {
        userAPI()
          .getAgreementStatus(orgId)
          .then((res) => {
            if (res?.data) {
              sessionStorage.setItem("signedAgreement", res.data?.signedAgreement);
            }
            history.push("/");
          });
      } else {
        if (sessionStorage.userRole === ROLES.HEALTH_WORKER) {
          history.push(appRoutes.BENEFICIARY);
        } else if (sessionStorage.userRole === ROLES.VALIDATOR) {
          const detailsUpdated = sessionStorage.getItem("detailsUpdated");
          if (detailsUpdated && detailsUpdated === "true") {
            history.push(appRoutes.VALIDATOR);
          } else {
            history.push("/successMessage");
          }
        } else if (sessionStorage.userRole === ROLES.ADMIN) {
          history.push("/");
        } else history.push("/successMessage");
      }
    });
  } else {
    notification.error({ message: "Invalid login credentials..!" });
  }
};
