
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taxUpdateApi = createApi({
  reducerPath: 'taxUpdateApi',
  baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/tax-updates"
      : "/api/tax-updates",
    credentials: "include",
  }),
 
  tagTypes: ['TaxUpdate'],
  endpoints: (builder) => ({
    getAllTaxUpdates: builder.query({
      query: ({ page = 1, limit = 10, category, search, sortBy, sortOrder, importantOnly }) => ({
        url: '/',
        params: { page, limit, category, search, sortBy, sortOrder, importantOnly },
      }),
      providesTags: ['TaxUpdate'],
    }),
    getTaxUpdate: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'TaxUpdate', id }],
    }),
    getCategoryStats: builder.query({
      query: () => '/stats/categories',
    }),
    createTaxUpdate: builder.mutation({
      query: (formData) => ({
        url: '/admin/create',
        method: 'POST',
        body: formData,
        credentials: 'include', // Admin cookie साठी
      }),
      invalidatesTags: ['TaxUpdate'],
    }),
    updateTaxUpdate: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/${id}`,
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'TaxUpdate', id }],
    }),
    deleteTaxUpdate: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['TaxUpdate'],
    }),
  }),
});

export const {
  useGetAllTaxUpdatesQuery,
  useGetTaxUpdateQuery,
  useGetCategoryStatsQuery,
  useCreateTaxUpdateMutation,
  useUpdateTaxUpdateMutation,
  useDeleteTaxUpdateMutation,
} = taxUpdateApi;