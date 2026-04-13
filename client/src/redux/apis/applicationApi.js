
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
  reducerPath: "applicationApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/applications"
      : "/api/applications",
    credentials: "include",
  }),

  tagTypes: ["Applications", "Analytics"],

  endpoints: (builder) => ({

    /* ================= USER ================= */

    createApplication: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Applications", id: "LIST" }],
    }),

    /* ================= ADMIN LIST ================= */

    getAllApplications: builder.query({
      query: (params) => ({
        url: "/admin",
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Applications", id: "LIST" },
              ...result.data.map((app) => ({
                type: "Applications",
                id: app._id,
              })),
            ]
          : [{ type: "Applications", id: "LIST" }],
    }),

    /* ================= SINGLE ================= */

    getApplicationById: builder.query({
      query: (id) => `/admin/${id}`,
      providesTags: (result, error, id) => [
        { type: "Applications", id },
      ],
    }),

    /* ================= STATUS UPDATE ================= */

    updateApplicationStatus: builder.mutation({
      query: ({ id, status, adminNotes }) => ({
        url: `/admin/${id}/status`,
        method: "PUT",
        body: { status, adminNotes },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Applications", id },
        { type: "Applications", id: "LIST" },
        { type: "Analytics" },
      ],
    }),

    /* ================= DELETE ================= */

    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Applications", id: "LIST" },
        { type: "Analytics" },
      ],
    }),

    /* ================= GENERATE PDF ================= */

    generatePDF: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}/generate-pdf`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Applications", id },
      ],
    }),

    /* ================= DOWNLOAD PDF ================= */

    downloadPDF: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}/download`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),

    /* ================= ANALYTICS ================= */

    getAnalytics: builder.query({
      query: () => "/admin/analytics",
      providesTags: [{ type: "Analytics" }],
    }),

  }),
});

export const {
  useCreateApplicationMutation,
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGeneratePDFMutation,
  useDownloadPDFMutation,
  useGetAnalyticsQuery,
} = applicationApi;