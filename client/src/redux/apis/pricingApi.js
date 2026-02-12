import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pricingApi = createApi({
  reducerPath: "pricingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/pricing"
      : "/api/pricing",
    credentials: "include",
  }),
  tagTypes: ["Pricing"],

  endpoints: (builder) => ({
    /* 🌍 PUBLIC */
    getPublicPricing: builder.query({
      query: () => "/public",
      providesTags: ["Pricing"],
    }),

    /* 🔐 ADMIN */
    getAdminPricing: builder.query({
      query: () => "/",
      providesTags: ["Pricing"],
    }),

    createPricing: builder.mutation({
      query: (data) => ({ url: "/", method: "POST", body: data }),
      invalidatesTags: ["Pricing"],
    }),

    updatePricing: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Pricing"],
    }),

    deletePricing: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Pricing"],
    }),

    reorderPricing: builder.mutation({
      query: (list) => ({
        url: "/reorder/all",
        method: "PUT",
        body: { list },
      }),
      invalidatesTags: ["Pricing"],
    }),
  }),
});

export const {
  useGetPublicPricingQuery,
  useGetAdminPricingQuery,
  useCreatePricingMutation,
  useUpdatePricingMutation,
  useDeletePricingMutation,
  useReorderPricingMutation,
} = pricingApi;
