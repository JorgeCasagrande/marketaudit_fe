import { getMissions, getFilterData,getMissionsSpecial,GetPhotoByProjectId } from './Request';

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

  missions.data.data.forEach(item => {
    const { id, value, icon} = item;
    result.push({ id: id, value: value, icon: icon}); 
  });
  return result;
};

export const filterListData= async(id) => {
  const result = await getFilterData(id);
  return result.data;
}

export const dataTable = async(id,users,pdvs, routes, questions) => {
  const tileData = await GetPhotoByProjectId(id,users,pdvs, routes, questions);

  return tileData.data;
};

