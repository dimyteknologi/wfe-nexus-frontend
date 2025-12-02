import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryApi,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    logout: builder.mutation<void, { access_token: string }>({
      query: (payload) => ({
        url: "/auth/logout",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLogoutMutation } = authApi;
