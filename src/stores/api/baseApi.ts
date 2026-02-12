import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRootState } from "..";

export const baseQueryApi = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as IRootState;
    const token = state.auth?.accessToken || state.auth?.user?.access_token;
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
