import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/projects' }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '',
    }),
    getProjectById: builder.query({
      query: (id) => `/${id}`,
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),
    }),
    updateProject: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    searchProjects: builder.mutation({
      query: (body) => ({
        url: '/search',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useSearchProjectsMutation,
} = projectsApi;
