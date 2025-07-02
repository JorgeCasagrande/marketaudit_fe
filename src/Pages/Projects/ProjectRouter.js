import React from 'react';
import ProjectProvider from '../../context/projects/ProjectProvider';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routes } from 'app/Routes';

const ProjectPage = React.lazy(() => import('./ProjectPage'));
const ManageProject = React.lazy(() => import('./ManageProject'));

const ProjectRouter = (props) => {
  return (
    <ProjectProvider>
      <Switch>
        <Route key={'project'} exact path={routes.project} render={() => <ProjectPage /> }/>
        <Route exact key={'manageProject'} path={routes.manageProject} render={() => <ManageProject/>}/>
    </Switch>
    </ProjectProvider>
  )
};

export default withRouter(ProjectRouter);
