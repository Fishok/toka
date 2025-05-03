import React, { useState } from 'react';
import Button from '@/system-toolkit/Button.jsx';
import { useDeleteTaskMutation } from '@/features/api/tasksApi.js';
import Modal from '@/system-toolkit/Modal.jsx';

/**
 * TaskCard displays task information.
 *
 * @param {Object} props
 * @param {Object} props.task - Task object
 * @param {string} props.task._id - Task ID
 * @param {string} props.task.state - Task state (status)
 * @param {string|Object} props.task.projectId - Project ID or populated project object
 * @param {string} props.task.dueDate - Due date (ISO string)
 * @param {string} [props.task.notes] - Optional notes
 */
const TaskCard = ({ task, index, onEdit }) => {
  const formattedDate = new Date(task.dueDate).toLocaleDateString();
  const [deleteTask] = useDeleteTaskMutation();
  const [deleteDialog, setDeleteDialog] = useState(false);


  const toggleDeleteDialog = () => setDeleteDialog((prev) => !prev);

  const handleDelete = async () => {
    try {
      await deleteTask(task._id).unwrap();
      toggleDeleteDialog(); // close modal
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Task {index}</h2>

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">State:</span> {task.state}
      </p>

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Due Date:</span> {formattedDate}
      </p>
      <p className="text-sm text-gray-700 mt-2">
        <span className="font-semibold">Notes:</span> {task.notes}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>
        <Button
          variant="tertiary"
          className="flex-1"
          onClick={toggleDeleteDialog}
        >
          Delete
        </Button>
      </div>
      {deleteDialog && (
        <Modal title={'Delete task'} confirmText={'Confirm'} onConfirm={handleDelete} close={toggleDeleteDialog}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete?</h2>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskCard;
