import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import uiReducer from "./ui/uiReducer";
import persistedReducer from "./persisted/persistedReducer";
import userReducer from "./user/userReducer";
import programReducer from "./program-creation/programReducer";

/* 
 encrypting redux store for security concerns 
*/
const encryptor = encryptTransform({
  secretKey: "SOME_SECRET_KEY",
});

/* 
Redux persist configuration
*/
const persistConfig = {
  key: "root",
  storage: storageSession,
  // only these reducers will be persisted,
  whitelist: ["persisted", "ui", "user", "program"],
  transforms: [encryptor],
};

/* 
		persistedReducer :: manually refreshing the page wont clear data stored in these reducers
*/
const appReducer = combineReducers({
  persisted: persistedReducer,
  ui: uiReducer,
  user: userReducer,
  program: programReducer,
});

/* 
	when a DESTROY_SESSION action is dispatched it will reset redux state
*/
const rootReducer = (state, action) => {
  if (action.type === "DESTROY_SESSION") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
