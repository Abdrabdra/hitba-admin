//library
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

//reducer
import complaint from "./../store/reducers/complaint/complaint.slice";
import user from "./../store/reducers/user/user.slice";
import staff from "./../store/reducers/staff/staff.slice";
import authReducer from "./reducers/auth/auth.slice";
import profile from "./reducers/profile/profile.slice";

//rtk
import homeApi from "./rtk-api/home-rtk/homeApi";
import staffApi from "./rtk-api/staff-rtk/staffApi";
import regionApi from "./rtk-api/region-rtk/regionApi";
import complaintApi from "./rtk-api/complaint-rtk/complaintApi";
import profileApi from "./rtk-api/profile-rtk/profileApi";
import userApi from "./rtk-api/user-rtk/userApi";
import hobbyApi from "./rtk-api/hobby-rtk/hobbyApi";
import cityApi from "./rtk-api/city-rtk/cityApi";
import hadithApi from "./rtk-api/hadis-rtk/hadithApi";

const rootReducer = combineReducers({
  auth: authReducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [regionApi.reducerPath]: regionApi.reducer,
  [complaintApi.reducerPath]: complaintApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [hobbyApi.reducerPath]: hobbyApi.reducer,
  [cityApi.reducerPath]: cityApi.reducer,
  [hadithApi.reducerPath]: hadithApi.reducer,
  complaint,
  staff,
  user,
  profile,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      homeApi.middleware,
      userApi.middleware,
      cityApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
