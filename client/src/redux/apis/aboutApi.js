// redux/apis/aboutApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/adminabout"
      : "/api/adminabout",
    credentials: "include",
  }),
  tagTypes: ["About"],

  endpoints: (builder) => ({
    getPublicAbout: builder.query({
      query: () => "/public",
      providesTags: ["About"],
    }),

    getAdminAbout: builder.query({
      query: () => "/",
      providesTags: ["About"],
    }),

    saveAbout: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const {
  useGetPublicAboutQuery,
  useGetAdminAboutQuery,
  useSaveAboutMutation,
} = aboutApi;
