import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/applications"
      : "/api/applications",
    credentials: "include",
  }),
  tagTypes: ["Applications"],
  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Application"],
    }),
    getAllApplications: builder.query({
      query: (params) => ({
        url: "/admin",
        params,
      }),
      providesTags: ["Application"],
    }),
    getApplicationById: builder.query({
      query: (id) => `/admin/${id}`,
      providesTags: ["Application"],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ id, status, adminNotes }) => ({
        url: `/admin/${id}/status`,
        method: "PUT",
        body: { status, adminNotes },
      }),
      invalidatesTags: ["Application"],
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} = applicationApi;