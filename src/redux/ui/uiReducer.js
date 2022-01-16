import { UI } from "../action-constants";
const initialState = {
  showLoader: false,
  beneficiarySteps: [],
  showSidebar: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case UI.SHOW_LOADER:
      return {
        ...state,
        showLoader: true,
      };
    case UI.HIDE_LOADER:
      return {
        ...state,
        showLoader: false,
      };
    case UI.SET_BENEFICIARY_STEPS:
      return {
        ...state,
        beneficiarySteps: action.payload,
      };
    case UI.SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: true,
      };
    case UI.HIDE_SIDEBAR:
      return {
        ...state,
        showSidebar: false,
      };
    default:
      return state;
  }
}
