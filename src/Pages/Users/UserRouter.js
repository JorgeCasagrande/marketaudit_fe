import React from 'react';
import UserProvider from '../../context/users/UserProvider';
import UserPage from './UserPage';

const UserRouter = (props) => {
  return (
    <UserProvider>
      <UserPage />
    </UserProvider>
  )
};

export default UserRouter;
