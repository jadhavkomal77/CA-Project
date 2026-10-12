import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutTeamApi = createApi({
  reducerPath: "aboutTeamApi",

  baseQuery: fetchBaseQuery({
     baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/about-team"
      : "/api/about-team",
    credentials: "include", // 🔥 cookie only
  }),

  tagTypes: ["AboutTeam"],

  endpoints: (builder) => ({
    // Get all team members
    getAboutTeam: builder.query({
      query: () => "",
      providesTags: ["AboutTeam"],
    }),

    // Add a new team member
    addAboutTeam: builder.mutation({
      query: (newMember) => ({
        url: "",
        method: "POST",
        body: newMember,
      }),
      invalidatesTags: ["AboutTeam"],
    }),

    // Update an existing team member
    updateAboutTeam: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["AboutTeam"],
    }),

    // Delete a team member
    deleteAboutTeam: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AboutTeam"],
    }),
  }),
});

export const {
  useAddAboutTeamMutation,
  useGetAboutTeamQuery,
  useUpdateAboutTeamMutation,
  useDeleteAboutTeamMutation,
} = aboutTeamApi;