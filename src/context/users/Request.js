import axiosInstance from 'helpers/axios';

export const getStatuses = () => {
  const request = axiosInstance({
    method: 'post',
    url: '/User/GetStates'
  })
  return request;
};

export const getRoles = () => {
  const request = axiosInstance({
    method: 'post',
    url: '/User/GetRoles'
  })
  return request;
};

export const getNewUserJson = () => {
  const request = axiosInstance({
    method: 'get',
    url: '/User/GetNewUser'
  })
  return request;
};