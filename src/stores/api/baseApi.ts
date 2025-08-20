import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryApi = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers, _) => {
    // const state = (getState() as IRootState);
    return headers;
  },
});
