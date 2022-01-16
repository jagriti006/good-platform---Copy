import axios from "axios";
import fetcher, { AUTH_TOKEN, BASE_URL } from "./config";
import apirequest from "../utils/api-utils/api-request";
import apiRequest from "../utils/api-utils/api-request";

const ProgramcreationAPI = () => {
  const token = sessionStorage.getItem("access_token");

  return {
    getImpactCategories: async () => {
      return apiRequest({
        url: `/project-management/v1/project/impacts/categories`,
      });
    },
    getImpactPriorities: async (impactCategoryId) => {
      return apiRequest({
        url: `/project-management/v1/project/impacts/priorities`,
        params: { impactCategoryId },
      });
    },
    getStartegicGoals: async (impactPriorityId) => {
      return apiRequest({
        url: `/project-management/v1/project/impacts/strategic-goals`,
        params: { impactPriorityId },
      });
    },
    fetchPercent: async (projectId) => {
      return apiRequest({
        url: `/project-management/v1/project/${projectId}/percentage`,
      });
    },
    addOrUpdateBasicDetail: async (formData) => {
      const BasicUpdate = sessionStorage.getItem("basicUpdate");
      return apiRequest({
        method: BasicUpdate === "true" ? "PUT" : "POST",
        url: "/project-management/v1/project/",
        data: formData,
      });
    },
    fetchProjectbasicdetail: async (projectId) => {
      return apiRequest({
        url: `/project-management/v1/project/${projectId}`,
      });
    },
    getReportFrequency: async () => {
      return apiRequest({
        url: `/project-management/v1/project/report/frequency`,
      });
    },
    addFrequencyData: async () => {
      let formData = new FormData();
      formData.set("frequency", "Once in 3 days");

      return apiRequest({
        method: "POST",
        url: "/project-management/v1/project/report/frequency",
        data: formData,
      });
    },
    addReportDetails: async (formData) => {
      return apiRequest({
        method: formData.update ? "PUT" : "POST",
        url: "/project-management/v1/project/report",
        data: formData,
      });
    },
    getReportDetail: async (projectId) => {
      return apiRequest({
        url: `/project-management/v1/project/report/${projectId}`,
      });
    },
    addOrUpdateTeamDetail: async (formData) => {
      const teamUpdate = sessionStorage.getItem("teamdetailsUpdate");

      return apiRequest({
        method: teamUpdate === "true" ? "PUT" : "POST",
        url: "/project-management/v1/project-team-details/",
        data: formData,
      });
    },
    fetchProjectteamdetails: async (projectId) => {
      return apiRequest({
        url: `/project-management/v1/project-team-details/${projectId}`,
      });
    },
    deleteProjectteamdetails: async (memberId) => {
      return apiRequest({
        url: `/project-management/v1/project-team-details/${memberId}`,
        method: "DELETE",
      });
    },
    addorbudgetetail: async (formData) => {
      return apiRequest({
        method: formData.id ? "PUT" : "POST",
        url: "/project-management/v1/budget",
        data: formData,
      });
    },
    fetchProjectbudgetdetails: async (projectId) => {
      return apiRequest({
        url: `/project-management/v1/budget/${projectId}`,
      });
    },

    fetchProjetcKeyRoles: async () => {
      return apiRequest({
        url: "/project-management/v1/project-key-roles/",
      });
    },
    uplaodImageAndGetURL: async (file) => {
      let formData = new FormData();
      formData.set("file", file);
      formData.set("fileCategory", "SOCIAL_ORGANISATION");

      return apirequest({
        method: "POST",
        data: formData,
        url: "/file-upload/v1/file/upload",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    createProgram: async (formData) => {
      return apiRequest({
        method: "POST",
        url: "/project-management/v1/project/impact-details",
        data: formData,
      });
    },
    fetchProgramList: async (organisationId) => {
      return apiRequest({
        url: `/project-management/v1/project/projects-by-organisation/${organisationId}`,
      });
    },
    fetchDonorDetails: async (projectId) => {
      return apiRequest({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        url: `/project-management/v1/project/donor/${projectId}`,
      });
    },
    fetchProjectModels: async () => {
      return apiRequest({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        url: `/project-management/v1/project/donor/funding-models`,
      });
    },
    fetchProjectReportdetail: async (projectId) => {
      return apiRequest({
        url: `/project-management/v1/project/report/${projectId}`,
      });
    },

    fetchProjectMetricdetails: async (projectId) => {
      return apiRequest({
        url: `/project-management/v1/metric/${projectId}`,
      });
    },
    fetchOrganisationApprovaldetails: async (projectId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/leadership/${projectId}`,
      });
    },
    saveImpactDetails: async (formData) => {
      return apiRequest({
        method: "POST",
        url: `/project-management/v1/project/metrics/`,
        data: formData,
      });
    },
    fetchImpactDetails: async (projectId) => {
      return apiRequest({
        url: `/project-management/v1/project/impact-details/${projectId}`,
      });
    },
    fetchUNSDGs: (primaryCategoryId, secondaryCategory1Id, secondaryCategory2Id) => {
      return apiRequest({
        url: `/project-management/v1/project/unsdg`,
        params: {
          primaryCategoryId,
          secondaryCategory1Id,
          secondaryCategory2Id,
        },
      });
    },
    fetchKeyIndicators: (strategicGoalId) => {
      return apiRequest({
        url: `/project-management/v1/project/impacts/key-indicators?strategicGoalId=${strategicGoalId}`,
      });
    },

    deleteImpactCategory: (categoryRefId) => {
      return apiRequest({
        method: "DELETE",
        url: `/project-management/v1/project/impact-category/${categoryRefId}`,
      });
    },
    changeImpactCategory: (projectId, formData) => {
      return apiRequest({
        method: "PUT",
        url: `/project-management/v1/project/${projectId}/category`,
        data: formData,
      });
    },

    deleteImpactPriority: (impactPriorityRefId) => {
      return apiRequest({
        method: "DELETE",
        url: `/project-management/v1/project/impact-priorities/${impactPriorityRefId}`,
      });
    },
    changeImpactPriority: (projectId, categoryRefId, formData) => {
      return apiRequest({
        method: "PUT",
        url: `/project-management/v1/project/${projectId}/impact-category/${categoryRefId}/priority`,
        data: formData,
      });
    },
    deletePriorityGoal: (goalRefId) => {
      return apiRequest({
        method: "DELETE",
        url: `/project-management/v1/project/strategic-goals/${goalRefId}`,
      });
    },
    changeImpactPriorityGolas: (projectId, categoryId, priorityId, formData) => {
      return apiRequest({
        method: "PUT",
        url: `/project-management/v1/project/${projectId}/impact-category/${categoryId}/impact-priority/${priorityId}/strategic-goals`,
        data: formData,
      });
    },
  };
};

export default ProgramcreationAPI;
