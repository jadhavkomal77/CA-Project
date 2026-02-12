// redux/api/heroApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heroApi = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/adminhero"
      : "/api/adminhero",
    credentials: "include",
  }),
  tagTypes: ["Hero"],

  endpoints: (builder) => ({
    /* 🌍 Public */
    getPublicHero: builder.query({
      query: () => "/public",
      providesTags: ["Hero"],
    }),

    /* 🔐 Admin */
    getAdminHero: builder.query({
      query: () => "/",
      providesTags: ["Hero"],
    }),

    saveHero: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
});

export const {
  useGetPublicHeroQuery,
  useGetAdminHeroQuery,
  useSaveHeroMutation,
} = heroApi;
