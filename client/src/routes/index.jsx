import DashboardIcon from '@shared/icons/navbar/dashbaord.svg?react';
import LibraryIcon from '@shared/icons/navbar/library.svg?react';
import SystemManagementIcon from '@shared/icons/navbar/system.svg?react';
import UsersIcon from '@shared/icons/navbar/user.svg?react';
import ReportsIcon from '@shared/icons/navbar/reports.svg?react';
import SettingsIcon from '@shared/icons/navbar/settings.svg?react';
import Dashboard from '@/components/dashboard/index.jsx';
import SystemManagement from '@/components/system-management/index.jsx';
import Users from '@/components/users/index.jsx';
import Library from '@/components/library/index.jsx';
import Reports from '@/components/reports/index.jsx';
import Settings from '@/components/settings/index.jsx';


export const systemRoutes = [
  {
    root: '/projects/*',
    title: 'Projects',
    icon: DashboardIcon,
    component: <Dashboard/>,
  },
  {
    root: '/system-management',
    title: 'System Management',
    icon: SystemManagementIcon,
    component: <SystemManagement/>
  },
  {
    root: '/users',
    icon: UsersIcon,
    title: 'Users',
    component: <Users/>
  },
  {
    root: '/library',
    icon: LibraryIcon,
    title: 'Library',
    component: <Library/>
  },
  {
    root: '/reports',
    icon: ReportsIcon,
    title: 'Reports',
    component: <Reports/>
  },
];


export const settingRoute = {
  root: '/settings',
  title: 'Settings',
  icon: SettingsIcon,
  component: <Settings/>
};