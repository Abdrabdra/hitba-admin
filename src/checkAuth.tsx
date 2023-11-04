import axios from "axios";
import { DEV_API } from "./api";
import { AuthService } from "./redux/service/auth/auth.service";

export const checkAuth = async () => {
  try {
    // const response = await AuthService.refresh()
    const response = await axios.get<string>(`${DEV_API}/auth/refresh`, {
      withCredentials: true,
    });
    console.log(response);
    localStorage.setItem("access_token", response.data);
  } catch (e: any) {
    console.log("response checkAuth: ", e.response?.data?.message);
  }
};
