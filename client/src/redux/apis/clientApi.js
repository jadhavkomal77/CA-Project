import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
  reducerPath: "clientApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/clients"
      : "/api/clients",
    credentials: "include",
  }),

  tagTypes: ["Clients"],

  endpoints: (builder) => ({
    /* 🌍 PUBLIC */
    getPublicClients: builder.query({
      query: () => "/public",
      providesTags: ["Clients"],
    }),

    /* 🔐 ADMIN */
    getAdminClients: builder.query({
      query: () => "/",
      providesTags: ["Clients"],
    }),

    addClient: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Clients"],
    }),

    updateClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),

    reorderClients: builder.mutation({
      query: (list) => ({
        url: "/reorder/all",
        method: "PUT",
        body: { list },
      }),
      invalidatesTags: ["Clients"],
    }),

    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetPublicClientsQuery,
  useGetAdminClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useReorderClientsMutation,
  useDeleteClientMutation,
} = clientApi;
