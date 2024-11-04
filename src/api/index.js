import axios from "axios";
import { getToken } from "./storage";
const BASE_URL = "http://172.20.10.11:10000";
const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
});
instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;
export { BASE_URL };
