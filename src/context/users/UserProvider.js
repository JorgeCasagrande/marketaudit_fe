import React from 'react';
import {statusList,rolesList, getUserJson} from './DataMapper';
import PropTypes from 'prop-types';

export const UserContext = React.createContext({
  statuses: [],
  roles: [],
  userJson: {},
});

const UserProvider = ({children}) => {
  const [statuses, setStatuses] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [userJson, setUserJson] = React.useState({});

    const loadData = async() => {
      setStatuses(await statusList());
      setRoles(await rolesList());
      setUserJson(await getUserJson());
  };

  React.useEffect(() => {
    loadData();    
  }, []);

  return (
    <UserContext.Provider value={{ statuses, userJson, roles }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
