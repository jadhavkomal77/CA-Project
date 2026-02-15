import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const calculatorApi = createApi({
  reducerPath: "calculatorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/calculators"
      : "/api/calculators",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    calculateIncomeTax: builder.mutation({
      query: (data) => ({
        url: "/income-tax",
        method: "POST",
        body: data,
      }),
    }),
    calculateGST: builder.mutation({
      query: (data) => ({
        url: "/gst",
        method: "POST",
        body: data,
      }),
    }),
    calculateEMI: builder.mutation({
      query: (data) => ({
        url: "/emi",
        method: "POST",
        body: data,
      }),
    }),
    calculateSIP: builder.mutation({
      query: (data) => ({
        url: "/sip",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCalculateIncomeTaxMutation,
  useCalculateGSTMutation,
  useCalculateEMIMutation,
  useCalculateSIPMutation,
} = calculatorApi;