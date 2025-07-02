import axiosInstance from 'helpers/axios';
import FileSaver from 'file-saver';

export const getCustomers = (statuses) => {
  const statusString = statuses.length > 0 ? statuses.toString() : '';

  const request = axiosInstance({
    method: 'post',
    url: '/Customer/GetCustomers',
    params: { states: statusString }
  })
  return request;
};

export const SaveEditCustomer = (customerJson) => {
  const request = axiosInstance({
    method: 'post',
    url: '/Customer/Save',
    data: customerJson,
  });
  return request;
};

export const getEditCustomerJson = (id) => {
  const request = axiosInstance({
    method: 'get',
    url: '/Customer/GetCustomer',
    params: {id}
  })
  return request;
};

export const toggleEnable = (ids) => {
  const request = axiosInstance({
    method: 'post',
    url: '/Customer/Enable',
    data: ids,
  });
  return request;
};

export const deleteRow = (ids) => {
  const request = axiosInstance({
    method: 'post',
    url: '/Customer/Delete',
    data: ids,
  });
  return request;
};

export const getReport = () => {
  return axiosInstance({
    method: 'get',
    url: `/Export/GetReport`,
    responseType: 'blob',
    params: {report: 'customer'}
  }).then(response => {
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'Clientes-reporte.csv');
  })
};