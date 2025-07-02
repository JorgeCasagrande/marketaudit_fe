import { getMissions, getReportByMissionId,getMissionsSpecial } from './Request';

export const missionsList = async() => {
  let result = [];
  const missions = await getMissions();

  missions.data.data.forEach(item => {
    const { id, value, icon} = item;
    result.push({ id: id, value: value, icon: icon}); 
  });
  return result;
};


export const missionsListSpecial = async() => {
  let result = [];
  const missions = await getMissionsSpecial();

  missions.data.forEach(item => {
    const { Id, Name, IconMission} = item;
    result.push({ id: Id, value: Name, icon: IconMission }); 
  });
  return result;
};


export const dataTable = async(id) => {
  const questions = await getReportByMissionId(id);
  return questions.data;
};

