import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRootState } from "..";

export const baseQueryApi = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as IRootState;
    headers.set("Authorization", `Bearer ${state.auth?.user?.access_token || ""}`);

    // Bypass ngrok browser warning on free tier
    headers.set("ngrok-skip-browser-warning", "true");

    return headers;
  },
});
