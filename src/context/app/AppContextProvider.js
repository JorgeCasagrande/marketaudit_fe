import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/common/alert/Alert';
import { Snackbar } from '@material-ui/core';


export const AppContext = React.createContext({
  openSnackbar: () => {},
});


const AppContextProvider = ({ children }) => {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarVariant, setSnackbarVariant] = React.useState('success'); //error
  const [snackbarMsg, setSnackbarMsg] = React.useState('');


  const openSnackbar = (msg, variant) => {
    setSnackbarMsg(msg);
    setSnackbarVariant(variant);
    setShowSnackbar(true);
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
    setSnackbarMsg('');
  };

  return (
    <AppContext.Provider value={ { openSnackbar } }>
      { children }
      <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          message={snackbarMsg}
          onClose={closeSnackbar}
       >
         <Alert
          onClose={closeSnackbar}
          severity={snackbarVariant}
         >
           {snackbarMsg}
         </Alert>
      </Snackbar>
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;