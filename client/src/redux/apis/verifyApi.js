import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const verifyApi = createApi({
  reducerPath: "verifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/verify"
      : "/api/verify",
  }),
  endpoints: (builder) => ({
    verifyApplication: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useVerifyApplicationQuery } = verifyApi;