import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstances = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstances.interceptors.request.use(
  (config) => {
    const accesToken = localStorage.getItem("token");
    if (accesToken) {
      config.headers.Authorization = `bearer ${accesToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstances;
