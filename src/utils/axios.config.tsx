import axios from "axios";
import { getAuthorizationHeader } from "./functions";
import { API_BASE_URL } from "./constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getAuthorizationHeader();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
