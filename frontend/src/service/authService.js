import api from "./apiService";

export const signUp = async (userData) => {
  const response = await api.post('/sign-up', userData);
  return response.data;
};

export const signIn = async (credentials) => {
  const response = await api.post('/sign-in', credentials);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get('/get-user-information');
  return response.data;
};