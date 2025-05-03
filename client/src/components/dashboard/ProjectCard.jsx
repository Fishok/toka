import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/system-toolkit/Button.jsx';
import { useDeleteProjectMutation } from '@/features/api/projectsApi.js';
import Modal from '@/system-toolkit/Modal.jsx';

const ProjectCard = ({ project, onEdit }) => {
  const navigate = useNavigate();
  const [deleteProject] = useDeleteProjectMutation();
  const [deleteDialog, setDeleteDialog] = useState(false);

  const toggleDeleteDialog = () => setDeleteDialog((prev) => !prev);

  const handleDelete = async () => {
    try {
      await deleteProject(project._id).unwrap();
      toggleDeleteDialog();
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleShowTasks = () => {
    navigate(`/projects/${project._id}`)
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm w-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="text-sm text-gray-500 mb-4">
          <p>ID: <span className="break-all">{project._id}</span></p>
          <p>Created: {new Date(project.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <Button
          variant="primary"
          className="w-full"
          onClick={handleShowTasks}
        >
          Show Tasks
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => onEdit(project)}
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
        <Modal title={'Delete project'} confirmText={"Confirm"} onConfirm={handleDelete} close={toggleDeleteDialog}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete?</h2>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectCard;
