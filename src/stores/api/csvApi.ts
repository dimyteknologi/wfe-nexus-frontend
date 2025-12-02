import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "@/stores/api/baseApi";

export const importApi = createApi({
  reducerPath: "importApi",
  baseQuery: baseQueryApi,
  endpoints: (builder) => ({

    validateFile: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
        return {
          url: "/import/validate",
          method: "POST",
          body: formData,
        };
      },
    }),

    importCsv: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/import/csv",
          method: "POST",
          body: formData,
        };
      },
    }),

  }),
});

export const {
  useValidateFileMutation,
  useImportCsvMutation,
} = importApi;
