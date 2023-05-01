import axios from "axios";

const apiConfig = axios.create({
  baseURL: "https://copit-server.onrender.com",
});

axios.defaults.withCredentials = true;

export const get = async (route, auth = {}) => {
  const res = await apiConfig.get(`/${route}`, auth);
  return { data: res.data, status: res.status };
};
export const post = async (route, auth = {}, data) => {
  const res = await apiConfig.post(`/${route}`, data, auth);
  return { data: res.data, status: res.status };
};
export const put = async (route, auth, data) => {
  const res = await apiConfig.put(`/${route}`, data, auth);
  return { data: res.data, status: res.status };
};
export const patch = async (route, auth, data) => {
  const res = await apiConfig.patch(`/${route}`, data, auth);
  return { data: res.data, status: res.status };
};
export const _delete = async (route, auth) => {
  const res = await apiConfig.delete(`/${route}`, auth);
  return { data: res.data, status: res.status };
};

export default apiConfig;
