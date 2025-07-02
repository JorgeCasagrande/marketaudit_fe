import axiosInstance from 'helpers/axios';
import FileSaver from 'file-saver';

export const getReport = (report, reportName, id = 0) => {

  return axiosInstance({
    method: 'get',
    url: `/Export/GetReport`,
    responseType: 'blob',
    params: {report, id}
  }).then(response => {
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel;' });
    FileSaver.saveAs(blob, `${reportName}.xlsx`);
  })
};

export const getReportPhotos = (reportName, id ,users ,pdvs, routes, questions) => {

  const usersString = users.length > 0 ? users.toString() : '';
  const pdvsString = pdvs.length > 0 ? pdvs.toString() : '';
  const routesString = routes.length > 0 ? routes.toString() : '';
  const questionsString = questions.length > 0 ? questions.toString() : '';

  return axiosInstance({
    method: 'get',
    url: `/Export/GetPhotos`,
    responseType: 'blob',
    params: {id: id, users: usersString, pdvs: pdvsString, routes: routesString, questions: questionsString}
  }).then(response => {
    // const blob = new Blob([response.data], { type: 'application/zip;' });
    var data = response.data;
    FileSaver.saveAs(data, `${reportName}.zip`);
  })
};