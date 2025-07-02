import axiosInstance from 'helpers/axios';
import FileSaver from 'file-saver';

export const getUsers = (statuses) => {
  const statusString = statuses.length > 0 ? statuses.toString() : '';
  // const rolesString = roles.length > 0 ? roles.toString() : '';

  const request = axiosInstance({
    method: 'post',
    url: '/User/GetUsers',
    params: { roles: '' ,states: statusString }
  })
  return request;
};

export const SaveEditUser = (userJson) => {
  const request = axiosInstance({
    method: 'post',
    url: '/User/Save',
    data: userJson,
  });
  return request;
};

export const getEditUserJson = (id) => {
  const request = axiosInstance({
    method: 'get',
    url: '/User/GetUser',
    params: {id}
  })
  return request;
};

export const toggleEnable = (ids) => {
  const request = axiosInstance({
    method: 'post',
    url: '/User/Enable',
    data: ids,
  });
  return request;
};

export const deleteRow = (ids) => {
  const request = axiosInstance({
    method: 'post',
    url: '/User/Delete',
    data: ids,
  });
  return request;
};

export const getReport = () => {
  return axiosInstance({
    method: 'get',
    url: `/Export/GetReport`,
    responseType: 'blob',
    params: {report: 'user'}
  }).then(response => {
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'Usuarios-reporte.csv');
  })
};