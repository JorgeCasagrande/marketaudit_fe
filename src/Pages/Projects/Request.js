import axiosInstance from 'helpers/axios';
import FileSaver from 'file-saver';

export const getProjects = (statuses, responsable) => {
  const statusString = statuses.length > 0 ? statuses.toString() : '';
  const responsableString = responsable.length > 0 ? responsable.toString() : '';

  const request = axiosInstance({
    method: 'post',
    url: '/Project/GetProjects',
    params: { states: statusString, responsables: responsableString }
  })
  return request;
};

export const SaveEditProject = (json) => {
  const request = axiosInstance({
    method: 'post',
    url: '/Project/Save',
    data: json,
  });
  return request;
};

export const getEditProjectJson = (id) => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetProject',
    params: {id}
  })
  return request;
};

export const toggleEnable = (ids) => {
  const request = axiosInstance({
    method: 'post',
    url: '/Project/Enable',
    data: ids,
  });
  return request;
};

export const deleteRow = (ids) => {
  const request = axiosInstance({
    method: 'post',
    url: '/Project/DeleteProject',
    data: ids,
  });
  return request;
};

export const deleteDuplicatePdvs = (projectId) => {
  debugger;
  const request = axiosInstance({
    method: 'post',
    url: '/Project/DeleteDuplicatePdvs',
    params: { projectId: projectId }
  });
  return request;
};

export const getReport = () => {
  return axiosInstance({
    method: 'get',
    url: `/Export/GetReport`,
    responseType: 'blob',
    params: {report: 'project'}
  }).then(response => {
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'Projectos-reporte.csv');
  })
};

export const getQuestionByProjectId = (id) => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetQuestionByProjectId',
    params: { id: id }
  })
  return request;
};

export const getPdvsByProjectId = (id) => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetPdvByProjectId',
    params: { id: id }
  })
  return request;
};

export const importQuestions = (id, files) => {
  const data = new FormData();
  data.append('questionFile', files[0], files[0].name);
  data.append('id', id);

  const headers = { 'Content-Type': 'multipart/form-data' };

  const request = axiosInstance({
    method: 'post',
    url: '/Project/ImportQuestions',
    data: data,
    headers: headers
  })
  return request;
};

export const importPdvs = (id, files) => {
  const data = new FormData();
  data.append('pdvfile', files[0], files[0].name);
  data.append('id', id);

  const headers = { 'Content-Type': 'multipart/form-data' };

  const request = axiosInstance({
    method: 'post',
    url: '/Project/ImportPDV',
    data: data,
    headers: headers
  })
  return request;
};

export const getPdvReport = (id) => {
  return axiosInstance({
    method: 'get',
    url: `/Export/GetReport`,
    responseType: 'blob',
    params: {report: 'pdvProject', id: id}
  }).then(response => {
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'PDVs-reporte.csv');
  })
};

export const getQuestionReport = (id) => {
  return axiosInstance({
    method: 'get',
    url: `/Export/GetReport`,
    responseType: 'blob',
    params: {report: 'questionProject', id: id}
  }).then(response => {
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'Preguntas-reporte.csv');
  })
};

export const getPDVTemplate = () => {
  const request = axiosInstance({
    method: 'get',
    url: '/Project/GetPdvTemplate', //REMPLAZAR POR RUTA DEL TEMPLATE DE PDV
    responseType: 'arraybuffer'
  });

  return request;
}

export const getQuestionTemplate = () => {
  const request = axiosInstance({
    method: 'get',
    url: '/Export/GetQuestionTemplate', //REMPLAZAR POR RUTA DEL TEMPLATE DE PREGUNTAS
    responseType: 'arraybuffer'
  });

  return request;
}