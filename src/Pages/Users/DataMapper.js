import {getUsers, getEditUserJson} from './Request';

export const usersTable = async(statusIdList) => {
  const users = await getUsers(statusIdList);
  return users.data;
};

export const editUserJson = async(id) => {
  const userJson = await getEditUserJson(id);
  return userJson.data.data;
};