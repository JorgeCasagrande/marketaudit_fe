import axiosInstance from 'helpers/axios';

export const login = data => {
  const request = axiosInstance({
    method: 'post',
    url: '/Auth/Login',
    data
  });
  return request;
};
