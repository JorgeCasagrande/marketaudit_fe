import {getCustomers, getEditCustomerJson} from './Request';

export const customersTable = async(statusIdList) => {
  const customers = await getCustomers(statusIdList);
  return customers.data;
};

export const editCustomerJson = async(id) => {
  const customerJson = await getEditCustomerJson(id);
  return customerJson.data.data;
};