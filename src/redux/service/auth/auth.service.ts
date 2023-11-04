import { AxiosResponse } from "axios";
import axios from "axios";
import { ILogin } from "../../../types/IAuth";
import { ILoginResponse } from "../../../types/ILogin";
import $api, { DEV_API } from "../../../api";

export class AuthService {
  static async login(creds: ILogin): Promise<AxiosResponse<string>> {
    return $api.post<string>(`auth/login`, creds);
  }
  static async refresh(): Promise<AxiosResponse<string>> {
    return axios.get<string>(`${DEV_API}/auth/refresh`);
  }

  // static async login(creds: ILogin): Promise<AxiosResponse<string>> {
  //   return axios.post<string>(`${DEV_API}/auth/login`, creds, {
  //     // withCredentials: false,
  //   });
  // }
  // static async refresh(): Promise<AxiosResponse<ILoginResponse>> {
  //   return axios.get<ILoginResponse>(`${DEV_API}/auth/refresh`, {
  //     withCredentials: false,
  //   });
  // }

  //
  static async logout(): Promise<AxiosResponse<ILoginResponse>> {
    return axios.get(`${DEV_API}/auth/logout`, {withCredentials: false});
  }

  // static async logout(): Promise<AxiosResponse<ILoginResponse>> {
  //   return axios.get(`${DEV_API}/auth/logout`, { withCredentials: true });
  // }
}
