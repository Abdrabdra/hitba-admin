import {
  ICreateArea,
  ICreateCity,
  ICreateManagementBody,
  IGetCityResponse,
  IManagementResponse,
} from "./city.type";
import cityApi from "./cityApi";

export const cityEndpoints = cityApi.injectEndpoints({
  endpoints: (builder) => ({
    getArea: builder.query<IGetCityResponse[], any>({
      query: () => ({
        url: `region/area`,
        method: "GET",
      }),
      providesTags: ["city"],
    }),
    getCity: builder.query<IGetCityResponse[], any>({
      query: (arg) => ({
        url: `region/city/${arg}`,
        method: "GET",
      }),
      providesTags: ["city"],
    }),

    createArea: builder.mutation<any, ICreateArea>({
      query: (data) => ({
        url: `region/area`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["city"],
    }),
    createCity: builder.mutation<any, ICreateCity>({
      query: (data) => ({
        url: `region`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["city"],
    }),

    deleteArea: builder.mutation<any, any>({
      query: (id) => ({
        url: `region/area/${id.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["city"],
    }),
    deleteCity: builder.mutation<any, any>({
      query: (id) => ({
        url: `region/city/${id.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["city"],
    }),
  }),
});

export const {
  useGetAreaQuery,
  useGetCityQuery,

  useCreateAreaMutation,
  useCreateCityMutation,

  useDeleteAreaMutation,
  useDeleteCityMutation,
} = cityEndpoints;
