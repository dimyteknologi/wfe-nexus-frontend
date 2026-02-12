import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";
import { IPopResData } from "@/lib/types/response";

export const populationApi = createApi({
  reducerPath: "populationService",
  baseQuery: baseQueryApi,
  tagTypes: ["populationService"],
  endpoints: (builder) => ({
    getPopulations: builder.query<IPopResData, void>({
      query: () => ({
        url: "/base-data/get-population",
        method: "GET",
      }),
      providesTags: ["populationService"],
    }),
  }),
});

export const { useGetPopulationsQuery } = populationApi;
