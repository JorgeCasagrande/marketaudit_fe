import React from 'react';
import UserProvider from '../../context/users/UserProvider';
import LogAppPage from './LogAppPage';

const UserRouter = (props) => {
  return (
    <UserProvider>
      <LogAppPage />
    </UserProvider>
  )
};

export default UserRouter;
