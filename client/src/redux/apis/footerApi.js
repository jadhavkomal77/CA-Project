
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const footerApi = createApi({
  reducerPath: "footerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/footer"
      : "http://localhost:5000/api/footer",
    credentials: "include",
  }),
  tagTypes: ["Footer"],

  endpoints: (builder) => ({
    /* 🌍 Public */
    getPublicFooter: builder.query({
      query: () => "/public",
      providesTags: ["Footer"],
    }),

    /* 🔐 Admin */
    getAdminFooter: builder.query({
      query: () => "/",
      providesTags: ["Footer"],
    }),

    saveFooter: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Footer"],
    }),
  }),
});

export const {
  useGetPublicFooterQuery,
  useGetAdminFooterQuery,
  useSaveFooterMutation,
} = footerApi;
