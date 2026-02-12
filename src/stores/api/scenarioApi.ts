import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "./baseApi";

export const scenarioApi = createApi({
    reducerPath: "scenarioApi",
    baseQuery: baseQueryApi,
    tagTypes: ["Scenario"],
    endpoints: (builder) => ({

        getScenarios: builder.query({
            query: () => ({
                method: "GET",
                url: "/scenario",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            providesTags: ["Scenario"],
        }),

        createScenario: builder.mutation({
            query: (payload) => ({
                headers: {
                    "Content-Type": "application/json",
                },
                url: "/scenario",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Scenario"],
        }),

        deleteScenario: builder.mutation({
            query: (id) => ({
                headers: {
                    "Content-Type": "application/json",
                },
                url: `/scenario/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Scenario"],
        }),

    }),
});

export const {
    useGetScenariosQuery,
    useCreateScenarioMutation,
    useDeleteScenarioMutation,
} = scenarioApi;
