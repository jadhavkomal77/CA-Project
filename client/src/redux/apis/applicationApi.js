// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const applicationApi = createApi({
//   reducerPath: "applicationApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BACKEND_URL
//       ? import.meta.env.VITE_BACKEND_URL + "/api/applications"
//       : "/api/applications",

//     credentials: "include",

//     prepareHeaders: (headers) => {
//       headers.set("Accept", "application/json");
//       return headers;
//     },
//   }),

//   tagTypes: ["Applications"],

//   endpoints: (builder) => ({

//     /* =========================
//        CREATE APPLICATION
//     ========================= */
//     createApplication: builder.mutation({
//       query: (formData) => ({
//         url: "/",
//         method: "POST",
//         body: formData, // FormData auto header set
//       }),
//       invalidatesTags: ["Applications"],
//     }),

//     /* =========================
//        GET ALL
//     ========================= */
//     getAllApplications: builder.query({
//       query: (params) => ({
//         url: "/admin",
//         params,
//       }),
//       providesTags: ["Applications"],
//     }),

//     /* =========================
//        GET SINGLE
//     ========================= */
//     getApplicationById: builder.query({
//       query: (id) => ({
//         url: `/admin/${id}`,
//       }),
//       providesTags: ["Applications"],
//     }),

//     /* =========================
//        UPDATE STATUS
//     ========================= */
//     updateApplicationStatus: builder.mutation({
//       query: ({ id, status, adminNotes }) => ({
//         url: `/admin/${id}/status`,
//         method: "PUT",
//         body: { status, adminNotes },
//       }),
//       invalidatesTags: ["Applications"],
//     }),

//     /* =========================
//        DELETE
//     ========================= */
//     deleteApplication: builder.mutation({
//       query: (id) => ({
//         url: `/admin/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Applications"],
//     }),

//     /* =========================
//        DOWNLOAD PDF
//     ========================= */
//     downloadApplicationPDF: builder.mutation({
//       query: (id) => ({
//         url: `/admin/${id}/pdf`,
//         method: "GET",
//         responseHandler: (response) => response.blob(),
//       }),
//     }),
//   }),
// });


// export const {
//   useCreateApplicationMutation,
//   useGetAllApplicationsQuery,
//   useGetApplicationByIdQuery,
//   useUpdateApplicationStatusMutation,
//   useDeleteApplicationMutation,
//   useDownloadApplicationPDFMutation
// } = applicationApi;




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

    /* ================= CREATE ================= */
    createApplication: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Applications"],
    }),

    /* ================= GET ALL ================= */
    getAllApplications: builder.query({
      query: (params) => ({
        url: "/admin",
        params,
      }),
      providesTags: ["Applications"],
    }),

    /* ================= GET ONE ================= */
    getApplicationById: builder.query({
      query: (id) => `/admin/${id}`,
      providesTags: (r, e, id) => [{ type: "Applications", id }],
    }),

    /* ================= UPDATE STATUS ================= */
    updateApplicationStatus: builder.mutation({
      query: ({ id, status, adminNotes }) => ({
        url: `/admin/${id}/status`,
        method: "PUT",
        body: { status, adminNotes },
      }),
      invalidatesTags: (r, e, { id }) => [
        "Applications",
        { type: "Applications", id },
      ],
    }),

    /* ================= DELETE ================= */
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (r, e, id) => [
        "Applications",
        { type: "Applications", id },
      ],
    }),

    /* ================= GENERATE PDF ================= */
    generatePDF: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}/generate-pdf`,
        method: "POST",
      }),
      invalidatesTags: (r, e, id) => [
        "Applications",
        { type: "Applications", id },
      ],
    }),

  }),
});


export const {
  useCreateApplicationMutation,
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGeneratePDFMutation
} = applicationApi;