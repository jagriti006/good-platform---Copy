import { getBeneficiaryUrl } from "./config";
import apirequest from "../utils/api-utils/api-request";

const beneficiaryAPI = () => {
  return {
    addorUpdateBeneficiaryBasic: async (formData) => {
      return apirequest({
        method: formData.id ? "PUT" : "POST",
        data: formData,
        url: "/beneficiary/v1/beneficiary",
      });
    },
    fetchBeneficiaryBasic: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },
    addBeneficiaryIncome: async (formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: "/beneficiary/v1/income",
      });
    },
    fetchBeneficiaryIncome: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },
    uplaodImageAndGetURL: async (file, onUploadProgress) => {
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
        onUploadProgress,
      });
    },
    addBeneficiaryOther: async (formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: "/beneficiary/v1/beneficiary/other-details",
      });
    },
    fetchBeneficiaryOther: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },
    addBeneficiaryAsset: async (formData) => {
      return apirequest({
        method: formData.id ? "PUT" : "POST",
        data: formData,
        url: "/beneficiary/v1/asset",
      });
    },
    fetchBeneficiaryAsset: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },
    addBeneficiaryAccess: async (formData) => {
      return apirequest({
        method: formData.id ? "PUT" : "POST",
        data: formData,
        url: "/beneficiary/v1/access",
      });
    },
    fetchBeneficiaryAccess: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },

    getAllLanguages: async () => {
      return apirequest({
        url: "/beneficiary/v1/languages",
      });
    },
    getAllOccupations: async () => {
      return apirequest({
        url: "/beneficiary/v1/occupations",
      });
    },
    getAllRelationships: async () => {
      return apirequest({
        url: "/beneficiary/v1/relationships",
      });
    },

    getAllMaritialStatus: async () => {
      return apirequest({
        url: "/beneficiary/v1/marital-status",
      });
    },

    getAllState: async () => {
      return apirequest({
        url: "/beneficiary/v1/beneficiary/states",
      });
    },

    getAllDistrictByState: async (state, pinCode) => {
      let url = `/beneficiary/v1/beneficiary/districts?state=${state}`;
      if (pinCode) url += `&pinCode=${pinCode}`;
      return apirequest({
        url,
      });
    },

    getAllCityByDistrictState: async (state, district) => {
      return apirequest({
        url: `/beneficiary/v1/location?state=${state}&district=${district}`,
      });
    },
    getPincodeByCityDistrictState: async (state, district, city) => {
      return apirequest({
        url: `/beneficiary/v1/pincode?state=${state}&district=${district}&location=${city}`,
      });
    },
    getCityDistrictStateByPincode: async (pincode) => {
      return apirequest({
        url: `/beneficiary/v1/fetch/district?pincode=${pincode}`,
      });
    },
    getAllTalukByDistrict: async (district, pinCode) => {
      let url = `/beneficiary/v1/beneficiary/taluk?&district=${district}`;
      if (pinCode) url += `&pinCode=${pinCode}`;
      return apirequest({
        url,
      });
    },
    getAllPanchaytsByTaluk: async (taluk) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/panchayat?taluk=${taluk}`,
      });
    },
    getVillageByPanchayt: async (panchayat) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/village?panchayat=${panchayat}`,
      });
    },
    getVillageByTaluk: async (panchayat) => {
      return apirequest({
        method: "GET",
        url: `/beneficiary/v1/beneficiary/village?taluk=${panchayat}`,
      });
    },

    getAllVillagetsByTaluk: async (taluk, pinCode) => {
      let url = `/beneficiary/v1/beneficiary/village?taluk=${taluk}`;
      if (pinCode) url += `&pinCode=${pinCode}`;
      return apirequest({
        url,
      });
    },

    // education starts
    getAllEducationStatus: async () => {
      return apirequest({
        url: "/beneficiary/v1/educational/status",
      });
    },
    fetchBeneficiaryEducation: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },
    saveBeneficiaryEducation: async (formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: "/beneficiary/v1/educational/details",
      });
    },
    // education ends

    // health starts
    fetchBeneficiaryHealth: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },
    saveBeneficiaryHealth: async (formData) => {
      return apirequest({
        method: formData.id ? "PUT" : "POST",
        data: formData,
        url: "/beneficiary/v1/health-details",
      });
    },
    // health ends

    // self declaration starts
    saveBeneficiarySelfDeclaration: async (formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: "/beneficiary/v1/beneficiary/agreements",
      });
    },
    fetchBeneficiaryAgreement: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },
    // self declaration ends

    // id proof verification starts
    panCardVerification: async (idProofNumber) => {
      return apirequest({
        method: "POST",
        data: {
          pan: idProofNumber,
        },
        url: "/kyc/v1/verify/pan",
      });
    },
    votersIDVerification: async (idProofNumber) => {
      return apirequest({
        method: "POST",
        data: {
          epic_no: idProofNumber,
          consent: "Y",
          consent_text: "VOTER VERIFICATION PURPOSE",
        },
        url: "/kyc/v1/verify/voter-id",
      });
    },
    drivingLicenseVerification: async (idProofNumber) => {
      return apirequest({
        method: "POST",
        data: {
          dl_no: idProofNumber,
          consent: "Y",
          consent_text: "DL VERIFICATION PURPOSE",
          dob: "dd-mm-yyyy",
        },
        url: "/kyc/v1/verify/dl",
      });
    },
    passportVerification: async (payload) => {
      return apirequest({
        method: "POST",
        data: payload,
        url: "/kyc/v1/verify/passport",
      });
    },
    // id proof verification starts

    // schedule appointment starts
    scheduleAppointment: async (formData, url, method = "POST") => {
      return apirequest({
        method: method,
        url: getBeneficiaryUrl(url),
        data: formData,
      });
    },
    updateVaccinationAppointment: async (formData, appointmentId) => {
      return apirequest({
        method: "PUT",
        url: getBeneficiaryUrl(`vaccination/appointments/${appointmentId}`),
        data: formData,
      });
    },
    getVaccinationCenters: async (projectId, filterString) => {
      console.log("filterString", filterString);
      return apirequest({
        url: `/beneficiary/v1/centers?projectId=${projectId}${filterString || ""}`,
      });
    },
    getVaccinationConcentDetails: async (beneficiaryId) => {
      return apirequest({
        url: getBeneficiaryUrl(`vaccination/consent?beneficiaryId=${beneficiaryId}`),
      });
    },
    getVaccinationAppointmentDetails: async (beneficiaryId, appointmentUrl) => {
      return apirequest({
        url: getBeneficiaryUrl(`${appointmentUrl}?beneficiaryId=${beneficiaryId}`),
      });
    },
    getBeneficiaryTimeSlots: async () => {
      return apirequest({
        url: getBeneficiaryUrl("time-slots"),
      });
    },
    fetchBeneficiaryDetails: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/${beneficiaryId}`,
      });
    },
    signVaccinationConcent: async (formData) => {
      return apirequest({
        method: "POST",
        url: getBeneficiaryUrl("vaccination/consent"),
        data: formData,
      });
    },
    // schedule appointment ends

    addCoWINBeneficiryId: async (formData) => {
      return apirequest({
        method: "PUT",
        data: formData,
        url: "beneficiary/v1/beneficiary/beneficiary-ref-id",
      });
    },

    listBeneficiaries: async (userId, pageNumber, projectId, pageSize, filter) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/agent?fieldAgentId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}&${filter}`,
      });
    },

    saveKYCdetails: async (formData) => {
      return apirequest({
        method: formData.id ? "PUT" : "POST",
        data: formData,
        url: `/kyc/v1/data`,
      });
    },
    fetchKYCdetails: async (beneficiaryId) => {
      return apirequest({
        url: `/kyc/v1/data?userReferenceId=${beneficiaryId}`,
      });
    },
    fetchRationTypes: async () => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/ration/type/`,
      });
    },
    deleteFile: async (fileUrl) => {
      let formData = new FormData();
      formData.set("filename", fileUrl);
      formData.set("fileCategory", "SOCIAL_ORGANISATION");

      return apirequest({
        method: "DELETE",
        data: formData,
        url: "/file-upload/v1/file",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    fetchVccines: async () => {
      return apirequest({
        url: `/beneficiary/v1/vaccines`,
      });
    },

    fetchVaccinationHistory: async (beneficiaryId) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/vaccination-history?beneficiaryId=${beneficiaryId}`,
      });
    },
    getServerTime: async () => {
      return apirequest({
        url: `/social-org/v1/timeStamp`,
      });
    },
    getBeneficiariesByVialNumber: async (vialNo) => {
      return apirequest({
        url: `/beneficiary/v1/vial/beneficiaries-vialNo?vialNo=${vialNo}`,
      });
    },
    getCountByVialNumber: async (vialNo) => {
      return apirequest({
        url: `/beneficiary/v1/vial/beneficiary-count/${vialNo}`,
      });
    },
    saveVialNumber: async (formData) => {
      return apirequest({
        method: "POST",
        url: `/beneficiary/v1/vial`,
        data: formData,
      });
    },
    fetchBeneficiariesByFormData: async (filter) => {
      return apirequest({
        url: `/beneficiary/v1/vial/beneficiaries-list?${filter}`,
      });
    },
    assignVialToBeneficiaryList: async (urlData) => {
      return apirequest({
        method:"POST",
        url: `/beneficiary/v1/vial/beneficiary-vial?${urlData}`,
      });
    },
    getAgentBeneficiaries: async (orgId, projectId, date) => {
      return apirequest({
        url: `/social-org/v1/user/agent/beneficiaries?organisationId=${orgId}&projectId=${projectId}&date=${date}`,
      });
    },
    getBeneficiariesByOrg: async (orgId, pageNumber, pageSize, filter) => {
      return apirequest({
        url: `/beneficiary/v1/beneficiary/organisation/${orgId}?pageNumber=${pageNumber}&pageSize=${pageSize}&${filter}`,
      });
    },
  };
};

export default beneficiaryAPI;
