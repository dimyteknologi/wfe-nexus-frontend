import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";
import { ILivestockResData } from "@/lib/types/response";

export const livestockApi = createApi({
  reducerPath: "livestockService",
  baseQuery: baseQueryApi,
  tagTypes: ["livestockService"],
  endpoints: (builder) => ({
    getLiveStocks: builder.query<ILivestockResData, void>({
      query: () => ({
        url: "/get-peternakan",
        method: "GET",
      }),
      providesTags: ["livestockService"],
    }),
  }),
});

export const { useGetLiveStocksQuery } = livestockApi;
