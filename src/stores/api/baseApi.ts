import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRootState } from "..";
import { Type } from "lucide-react";

export const baseQueryApi = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  // baseUrl: 'http://103.63.24.47:4000',
  prepareHeaders: (headers, { getState }) => {
    // const state = (getState() as IRootState);
    // headers: {
    //   Authorization: `Bearer ${state.auth}`;
    // }
    // headers.set('Content-Type', 'application/json');
    return headers;
  },
});
