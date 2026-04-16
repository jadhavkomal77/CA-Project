import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
  reducerPath: "serviceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/adminservice"
      : "/api/adminservice",
    credentials: "include",
  }),

  tagTypes: ["Service"],

  endpoints: (builder) => ({

    /* 🌍 Public */
    getPublicServices: builder.query({
      query: () => "/",               // ✅ list services
      providesTags: ["Service"],
      keepUnusedDataFor: 300,
    }),

    getPublicServiceBySlug: builder.query({
      query: (slug) => `/public/${slug}`, // ✅ single service
    }),

    /* 🔐 Admin */
    getAdminServices: builder.query({
      query: () => "/admin",
      providesTags: ["Service"],
    }),

    addService: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),

  }),
});

export const {
  useGetPublicServicesQuery,
  useGetPublicServiceBySlugQuery,
  useGetAdminServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
