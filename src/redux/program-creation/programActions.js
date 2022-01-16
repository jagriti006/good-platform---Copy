import { PROGRAM_CREATION } from "../action-constants";

export const setImpactCatgeories = (payload) => {
  return { type: PROGRAM_CREATION.SET_IMPACT_CATEGORIES, payload };
};

export const setFinalImpactPriorities = (payload) => {
  return { type: PROGRAM_CREATION.SET_IMPACT_PRIORITIES, payload };
};

export const setFinalStrategicGoals = (payload) => {
  return { type: PROGRAM_CREATION.SET_STRATEGIC_GOALS, payload };
};
