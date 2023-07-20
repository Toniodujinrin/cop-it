import axios from "axios";

const apiConfig = axios.create({

  baseURL: "https://copit.onrender.com",
});

export const get = async (route, auth = {}) => {
  const res = await apiConfig.get(`/${route}`, auth);
  return res.data;
};
export const post = async (route, auth = {}, data) => {
  const res = await apiConfig.post(`/${route}`, data, auth);
  return res.data;
};
export const put = async (route, auth, data) => {
  const res = await apiConfig.put(`/${route}`, data, auth);
  return res.data;
};
export const patch = async (route, auth, data) => {
  const res = await apiConfig.patch(`/${route}`, data, auth);
  return res.data;
};
export const _delete = async (route, auth) => {
  const res = await apiConfig.delete(`/${route}`, auth);
  return res.data;
};

export default apiConfig;
