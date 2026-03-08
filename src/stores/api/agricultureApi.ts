import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";
import { IAgricultureResponse } from "@/lib/types/response";
// import {IAgricultureResData} from "@/lib/types/data";

export const agricultureApi = createApi({
  reducerPath: "agricultureService",
  baseQuery: baseQueryApi,
  tagTypes: ["agricultureService"],
  endpoints: (builder) => ({
    // getAgricultures: builder.query<IAgricultureResData, void>({
    getAgricultures: builder.query<IAgricultureResponse, void>({
      query: () => ({
        url: "/base-data/get-pertanian",
        // url: "/get-pertanian",
        method: "GET",
      }),
      providesTags: ["agricultureService"],
    }),
  }),
});

export const { useGetAgriculturesQuery } = agricultureApi;
