import axiosInstance from 'helpers/axios';
import FileSaver from 'file-saver';

export const GetLogByDate = (fromDate) => {
  let fDate = formatDate(fromDate);
  // let tDate = formatDate(toDate);
  const request = axiosInstance({
    method: 'get',
    url: '/LogApp/GetByDate',
    params : {date: fDate}
  })
  return request;
};

export const getReport = (fromData = null, toDate = null) => {
  return axiosInstance({
    method: 'get',
    url: `/Export/GetReport`,
    responseType: 'blob',
    params: {report: 'otByRangeDate', fromDate: fromData, toDate: toDate}
  }).then(response => {
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'Reporte_Tareas.xlsx');
  })
};

const formatDate =(fecha) => {
  let formato = 'yyyy-mm-dd';
	return formato.replace('mm', fecha.getMonth() + 1)
    .replace('yyyy', fecha.getFullYear())
	.replace('dd', fecha.getDate());
}