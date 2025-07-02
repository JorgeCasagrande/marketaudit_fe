import axiosInstance from 'helpers/axios';

export const getMissions = () => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetProjectReports'
  })
  return request;
};

export const getReportByMissionId = (id) => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetReportByProjectId',
    params: { id: id }
  })
  return request;
};

export const getMissionsSpecial = () => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetProjectReports'
  })
  return request;
};

export const getFilterData = (id) => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetDataFilterPhoto',
    params: { id: id }
  })
  return request;
};

export const GetPhotoByProjectId = (id, users, pdvs, routes, questions) => {
  const usersString = users.length > 0 ? users.toString() : '';
  const pdvsString = pdvs.length > 0 ? pdvs.toString() : '';
  const routesString = routes.length > 0 ? routes.toString() : '';
  const questionsString = questions.length > 0 ? questions.toString() : '';
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetPhotoByProjectId',
    params: { id: id, users: usersString, pdvs: pdvsString, routes: routesString, questions: questionsString}
  })
  return request;
};