import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";
import { IFisheriesResponse } from "@/lib/types/response";

export const fisheryApi = createApi({
  reducerPath: "fisheryService",
  baseQuery: baseQueryApi,
  tagTypes: ["fisheryService"],
  endpoints: (builder) => ({
    getFisheries: builder.query<IFisheriesResponse, void>({
      query: () => ({
        url: "/base-data/get-perikanan",
        // url: "/get-perikanan",
        method: "GET",
      }),
      providesTags: ["fisheryService"],
    }),
  }),
});

export const { useGetFisheriesQuery } = fisheryApi;
