import Input from '@/system-toolkit/input/index.jsx';
import Modal from '@/system-toolkit/Modal.jsx';
import { useState } from 'react';
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/features/api/projectsApi.js';

const ProjectDialog = ({onCloseDialog, selectedProject}) => {
  const [updateProject] = useUpdateProjectMutation()
  const [createProject] = useCreateProjectMutation();
  const [name, setName] = useState(selectedProject?.name ?? '');
  const [description, setDescription] = useState(selectedProject?.name ?? '');

  const handleChangeName = (newValue) => setName(newValue);
  const handleChangeDescription = (newValue) => setDescription(newValue);
  const handleSaveProject = () => {
    const action = selectedProject
      ? updateProject({ id: selectedProject._id, name, description })
      : createProject({ name, description });

    action
      .unwrap()
      .then(() => {
        onCloseDialog();
      })
      .catch((err) => {
        console.error('Failed to save project:', err);
      });
  };


  return (
    <Modal confirmText={selectedProject ? 'Update' : 'Create'} onConfirm={handleSaveProject} disableConfirm={!name} title={'New Project'} close={onCloseDialog}>
      <div className="p-4">
        <Input placeholder="Name" className="mb-2 w-full" value={name} onChange={handleChangeName}
               label={'Project name'} />
        <Input placeholder="Description" className="w-full" value={description} onChange={handleChangeDescription}
               label={'Project description'} />
      </div>
    </Modal>
  );
};

export default ProjectDialog;