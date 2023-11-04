import { DEV_API } from './../../../../api/index';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../service/auth/auth.service";
import { ILogin, ILoginResponse } from "../../../../types/ILogin";
import Main from "../../../../pages/Main";
import axios from "axios";
import $api from "../../../../api";

export const login = createAsyncThunk(
  "auth/login",
  async function (creds: ILogin, { rejectWithValue }) {
    try {
      const response = await AuthService.login(creds);
      localStorage.setItem("access_token", response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const refresh = createAsyncThunk<any>(
  "auth/refresh",
  async function (_, { rejectWithValue }) {
    try {
      // const response = await AuthService.refresh();
      const response = await axios.get<ILoginResponse>(`${DEV_API}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("access_token", response.data.access_token);
      return response.data;
    } catch (e: any) {
      console.log("from aSyncTHunk: ", e);
      throw rejectWithValue("Не авторизован");
    }
  }
);

// @ts-ignore
export const checkAuth = createAsyncThunk<any>(
  "auth/refresh",
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.refresh();
      localStorage.setItem("access_token", response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk<any>(
  "auth/logout",
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("access_token");
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
