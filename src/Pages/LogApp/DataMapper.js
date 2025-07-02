import {GetLogByDate} from './Request';

export const GetLog = async(fromDate) => {
  const users = await GetLogByDate(fromDate);
  return users.data;
};