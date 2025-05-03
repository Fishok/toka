import { useWebSocket } from '@/hooks/useWebSocket.js';
import { Route, Routes } from 'react-router-dom';
import Projects from '@/components/dashboard/Projects.jsx';
import Tasks from '@/components/dashboard/Tasks.jsx';

const Dashboard = () => {
  useWebSocket();

  return <Routes>
    <Route index element={<Projects />} />
    <Route path=":projectId" element={<Tasks />} />
  </Routes>
};

export default Dashboard;