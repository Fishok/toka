import { useCreateTaskMutation, useUpdateTaskMutation } from '@/features/api/tasksApi.js';
import Modal from '@/system-toolkit/Modal.jsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const TaskDialog = ({ selectedTask, onCloseDialog }) => {
  const { projectId } = useParams();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [state, setState] = useState(selectedTask?.state ?? 'CREATED');
  const [dueDate, setDueDate] = useState(
    selectedTask?.dueDate ? selectedTask.dueDate.substring(0, 10) : ''
  );
  const [notes, setNotes] = useState(selectedTask?.notes ?? '');

  const handleSaveTask = () => {
    const payload = {
      projectId,
      state,
      dueDate: new Date(dueDate).toISOString(),
      notes,
    };

    if (selectedTask?._id) {
      updateTask({ id: selectedTask._id, ...payload })
        .unwrap()
        .then(() => {
          onCloseDialog();
        })
        .catch((err) => {
          console.error('Failed to update task:', err);
        });
    } else {
      createTask(payload)
        .unwrap()
        .then(() => {
          onCloseDialog();
        })
        .catch((err) => {
          console.error('Failed to create task:', err);
        });
    }
  };

  return (
    <Modal
      confirmText={selectedTask ? 'Update' : 'Create'}
      onConfirm={handleSaveTask}
      disableConfirm={!dueDate}
      title={selectedTask ? 'Edit Task' : 'New Task'}
      close={onCloseDialog}
    >
      <div className="p-4 space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="CREATED">Created</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>
    </Modal>
  );
};

export default TaskDialog;
