import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";
import { IApiResponse } from "@/lib/types/response";

interface LoginResponse {
  access_token: string | null;
}
interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryApi,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation<void, { access_token: string }>({
      query: (payload) => ({
        url: "/auth/logout",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
