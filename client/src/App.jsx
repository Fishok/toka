import Navbar from '@/components/Navbar.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { settingRoute, systemRoutes } from '@/routes/index.jsx';


const App = () => {
  return (
    <div className="flex h-full">
      <div className="w-16">
        <Navbar />
      </div>
      <div className="
        flex flex-col flex-1
        box-border h-full rounded-lg
        bg-[var(--color-secondary)]
        shadow-lg
        backdrop-blur-[50px]
        overflow-hidden p-2
    ">
        <Routes>
          {[...systemRoutes, settingRoute].map(({ root, component }) => (
            <Route key={root} path={root} element={component} />
          ))}
          <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>
      </div>
    </div>


  );
};

export default App;