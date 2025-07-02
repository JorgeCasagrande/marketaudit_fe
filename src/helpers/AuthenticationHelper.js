const userId = 'userId';
const userName = 'userName'

export const isUserStored = () => {
  if (!localStorage.getItem(userId) || localStorage.getItem(userId) === undefined) {
    return false;
  }
  return true;
};

export const storeUser = (id, email) => {
  localStorage.setItem(userId, id);
  localStorage.setItem(userName, email);
};

export const removeUser = () => {
  localStorage.removeItem(userId);
  localStorage.removeItem(userName);
};

export const getUserId = () => {
  if (isUserStored) {
    return localStorage.getItem(userId);
  }
  return null;
};

export const getUserName = () => {
  if (isUserStored) {
    return localStorage.getItem(userName);
  }
  return null;
};
