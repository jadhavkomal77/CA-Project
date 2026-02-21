import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testimonialApi = createApi({
  reducerPath: "testimonialApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/testimonials"
      : "/api/testimonials",
    credentials: "include",
  }),

  tagTypes: ["Testimonials"],

  endpoints: (builder) => ({

    /* GET */
   getTestimonials: builder.query({
  query: () => "/public",
  providesTags: ["Testimonials"],
}),

    /* CREATE */
    addTestimonial: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Testimonials"],
    }),

    /* UPDATE */
    updateTestimonial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Testimonials"],
    }),

    /* DELETE */
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonials"],
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialApi;