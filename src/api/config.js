import { store } from "../redux/store";

// -------------------------- Development Env. URLs -----------------------------------------

// export const BASE_URL = "http://3.108.162.127:8081";
// export const COWIN_BASE_URL = "http://3.108.162.127:8092/cowin/v1";
 export const TASK_MANAGERS_BASE_URL = "http://13.235.35.46:8090";

// -------------------------- Test Env. URLs ------------------------------------------------

 export const BASE_URL = "http://13.235.35.46:8081";
 export const COWIN_BASE_URL = "http://13.235.35.46:8081/cowin/v1";

// ------------------------- Production Env. URLs -------------------------------------------

// export const BASE_URL = "https://tgpbackendapi.consumerlinks.in";
// export const COWIN_BASE_URL = "http://3.109.75.106:8092/cowin/v1";

// ------------------------- UAT Env. URLs --------------------------------------------------

// export const BASE_URL = "https://tgpbackendapi-uat.consumerlinks.in";
// export const COWIN_BASE_URL = "http://13.235.35.46:8092/cowin/v1";

// ------------------------------------------------------------------------------------------

export const AUTH_TOKEN = sessionStorage.getItem("access_token");
export const BENEFICIARY_META = "beneficiary/v1";

export const getBeneficiaryUrl = (url) => `${BASE_URL}/${BENEFICIARY_META}/${url}`;

function updateOptions(options) {
  const update = { ...options };

  if (AUTH_TOKEN) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    };
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(`${BASE_URL}${url}`, updateOptions(options));
}

export const PROJECT_MANAGEMENT_META = "project-management/v1";
export const getProjectManagementUrl = (url) => `${BASE_URL}/${PROJECT_MANAGEMENT_META}/${url}`;
export const SOCIAL_ORG_META = "social-org/v1";
export const getSocialOrgUrl = (url) => `${BASE_URL}/${SOCIAL_ORG_META}/${url}`;
export const documentkyc = (url) => `${BASE_URL}/${url}`;

export const projectIdorName = (name, projectId) => {
  const { projects } = store.getState().user.userDetails;

  if (projectId) {
    const projectById = {};
    projects &&
      projects.forEach((item) => {
        projectById[item.id] = item.project;
      });
    return projectById[projectId];
  } else if (name) {
    const projectByName = {};
    projects &&
      projects.forEach((item) => {
        projectByName[item.project] = item.id;
      });
    return projectByName[name];
  }
};
