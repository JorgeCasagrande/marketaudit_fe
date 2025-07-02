import {getStatuses, getResponsables, getNewProjectJson} from './Request';

export const statusList = async() => {
  let result = [];
  const statuses = await getStatuses();

  statuses.data.data.forEach(item => {
    const { id, descripcion } = item;
    result.push({ key: id, value: descripcion }); 
  });
  return result;
};

export const responsableList = async() => {
  let result = [];
  const statuses = await getResponsables();

  statuses.data.data.forEach(item => {
    const { key, value } = item;
    result.push({ key: key, value: value }); 
  });
  return result;
};

export const getProjectJson = async() => {
  const projectJson = await getNewProjectJson();
  return projectJson.data.data;
};

