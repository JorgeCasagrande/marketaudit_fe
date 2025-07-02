import {getStatuses, getRoles, getNewUserJson} from './Request';

export const statusList = async() => {
  let result = [];
  const statuses = await getStatuses();

  statuses.data.data.forEach(item => {
    const { key, value } = item;
    result.push({ key: key, value: value }); 
  });

  return result;
};

export const rolesList = async() => {
  let result = [];
  const roles = await getRoles();

  roles.data.data.forEach(item => {
    const { key, value } = item;
    result.push({ key: key, value: value }); 
  });
  return result;
};

export const getUserJson = async() => {
  const userJson = await getNewUserJson();
  return userJson.data.data;
};

