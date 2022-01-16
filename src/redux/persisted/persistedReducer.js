import { PERSISTED_ACTION_TYPES } from "../action-constants";

const INITIAL_STATE = {
  idProofDetails: null,
  kycStatus: "",
  vaccinationDetails: "",
  programSettings: "",
};
const persistedReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PERSISTED_ACTION_TYPES.SAVE_ID_PROOF_DATA:
      return {
        ...state,
        idProofDetails: payload,
      };

    case PERSISTED_ACTION_TYPES.CLEAR_PERSISTED_REDUCER_STATE_VALUE:
      return {
        ...state,
        [payload]: null,
      };

    case PERSISTED_ACTION_TYPES.SVAE_KYC_STATUS:
      return {
        ...state,
        kycStatus: payload,
      };
    case PERSISTED_ACTION_TYPES.SAVE_VACCINATION_DETAILS:
      return {
        ...state,
        vaccinationDetails: payload,
      };
    case PERSISTED_ACTION_TYPES.SAVE_PROGRAM_SETTINGS:
      return {
        ...state,
        programSettings: payload,
      };
    default:
      return state;
  }
};

export default persistedReducer;
