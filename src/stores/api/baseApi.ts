import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRootState } from "..";

export const baseQueryApi = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers, _) => {
    // const state = (getState() as IRootState).state;
    // headers:{
    //   Authorization: `Bearer ${auth.token}`
    // }
    return headers;
  },
});
