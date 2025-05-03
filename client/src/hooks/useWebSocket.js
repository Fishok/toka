import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { projectsApi } from '@/features/api/projectsApi.js';
import { tasksApi } from '@/features/api/tasksApi.js';
import { EVENT_DELETE, EVENT_INSERT, EVENT_UPDATE, MODEL_PROJECT, MODEL_TASK } from '@/utils/constatns.js';


/**
 * WebSocket hook that listens for INSERT, UPDATE, DELETE
 * for both Project and Task models and updates RTK Query cache.
 *
 * @param {string} url - WebSocket URL
 */
export const useWebSocket = (url = 'ws://localhost:3000/ws') => {
  const dispatch = useDispatch();
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const { type, model, data } = message;

        switch (model) {
          case MODEL_PROJECT:
            handleProjectEvent(type, data);
            break;

          case MODEL_TASK:
            handleTaskEvent(type, data);
            break;

          default:
            console.warn(`Unknown model: ${model}`);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', event.data);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      ws.close();
    };
  }, [dispatch, url]);

  /** Handles project model events */
  const handleProjectEvent = (type, data) => {
    switch (type) {
      case EVENT_INSERT:
        dispatch(
          projectsApi.util.updateQueryData('getProjects', undefined, (draft) => {
            draft.push(data);
          }),
        );
        break;

      case EVENT_UPDATE:
        dispatch(
          projectsApi.util.updateQueryData('getProjects', undefined, (draft) => {
            const index = draft.findIndex((p) => p._id === data._id);
            if (index !== -1) draft[index] = data;
          }),
        );
        break;

      case EVENT_DELETE:
        dispatch(
          projectsApi.util.updateQueryData('getProjects', undefined, (draft) => {
            const index = draft.findIndex((p) => p._id === data._id);
            if (index !== -1) draft.splice(index, 1);
          }),
        );
        break;

      default:
        console.warn(`Unknown project event type: ${type}`);
    }
  };

  /** Handles task model events */
  const handleTaskEvent = (type, data) => {
    const projectId = data.projectId;

    switch (type) {
      case EVENT_INSERT:
        dispatch(
          tasksApi.util.updateQueryData('getTasksByProjectId', projectId, (draft) => {
            draft.push(data);
          }),
        );
        break;

      case EVENT_UPDATE:
        dispatch(
          tasksApi.util.updateQueryData('getTasksByProjectId', projectId, (draft) => {
            const index = draft.findIndex((t) => t._id === data._id);
            if (index !== -1) draft[index] = data;
          }),
        );
        break;

      case EVENT_DELETE:
        dispatch(
          tasksApi.util.updateQueryData('getTasksByProjectId', projectId, (draft) => {
            const index = draft.findIndex((t) => t._id === data._id);
            if (index !== -1) draft.splice(index, 1);
          }),
        );
        break;

      default:
        console.warn(`Unknown task event type: ${type}`);
    }
  };
};
