import {getStatuses, getNewCustomerJson} from './Request';

export const statusList = async() => {
  let result = [];
  const statuses = await getStatuses();

  statuses.data.data.forEach(item => {
    const { key, value } = item;
    result.push({ key: key, value: value }); 
  });
  return result;
};

export const getCustomerJson = async() => {
  const customerJson = await getNewCustomerJson();
  return customerJson.data.data;
};

