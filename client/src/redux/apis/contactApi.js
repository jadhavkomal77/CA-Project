import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/contact"
      : "http://localhost:5000/api/contact",
    credentials: "include",
  }),

  tagTypes: ["Contact"],

  endpoints: (builder) => ({
    /* 🌍 Public - Contact Form */
    createContact: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    /* 🔐 Admin - Get All */
    getAllContacts: builder.query({
      query: () => "/all",
      providesTags: ["Contact"],
    }),

    /* 🔐 Admin - Delete */
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
  useDeleteContactMutation,
} = contactApi;
