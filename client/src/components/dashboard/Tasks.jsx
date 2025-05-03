import Button from '@/system-toolkit/Button.jsx';
import { useGetTasksByProjectIdQuery } from '@/features/api/tasksApi.js';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCard from '@/components/dashboard/TaskCard.jsx';
import { useEffect, useState } from 'react';
import TaskDialog from '@/components/dashboard/TaskDialog.jsx';

const Tasks = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: tasks = [], isLoading, isError, error } = useGetTasksByProjectIdQuery(projectId);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDialog, setTaskDialog] = useState(false);


  const onCloseDialog = () => {
    setTaskDialog(false);
    setSelectedTask(null)
  };

  const onOpenTaskDialog = () => setTaskDialog(true);


  useEffect(() => {
    if (isError && error?.status === 500) {
      console.error('Server error → redirecting to /projects');
      navigate('/projects');
    }
  }, [isError]);

  const onEditTask = (task) => {
    setSelectedTask(task);
    setTaskDialog(true);
  };


  return (
    <div>
      <Button className="w-full mb-4" onClick={onOpenTaskDialog}>
        Create Task
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((task, index) => (
          <TaskCard index={index + 1} key={task._id} task={task} onEdit={onEditTask}/>
        ))}
      </div>
      {taskDialog && <TaskDialog selectedTask={selectedTask} onCloseDialog={onCloseDialog} />}
    </div>
  );
};

export default Tasks;
