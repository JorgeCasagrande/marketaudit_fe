import React from 'react';
import {statusList, getCustomerJson} from './DataMapper';
import PropTypes from 'prop-types';

export const ClientContext = React.createContext({
  statuses: [],
  customerJson: {},
});

const ClientProvider = ({children}) => {
  const [statuses, setStatuses] = React.useState([]);
  const [customerJson, setCustomerJson] = React.useState({});

    const loadData = async() => {
      setStatuses(await statusList());
      setCustomerJson(await getCustomerJson());
  };

  React.useEffect(() => {
    loadData();    
  }, []);

  return (
    <ClientContext.Provider value={{ statuses, customerJson }}>
      {children}
    </ClientContext.Provider>
  );
};

ClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientProvider;
