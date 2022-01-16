import { PROGRAM_CREATION } from "../action-constants";
const initialState = {
  impactCategories: [],
  impactPriorities: [],
  starategicGoals: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case PROGRAM_CREATION.SET_IMPACT_CATEGORIES:
      return {
        ...state,
        impactCategories: action.payload,
      };
    case PROGRAM_CREATION.SET_IMPACT_PRIORITIES:
      return {
        ...state,
        impactPriorities: action.payload,
      };
    case PROGRAM_CREATION.SET_STRATEGIC_GOALS:
      return {
        ...state,
        starategicGoals: action.payload,
      };
    default:
      return state;
  }
}
