import apiRequest from "../utils/api-utils/api-request";
import { COWIN_BASE_URL } from "./config";

const covinAPI = () => {
  return {
    createNewBeneficiary: async (formData) => {
      return apiRequest({
        method: "POST",
        url: `${COWIN_BASE_URL}/registration/beneficiary/new`,
        data: formData,
      });
    },
    confirmOTP: async (formData) => {
      return apiRequest({
        method: "POST",
        url: `${COWIN_BASE_URL}/confirmOTP`,
        data: formData,
      });
    },
    generateOTP: async (formData) => {
      return apiRequest({
        method: "POST",
        url: `${COWIN_BASE_URL}/generateOTP`,
        data: formData,
      });
    },
  };
};

export default covinAPI;