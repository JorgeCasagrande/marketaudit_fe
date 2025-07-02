import { lazy } from 'react';
import {
  AssignmentInd,
  Description
} from '@material-ui/icons';

export const routes = {
  home: '/',
  login: '/login',
  marketaudit: '/principal',
  project: '/proyectos',
  manageProject: '/proyectos/administrar',
};

const ReportPage = lazy(() => import('../Pages/Reports/ReportPage'));
const ClientPage = lazy(() => import('../Pages/Clients/ClientRouter'));
const ProjectPage = lazy(() => import('../Pages/Projects/ProjectRouter'));
const UserPage = lazy(() => import('../Pages/Users/UserRouter'));
const LogAppPage = lazy(() => import('../Pages/LogApp/LogAppPage'));
const GridPhotosPage = lazy(() => import('../Pages/GridPhotos/GridPhotosPage'));

export const menuRoutes = [
  {
    nested: false,
    items: [
      {
        path: '/Reportes-categorias',
        label: 'Informe de auditoria',
        icon: AssignmentInd,
        component: ReportPage,
        pageLabel: ''
      }
    ]
  },
  {
    nested: false,
    items: [
      {
        path: '/Fotos',
        label: 'Portal de Fotos',
        icon: AssignmentInd,
        component: GridPhotosPage,
        pageLabel: ''
      }
    ]
  },
  {
    nested: false,
    items: [
      {
        path: '/clientes',
        label: 'Clientes',
        icon: AssignmentInd,
        component: ClientPage,
        pageLabel: ''
      }
    ]
  },
  {
    nested: false,
    items: [
      {
        path: '/proyectos',
        label: 'Proyectos',
        icon: AssignmentInd,
        component: ProjectPage,
        pageLabel: ''
      }
    ]
  },
  {
    nested: false,
    items: [
      {
        path: '/usuarios',
        label: 'Usuarios',
        icon: AssignmentInd,
        component: UserPage,
        pageLabel: ''
      }
    ]
  },
  {
    nested: false,
    items: [
      {
        path: '/Log',
        label: 'Logs',
        icon: Description,
        component: LogAppPage,
      },
    ]
	},
];
