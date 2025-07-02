import {getProjects, getEditProjectJson, getQuestionByProjectId, getPdvsByProjectId} from './Request';

export const projectsTable = async(statusIdList, responsableList) => {
  const projects = await getProjects(statusIdList, responsableList);
  return projects.data;
};

export const editProjectJson = async(id) => {
  const projectJson = await getEditProjectJson(id);
  return projectJson.data.data;
};

export const questionTable = async(id) => {
  const questions = await getQuestionByProjectId(id);
  return questions.data;
};

export const pdvsTable = async(id) => {
  const pdvs = await getPdvsByProjectId(id);
  return pdvs.data;
};