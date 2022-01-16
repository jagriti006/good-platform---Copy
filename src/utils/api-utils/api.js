import axios from "axios";
import { AUTH_TOKEN, BASE_URL } from "../../api/config";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "./api-interceptors";

const API = () => {
  const defaultOptions = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const instance = axios.create(defaultOptions);
  instance.interceptors.request.use(
    (config) => onRequest(config),
    (error) => onRequestError(error)
  );
  instance.interceptors.response.use(
    (config) => onResponse(config),
    (error) => onResponseError(error)
  );
  return instance;
};
export default API();
