import { createSlice } from "@reduxjs/toolkit";
import { ActionsEnum } from "../../enum";
import { login, logout, refresh } from "./auth.action";

interface IInitState {
  isAuth: boolean;
  error: unknown;
  status: ActionsEnum;
}

const initialState: IInitState = {
  isAuth: false,
  error: null,
  status: ActionsEnum.IDLE,
};

const authReducer = createSlice({
  name: "auth",
  reducers: {
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = ActionsEnum.LOADING;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = ActionsEnum.SUCCESS;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, response: any) => {
        state.status = ActionsEnum.ERROR;
        state.error = response.payload.message;
        console.log(response.payload.message);
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(refresh.pending, (state) => {
        state.status = ActionsEnum.LOADING;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.status = ActionsEnum.SUCCESS;
        state.isAuth = true;
      })
      .addCase(refresh.rejected, (state, { payload }) => {
        state.status = ActionsEnum.ERROR;
        // state.isAuth = false;
      });
  },
});

export const { setStatus } = authReducer.actions;

export default authReducer.reducer;
