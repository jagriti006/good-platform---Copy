import { PERSISTED_ACTION_TYPES } from "../action-constants";

export const saveIDProofData = (payload) => ({
  type : PERSISTED_ACTION_TYPES.SAVE_ID_PROOF_DATA,
  payload : payload
});

export const clearPersistedReducerStateValue = (stateKey) => ({
  type : PERSISTED_ACTION_TYPES.CLEAR_PERSISTED_REDUCER_STATE_VALUE,
  payload : stateKey
});

export const saveKYCStatus = (payload) => ({
  type : PERSISTED_ACTION_TYPES.SVAE_KYC_STATUS,
  payload : payload
});

export const saveVaccinationDetails = (payload) =>({
  type : PERSISTED_ACTION_TYPES.SAVE_VACCINATION_DETAILS,
  payload : payload
})


export const saveProgramSettings = (payload) =>({
  type : PERSISTED_ACTION_TYPES.SAVE_PROGRAM_SETTINGS,
  payload : payload
})