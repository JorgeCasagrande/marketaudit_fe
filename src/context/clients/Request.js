import axiosInstance from 'helpers/axios';

export const getStatuses = () => {
  const request = axiosInstance({
    method: 'post',
    url: '/Customer/GetStates'
  })
  return request;
};

export const getNewCustomerJson = () => {
  const request = axiosInstance({
    method: 'get',
    url: '/Customer/GetNewCustomer'
  })
  return request;
};