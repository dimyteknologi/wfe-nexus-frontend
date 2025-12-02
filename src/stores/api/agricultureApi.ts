import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";
import { IAgricultureResData } from "@/lib/types/response";

export const agricultureApi = createApi({
  reducerPath: "agricultureService",
  baseQuery: baseQueryApi,
  tagTypes: ["agricultureService"],
  endpoints: (builder) => ({
    getAgricultures: builder.query<IAgricultureResData, void>({
      query: () => ({
        url: "/get-pertanian",
        method: "GET",
      }),
      providesTags: ["agricultureService"],
    }),
  }),
});

export const { useGetAgriculturesQuery } = agricultureApi;
