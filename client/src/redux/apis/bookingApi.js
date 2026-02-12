import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/booking"
      : "/api/booking",
    credentials: "include",
  }),
  tagTypes: ["Booking"],

  endpoints: (builder) => ({
    // ➕ CREATE BOOKING (public)
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),

    // 🔐 ADMIN: GET ALL
    getAdminBookings: builder.query({
      query: () => "/",
      providesTags: ["Booking"],
    }),

    // 🔐 UPDATE STATUS
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Booking"],
    }),

    // 🔐 DELETE
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAdminBookingsQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} = bookingApi;
