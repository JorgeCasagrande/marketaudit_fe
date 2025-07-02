import React from 'react';
import {statusList, getProjectJson, responsableList} from './DataMapper';
import PropTypes from 'prop-types';

export const ProjectContext = React.createContext({
  statuses: [],
  responsables: [],
  customerJson: {},
});

const ProjectProvider = ({children}) => {
  const [statuses, setStatuses] = React.useState([]);
  const [responsables, setResponsables] = React.useState([]);
  const [projectJson, setProjectJson] = React.useState({});
  const [projectEditId, setProjectEditId] = React.useState(0);
  // const [projectName, setProjectName] = React.useState('');
  const [projectToEdit, setprojectToEdit] = React.useState({});

    const loadData = async() => {
      setStatuses(await statusList());
      setProjectJson(await getProjectJson());
      setResponsables(await responsableList());
  };

  React.useEffect(() => {
    loadData();    
  }, []);

  return (
    <ProjectContext.Provider value={{ statuses, setStatuses, responsables, setResponsables, projectJson, projectEditId, setProjectEditId, projectToEdit, setprojectToEdit }}>
      {children}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProjectProvider;
