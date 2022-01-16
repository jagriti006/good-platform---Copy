import { UI } from "../action-constants";

export const loaderActions = {
  showLoader: () => {
    return { type: UI.SHOW_LOADER };
  },
  hideLoader: () => {
    return { type: UI.HIDE_LOADER };
  },
};

export const sidebarActions = {
  showSidebar: () => {
    return { type: UI.SHOW_SIDEBAR };
  },
  hideSidebar: () => {
    return { type: UI.HIDE_SIDEBAR };
  },
};

export const setBeneficiarySteps = (payload) => {
  return { type: UI.SET_BENEFICIARY_STEPS, payload };
};
