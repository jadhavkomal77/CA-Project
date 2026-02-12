import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/projects"
      : "/api/projects",
    credentials: "include",
  }),
  tagTypes: ["Project"],


  endpoints: (builder) => ({
    /* 🌍 Public */
    getPublicProjects: builder.query({
      query: () => "/public",
      providesTags: ["Project"],
    }),

    getProjectBySlug: builder.query({
      query: (slug) => `/public/${slug}`,
    }),

    /* 🔐 Admin */
    getAdminProjects: builder.query({
      query: () => "/",
      providesTags: ["Project"],
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetPublicProjectsQuery,
  useGetProjectBySlugQuery,
  useGetAdminProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
