import axios from "axios";
import { BASE_URL } from "./config";

const authenticationAPI = () => {
  return {
    refreshToken: async () => {
      const refreshToken = sessionStorage.getItem("refresh_token");
      try {
        // Using core axios instead of interceptor
        // for avoiding looped api calls
        const response = await axios.post(
          `${BASE_URL}/auth/v1/auth/refresh-token`,
          {
            refreshToken: refreshToken,
          }
        );
        console.log("response", response);
        return response;
      } catch (exception) {
        console.log(exception);
        sessionStorage.clear();
        window.location.replace("/");
      }
    },
  };
};

export default authenticationAPI;
