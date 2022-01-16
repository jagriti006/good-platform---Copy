import { notification } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import authenticationAPI from "../../api/authenticationAPI";
import api from "./api";
import { store } from "../../redux/store";
import { loaderActions } from "../../redux/ui/uiActions";
import { AUTH_TOKEN } from "../../api/config";

const { dispatch } = store;

export const onRequest = (config) => {
  dispatch(loaderActions.showLoader());
  const token = sessionStorage.getItem("access_token");
  if (config.url.indexOf("login") < 0 && token != null)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
};
export const onRequestError = (error) => {
  dispatch(loaderActions.hideLoader());
  if (error.response === undefined) {
    notification.error({
      message: "Network Error, Please check your internet connection",
    });
  }
  return error;
};

export const onResponse = (response) => {
  dispatch(loaderActions.hideLoader());
  return response.data ? response.data : response;
};
export const onResponseError = (error) => {
  dispatch(loaderActions.hideLoader());
  console.log("error.response", error.response);
  if (error.response === undefined) {
    notification.error({ message: "Service unavialable..!" });
  } else if (error.response.status === 401) {
    //prevent interceptoor from looping api calls
    axios.interceptors.response.eject(api.interceptors);
    if (error.response.config.url.indexOf("login") < 0) refreshToken();
  } else if (error.response.status === 404) {
    notification.error({ message: "404 - Requested resource not found" });
  } else if (error.response.status === 500) {
    notification.error({ message: "Internal Server error..!" });
  } else {
    const errorMessage = error?.response?.data?.message
      ? error.response.data.message
      : "Something went wrong..!";
    notification.error({ message: errorMessage });
  }
  return error;
};

const refreshToken = async () => {
  const response = await authenticationAPI().refreshToken();
  if (response && response.data) {
    sessionStorage.setItem("access_token", response.data.access_token);
    sessionStorage.setItem("refresh_token", response.data.refresh_token);
    window.location.reload();
  } else {
    notification.error({ message: "Unauthorized/Session timeout" });
    window.location.replace("/");
  }
};
