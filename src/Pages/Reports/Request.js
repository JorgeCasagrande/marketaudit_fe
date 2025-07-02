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
        params : {id: id}
    })
    return request;
  };

  export const getMissionsSpecial = () => {
    const request = axiosInstance({
      method: 'get',
      url: '/Mission/GetAllSpecialMissions'
    })
    return request;
  };