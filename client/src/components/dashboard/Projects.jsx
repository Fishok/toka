import { useGetProjectsQuery } from '@/features/api/projectsApi.js';
import ProjectCard from '@/components/dashboard/ProjectCard.jsx';
import { useState } from 'react';
import Modal from '@/system-toolkit/Modal.jsx';
import Tasks from '@/components/dashboard/Tasks.jsx';
import Button from '@/system-toolkit/Button.jsx';
import ProjectDialog from '@/components/dashboard/ProjectDialog.jsx';

const Projects = () => {
  const { data: projects = [] } = useGetProjectsQuery();
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasksModal, setTasksModal] = useState(false);
  const [projectDialog, setProjectDialog] = useState(false);


  const onShowTasks = (projectId) => {
    setTasksModal(true);
    setSelectedProject(projectId);
  };

  const onCloseTasks = () => {
    setSelectedProject(null);
  };
  const onCloseDialog = () => {
    setProjectDialog(false);
    setSelectedProject(null)
  };

  const onEditProject = (project) => {
    setSelectedProject(project);
    setProjectDialog(true);
  };

  const onOpenProjectDialog = () => setProjectDialog(true);

  return <div>
    <Button onClick={onOpenProjectDialog} className="w-full">Add project</Button>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {projects.map(project => {
        return <ProjectCard project={project} key={project._id} onShowTasks={onShowTasks}
                            onEdit={onEditProject} />;
      })}
      {tasksModal && <Modal close={onCloseTasks} title={'Tasks'} selectedProject={selectedProject}>
        <Tasks />
      </Modal>}
    </div>
    {projectDialog && <ProjectDialog selectedProject={selectedProject} onCloseDialog={onCloseDialog} />}
  </div>;
};

export default Projects;