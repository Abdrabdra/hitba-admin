import axios from "axios";
import { mainModule } from "process";
import { AuthService } from "../redux/service/auth/auth.service";

// export const DEV_API = "http://localhost:3001";
export const DEV_API = "http://146.190.53.201";

// export const PROD_API = "https://";

axios.defaults.withCredentials = true

const $api = axios.create({
  withCredentials: true,
  baseURL: DEV_API,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  }
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<string>(`${DEV_API}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("access_token", response.data);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);
// export default axios;
export default $api;
// export const $imageApi = "https://adu24file.ams3.digitaloceanspaces.com";
