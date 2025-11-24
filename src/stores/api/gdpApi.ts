import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";
import { IGDPResData } from "@/lib/types/response";

export const gdpApi = createApi({
  reducerPath: "gdpService",
  baseQuery: baseQueryApi,
  tagTypes: ["gdpService"],
  endpoints: (builder) => ({
    getGdps: builder.query<IGDPResData, void>({
      query: () => ({
        url: "/dummy/get-gdp",
        method: "GET",
      }),
      providesTags: ["gdpService"],
    }),
  }),
});

export const { useGetGdpsQuery } = gdpApi;
