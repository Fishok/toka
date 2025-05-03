import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/tasks' }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '',
    }),
    getTasksByProjectId: builder.query({
      query: (id) => `project/${id}`,
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    searchTasks: builder.mutation({
      query: (body) => ({
        url: '/search',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTasksByProjectIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useSearchTasksMutation,
} = tasksApi;
