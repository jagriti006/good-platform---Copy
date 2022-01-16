import { PERSISTED_ACTION_TYPES, USER } from "../action-constants";

const INITIAL_STATE = {
  userDetails: {
    projectId: "",
    userRole: "",
    userId: "",
    organisationId: "",
  },
};
const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case USER.SAVE_USER_DATA:
      return {
        ...state,
        userDetails: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
