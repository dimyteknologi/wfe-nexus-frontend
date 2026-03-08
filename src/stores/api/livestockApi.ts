import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";
import { ILivestockResponse } from "@/lib/types/response";

export const livestockApi = createApi({
  reducerPath: "livestockService",
  baseQuery: baseQueryApi,
  tagTypes: ["livestockService"],
  endpoints: (builder) => ({
    getLiveStocks: builder.query<ILivestockResponse, void>({
      query: () => ({
        url: "/base-data/get-peternakan",
        // url: "/get-peternakan",
        method: "GET",
      }),
      providesTags: ["livestockService"],
    }),
  }),
});

export const { useGetLiveStocksQuery } = livestockApi;
