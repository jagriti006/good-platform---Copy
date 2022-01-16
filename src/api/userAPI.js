import apirequest from "../utils/api-utils/api-request";

const userAPI = () => {
  return {
    inviteUser: async (formData) => {
      return apirequest({
        data: formData,
        method: "POST",
        url: "/social-org/v1/user/invite-user",
      });
    },
    resendInviteLink: async (formData) => {
      return apirequest({
        data: formData,
        method: "POST",
        url: "/social-org/v1/user/resend/invite-user",
      });
    },
    getVolunteerList: async (orgId, projectId, pageNumber, pageSize, status) => {
      return apirequest({
        method: "GET",
        url: `/social-org/v1/user/invited?pageNumber=${pageNumber}&pageSize=${pageSize}&organisationId=${orgId}&inviteStatus=${status}`,
        //url: `/social-org/v1/user/invited?organisationId=${orgId}&projectId=${projectId}&pageSize=50`,
      });
    },
    getCenterList: async (orgId, projectId, pageNumber, pageSize, status) => {
      return apirequest({
        method: "GET",
        url: `/social-org/v1/user/invited?pageNumber=${pageNumber}&pageSize=${pageSize}&organisationId=${orgId}&inviteStatus=${status}`,
        //url: `/social-org/v1/user/invited?organisationId=${orgId}&projectId=${projectId}&pageSize=50`,
      });
    },
    getUserDetails: async () => {
      return apirequest({
        method: "GET",
        url: "/social-org/v1/user",
      });
    },
    getUserDetailById: async (userId) => {
      return apirequest({
        method: "GET",
        url: `/social-org/v1/user/get-user-details/${userId}`,
      });
    },
    getVolunteerDetail: async (userId,orgId) => {
      return apirequest({
        method: "GET",
        url: `/social-org/v1/user/volunteer?userId=${userId}&organisationId=${orgId}`,
      });
    },
    updateVoulunteerDetail: async( userId,data) => {
      return apirequest({
        url: `/social-org/v1/user/${userId}/update-volunteer`,
        method: "PUT",
        data,
      });
    },
    updateUserDetail: async (data) => {
      return apirequest({
        url: `/social-org/v1/user/update-user`,
        method: "PUT",
        data,
      });
    },
    updateDisableDetail: async (userIdpId) => {
      return apirequest({
        url: `/social-org/v1/user/disable-user?userIdpId=${userIdpId}`,
        method: "PUT",
      });
    },
    updateEnableDetail: async (userIdpId) => {
      return apirequest({
        url: `/social-org/v1/user/enable-user?userIdpId=${userIdpId}`,
        method: "PUT",
      });
    },
    doLogin: async (data) => {
      return apirequest({
        url: "/auth/v1/auth/login",
        method: "POST",
        data,
      });
    },
    forgetPassword: async (data) => {
      return apirequest({
        url: "/social-org/v1/auth/forgot-password",
        method: "POST",
        data,
      });
    },
    sendOtpToEmail: async (email) => {
      return apirequest({
        method: "GET",
        url: `/social-org/v1/email/send/otp?email=${email}`,
      });
    },
    emailOtpVerify: async (userCreatedId, data) => {
      let CheckValue = localStorage.getItem("passwordUpdate");
      if (CheckValue == "false") {
        return apirequest({
          url: `/social-org/v1/auth/${userCreatedId}/email-otp-verification`,
          method: "PUT",
          data,
        });
      } else {
        return apirequest({
          url: `/social-org/v1/auth/email-otp-verification`,
          method: "POST",
          data,
        });
      }
    },
    passwordCreate: async (data) => {
      return apirequest({
        url: `/social-org/v1/auth/password/update`,
        method: "POST",
        data,
      });
    },
    passwordUpdate: async (userId, data) => {
      return apirequest({
        url: `/social-org/v1/auth/${userId}/password`,
        method: "PUT",
        data,
      });
    },
    createUser: async (data) => {
      return apirequest({
        url: `/social-org/v1/user`,
        method: "POST",
        data,
      });
    },
    fetchRoles: async () => {
      return apirequest({
        url: "/social-org/v1/roles",
      });
    },
    getAgreementStatus: async (orgId) => {
      return apirequest({
        url: `/social-org/v1/organisation/${orgId}/signed-agreement`,
      });
    },
    getAllCenter: async(orgId, pageNumber, pageSize) => {
      return apirequest({
        url: `/beneficiary/v1/project-centers?orgId=${orgId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      });
    },
    addCenter: async(data) => {
      const newData = data.id ? data : [data];
      const newUrl = data.id ? `project-centers/${data.id}` : "vaccination/centers";

      return apirequest({
        url: `/beneficiary/v1/${newUrl}`,
        method: data.id ? "PUT" : "POST",
        data: newData,
      });
    },
    deleteCenter: async(deletableId) => {
      return apirequest({
        url: `/beneficiary/v1/project-centers/${deletableId}`,
        method: "DELETE",
      });
    },
    getAdminOrganisationData: async() => {
      return apirequest({
        url: '/social-org/v1/validator/organisations',
      });
    },
    getAdminProgramData: async() => {
      return apirequest({
        url: '/project-management/v1/validator/projects',
      });
    },
    getAdminBeneficiaryCountData: async() => {
      return apirequest({
        url: '/beneficiary/v1/beneficiary/beneficiaries-count',
      });
    },
    updateStatusById: async (userId) => {
      return apirequest({
        url: `/social-org/v1/user/${userId}/status`,
        method: "PUT",
      });
    },
  };
};

export default userAPI;
