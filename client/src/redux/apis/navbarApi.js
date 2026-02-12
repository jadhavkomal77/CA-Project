import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const navbarApi = createApi({
  reducerPath: "navbarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/adminnavbar"
      : "/api/adminnavbar",
    credentials: "include",
  }),
  tagTypes: ["Navbar"],

  endpoints: (builder) => ({
    /* 🌍 Public Navbar */
    getPublicNavbar: builder.query({
      query: () => "/public",
      providesTags: ["Navbar"],
    }),

    /* 🔐 Admin Navbar */
    getAdminNavbar: builder.query({
      query: () => "/",
      providesTags: ["Navbar"],
    }),

    /* 💾 Save / Update Navbar */
    saveNavbar: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "PUT",
        body: formData, // ⚠️ FormData only
      }),
      invalidatesTags: ["Navbar"],
    }),
  }),
});

export const {
  useGetPublicNavbarQuery,
  useGetAdminNavbarQuery,
  useSaveNavbarMutation,
} = navbarApi;
