import { configureStore } from '@reduxjs/toolkit';
import {projectsApi} from "@/features/api/projectsApi.js";
import {tasksApi} from "@/features/api/tasksApi.js";


export const store = configureStore({
  reducer: {
    [projectsApi.reducerPath]: projectsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsApi.middleware).concat(tasksApi.middleware),
});