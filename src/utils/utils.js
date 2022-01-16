import { useLocation } from "react-router-dom";
import {
  DRIVING_LICENSE_TYPE,
  PAN_CARD_TYPE,
  PASSPORT_TYPE,
  VOTERS_ID_CARD_TYPE,
} from "../components/beneficieryForm/BeneficiaryIDProof";
import appRoutes from "../constants/app-routes";
import { store } from "../redux/store";

/* 
	Utility to remove spaces and substitute it with character passed
*/
export const toLowercaseAndReplaceSpaces = (string, replaceSpaceWith = "") =>
  string != null && string.replace(/ /g, replaceSpaceWith).toLowerCase();

/* 
	Utility to append size when bytes is given
*/
export function bytesToSize(bytes, shouldRound = false, decimals = 1) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export const trasformToValueAndLabel = (arrayOfObjects, valueKey) => {
  return (
    Array.isArray(arrayOfObjects) &&
    arrayOfObjects.map((item) => {
      return { value: item.id, label: item[valueKey] };
    })
  );
};

export const getCovinNewBeneficiaryRequestBody = (formData) => {
  const requestBody = {
    name: formData.firsName + formData.middleName + formData.lastName,
    birth_year: formData.dob ? new Date(formData.dob).getFullYear() : new Date().getFullYear(),
    gender_id: 1,
    photo_id_type: 1,
    photo_id_number: "9999",
    comorbidity_ind: "Y",
    consent_version: "1",
  };
};

export const formErrorTextStyle = () => ({
  color: "red",
  fontSize: "12px",
  display: "block",
});

export const getKycStatusFromResponse = (idType, idNumber, response) => {
  if (idType === PAN_CARD_TYPE)
    return {
      idNumber,
      idType,
      userType: sessionStorage.userRole,
      transactionStatus: response.transaction_status,
      recordStatus: response.data[0].pan_status,
      responseCode: response.response_code,
      errorMessage: response.message,
    };
  if (idType === DRIVING_LICENSE_TYPE || idType === VOTERS_ID_CARD_TYPE || idType === PASSPORT_TYPE)
    return {
      idNumber,
      idType,
      userType: sessionStorage.userRole,
      transactionStatus: response.transaction_status,
      recordStatus: response.response_msg,
      responseCode: response.response_code,
      errorMessage: response.transaction_status === 1 ? "" : response.response_msg,
    };
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const getProjectId = (project) => {
  return sessionStorage.getItem("projectId");
};

export const getNextStepLink = () => {
  const beneficiarySteps = store.getState().ui.beneficiarySteps;
  if (beneficiarySteps) {
    const activeStep = beneficiarySteps.find((step) => window.location.pathname.includes(step.link));
    const nextStep = beneficiarySteps[beneficiarySteps.indexOf(activeStep) + 1];
    return nextStep ? nextStep.link : `${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_OVERVIEW}`;
  }
};

export const preventCopyPaste = (e) => {
  e.preventDefault();
  return false;
};
export const setStructureData = (data) => {
  return (
    (data &&
      data.map((stateData) => {
        return {
          value: stateData,
          label: stateData,
        };
      })) ||
    []
  );
};

export const removeEmptyOrNull = (obj) => {
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] && typeof obj[k] === "object" && removeEmptyOrNull(obj[k])) ||
      (!obj[k] && obj[k] !== undefined && delete obj[k])
  );
  return obj;
};

export const camelCased = (string) =>
  string &&
  string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });

// Finds the given string is a valid url o not

export const isUrl = (s) => {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(s);
};
