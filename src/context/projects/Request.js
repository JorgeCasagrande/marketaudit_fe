import axiosInstance from 'helpers/axios';

export const getStatuses = () => {
  const request = axiosInstance({
    method: 'post',
    url: '/Project/GetStates'
  })
  return request;
};

export const getNewProjectJson = () => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetNewProject'
  })
  return request;
};

export const getResponsables = () => {
  const request = axiosInstance({
    method: 'post',
    url: '/Project/GetResponsables'
  })
  return request;
};