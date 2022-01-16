import apirequest from "../utils/api-utils/api-request";

const validatorAPI = () => {
  return {
    fetchDashboardOrganisationCounts: async () => {
      return apirequest({
        url: "/social-org/v1/validator/status/count",
      });
    },
    fetchOrganisationList: async (pageNumber) => {
      return apirequest({
        url: `/social-org/v1/validator/organisations?pageNumber=${pageNumber - 1}`,
      });
    },
    startReview: async (formData) => {
      return apirequest({
        method: "POST",
        data: formData,
        url: "/social-org/v1/validator/start/review",
      });
    },
    reviewSection: async (section, organisationId, formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: `/social-org/v1/validator/organisation/${organisationId}/${section}/`,
      });
    },
    fetchSectionwiseStatus: async (organisationId) => {
      return apirequest({
        url: `/social-org/v1/validator/organisation/${organisationId}/review`,
      });
    },
    finalApproval: async (organisationId, formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: `/social-org/v1/validator/organisation/${organisationId}/`,
      });
    },
    fetchOrganisationApprovalStatus: async (organisationId) => {
      return apirequest({
        url: `/social-org/v1/validator/organisation/${organisationId}/status`,
      });
    },
    profileRegistration: async (id, formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: `/social-org/v1/validator/${id}`,
      });
    },
    registrationDocs: async (id, formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: `/social-org/v1/validator/${id}/documents`,
      });
    },

    /*  Program Proposal APIs*/
    fetchDashboardProjectCounts: async () => {
      return apirequest({
        url: "/project-management/v1/validator/status/count",
      });
    },
    fetchProgramList: async (pageNumber) => {
      return apirequest({
        url: `project-management/v1/validator/projects?pageNumber=${pageNumber - 1}`,
      });
    },
    startProjectReview: async (formData) => {
      return apirequest({
        method: "POST",
        data: formData,
        url: "/project-management/v1/validator/start/review",
      });
    },

    reviewProjectSection: async (section, projectId, formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: `/project-management/v1/validator/project/${projectId}/${section}/`,
      });
    },
    fetchProjectSectionwiseStatus: async (projectId) => {
      return apirequest({
        url: `/project-management/v1/validator/project/${projectId}/review`,
      });
    },
    finalProjectApproval: async (projectId, formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: `/project-management/v1/validator/project/${projectId}/`,
      });
    },
    fetchProjectApprovalStatus: async (projectId) => {
      return apirequest({
        url: `/project-management/v1/validator/project/${projectId}/status`,
      });
    },
  };
};

export default validatorAPI;
