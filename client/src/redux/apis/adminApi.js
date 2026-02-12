import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAdmin, clearAdmin } from "../slices/adminSlice";

export const adminApi = createApi({
  reducerPath: "adminApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/admin"
      : "/api/admin",
    credentials: "include", // 🔥 cookie only
  }),

  tagTypes: ["Admin"],

  endpoints: (builder) => ({
    /* ========== AUTH ========== */

    adminRegister: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(clearAdmin());
      },
    }),

    /* ========== PROFILE ========== */

    adminProfile: builder.query({
      query: () => "/profile",

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAdmin(data.admin));
        } catch (err) {
          dispatch(clearAdmin());
        }
      },

      providesTags: ["Admin"],
    }),

    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "PUT",
        body: data,
      }),
    }),
    adminStats: builder.query({
  query: () => "/stats",
  providesTags: ["Admin"],
}),

  }),
});

export const {
  useAdminRegisterMutation,
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAdminProfileQuery,useAdminStatsQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
} = adminApi;
