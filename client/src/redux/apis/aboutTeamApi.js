
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutTeamApi = createApi({

  reducerPath: "aboutTeamApi",

  baseQuery: fetchBaseQuery({

    baseUrl: import.meta.env.VITE_BACKEND_URL
      ? import.meta.env.VITE_BACKEND_URL + "/api/about-team"
      : "/api/about-team",

    credentials: "include",

  }),

  tagTypes: ["AboutTeam"],

  endpoints: (builder) => ({

    /* ADD */
    addAboutTeam: builder.mutation({

      query: (data) => ({

        url: "/add",
        method: "POST",
        body: data,

      }),

      invalidatesTags: ["AboutTeam"],

    }),


    /* GET */
    getAboutTeam: builder.query({

      query: () => "/all",

      providesTags: ["AboutTeam"],

    }),


    /* UPDATE */
    updateAboutTeam: builder.mutation({

      query: ({ id, data }) => ({

        url: `/update/${id}`,

        method: "PUT",

        body: data,

      }),

      invalidatesTags: ["AboutTeam"],

    }),


    /* DELETE */
    deleteAboutTeam: builder.mutation({

      query: (id) => ({

        url: `/delete/${id}`,

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

