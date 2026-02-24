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

    /* =========================================================
       CREATE APPLICATION
    ========================================================= */
    createApplication: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Applications", id: "LIST" }],
    }),

    /* =========================================================
       GET ALL APPLICATIONS (ADMIN)
    ========================================================= */
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

    /* =========================================================
       GET SINGLE APPLICATION
    ========================================================= */
    getApplicationById: builder.query({
      query: (id) => `/admin/${id}`,
      providesTags: (result, error, id) => [
        { type: "Applications", id },
      ],
    }),

    /* =========================================================
       UPDATE STATUS
    ========================================================= */
    updateApplicationStatus: builder.mutation({
      query: ({ id, status, adminNotes }) => ({
        url: `/admin/${id}/status`,
        method: "PUT",
        body: { status, adminNotes },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Applications", id },
        { type: "Applications", id: "LIST" },
      ],
    }),

    /* =========================================================
       DELETE APPLICATION
    ========================================================= */
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Applications", id },
        { type: "Applications", id: "LIST" },
      ],
    }),

    /* =========================================================
       GENERATE PDF (Upload to Cloudinary)
    ========================================================= */
    generatePDF: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}/generate-pdf`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Applications", id },
      ],
    }),

    /* =========================================================
       DOWNLOAD / PREVIEW PDF
    ========================================================= */
    downloadPDF: builder.query({
      query: (id) => ({
        url: `/admin/${id}/download`,
        method: "GET",
      }),
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
  useDownloadPDFQuery,
} = applicationApi;



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const applicationApi = createApi({
//   reducerPath: "applicationApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BACKEND_URL
//       ? `${import.meta.env.VITE_BACKEND_URL}/api/applications`
//       : "/api/applications",
//     credentials: "include",
//   }),

//   tagTypes: ["Applications"],

//   endpoints: (builder) => ({

//     /* =========================================================
//        CREATE APPLICATION
//     ========================================================= */
//     createApplication: builder.mutation({
//       query: (formData) => ({
//         url: "/",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: [{ type: "Applications", id: "LIST" }],
//     }),

//     /* =========================================================
//        GET ALL APPLICATIONS (ADMIN)
//     ========================================================= */
//     getAllApplications: builder.query({
//       query: (params) => ({
//         url: "/admin",
//         params,
//       }),
//       providesTags: (result) =>
//         result?.data
//           ? [
//               { type: "Applications", id: "LIST" },
//               ...result.data.map((app) => ({
//                 type: "Applications",
//                 id: app._id,
//               })),
//             ]
//           : [{ type: "Applications", id: "LIST" }],
//     }),

//     /* =========================================================
//        GET SINGLE APPLICATION
//     ========================================================= */
//     getApplicationById: builder.query({
//       query: (id) => `/admin/${id}`,
//       providesTags: (result, error, id) => [
//         { type: "Applications", id },
//       ],
//     }),

//     /* =========================================================
//        UPDATE STATUS
//     ========================================================= */
//     updateApplicationStatus: builder.mutation({
//       query: ({ id, status, adminNotes }) => ({
//         url: `/admin/${id}/status`,
//         method: "PUT",
//         body: { status, adminNotes },
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         { type: "Applications", id },
//         { type: "Applications", id: "LIST" },
//       ],
//     }),

//     /* =========================================================
//        DELETE APPLICATION
//     ========================================================= */
//     deleteApplication: builder.mutation({
//       query: (id) => ({
//         url: `/admin/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, id) => [
//         { type: "Applications", id },
//         { type: "Applications", id: "LIST" },
//       ],
//     }),

//     /* =========================================================
//        GENERATE PDF
//     ========================================================= */
//     generatePDF: builder.mutation({
//       query: (id) => ({
//         url: `/admin/${id}/generate-pdf`,
//         method: "POST",
//       }),
//       invalidatesTags: (result, error, id) => [
//         { type: "Applications", id },
//       ],
//     }),

//     /* =========================================================
//        DOWNLOAD / PREVIEW PDF (Blob Support)
//     ========================================================= */
//     downloadPDF: builder.query({
//       query: (id) => ({
//         url: `/admin/${id}/download`,
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
//   useGeneratePDFMutation,
//   useDownloadPDFQuery,
// } = applicationApi;



// **********


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const applicationApi = createApi({
//   reducerPath: "applicationApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BACKEND_URL
//       ? import.meta.env.VITE_BACKEND_URL + "/api/applications"
//       : "/api/applications",
//     credentials: "include",
//   }),

//   tagTypes: ["Applications"],

//   endpoints: (builder) => ({

//     /* ================= CREATE ================= */
//     createApplication: builder.mutation({
//       query: (formData) => ({
//         url: "/",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["Applications"],
//     }),

//     /* ================= GET ALL ================= */
//     getAllApplications: builder.query({
//       query: (params) => ({
//         url: "/admin",
//         params,
//       }),
//       providesTags: ["Applications"],
//     }),

//     /* ================= GET ONE ================= */
//     getApplicationById: builder.query({
//       query: (id) => `/admin/${id}`,
//       providesTags: (r, e, id) => [{ type: "Applications", id }],
//     }),

//     /* ================= UPDATE STATUS ================= */
//     updateApplicationStatus: builder.mutation({
//       query: ({ id, status, adminNotes }) => ({
//         url: `/admin/${id}/status`,
//         method: "PUT",
//         body: { status, adminNotes },
//       }),
//       invalidatesTags: (r, e, { id }) => [
//         "Applications",
//         { type: "Applications", id },
//       ],
//     }),

//     /* ================= DELETE ================= */
//     deleteApplication: builder.mutation({
//       query: (id) => ({
//         url: `/admin/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (r, e, id) => [
//         "Applications",
//         { type: "Applications", id },
//       ],
//     }),

//     /* ================= GENERATE PDF ================= */
//     generatePDF: builder.mutation({
//       query: (id) => ({
//         url: `/admin/${id}/generate-pdf`,
//         method: "POST",
//       }),
//       invalidatesTags: (r, e, id) => [
//         "Applications",
//         { type: "Applications", id },
//       ],
//     }),

//   }),
// });


// export const {
//   useCreateApplicationMutation,
//   useGetAllApplicationsQuery,
//   useGetApplicationByIdQuery,
//   useUpdateApplicationStatusMutation,
//   useDeleteApplicationMutation,
//   useGeneratePDFMutation
// } = applicationApi;