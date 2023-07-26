import axios from "axios";

const apiConfig = axios.create({
  // baseURL: "https://13.48.25.52:3443",
  baseURL: "https://copit.onrender.com/",
});

export function setTokenHeaders(token){
  apiConfig.interceptors.request.use(
    async (config) =>{
    try{
      config.headers["token"]= token
      return config
    }
    catch(err){
      console.log(err)
      return Promise.reject(err)
    }
  }
  )
}
 

export const get = async (route, auth = {}) => {
  const res = await apiConfig.get(`/${route}`, auth);
  return res.data;
};
export const post = async (route, data) => {
  const res = await apiConfig.post(`/${route}`, data);
  return res.data;
};
export const put = async (route, data) => {
  const res = await apiConfig.put(`/${route}`, data);
  return res.data;
};
export const patch = async (route, data) => {
  const res = await apiConfig.patch(`/${route}`, data);
  return res.data;
};
export const _delete = async (route) => {
  const res = await apiConfig.delete(`/${route}`);
  return res.data;
};

export default apiConfig;
