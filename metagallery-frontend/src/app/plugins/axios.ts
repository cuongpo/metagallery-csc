import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const onResponse: Parameters<typeof axios.interceptors.response.use>[0] = (response) => {
  return response.data;
};

const onRejected: Parameters<typeof axios.interceptors.response.use>[1] = (error) => {
  return Promise.reject(error);
};

axios.interceptors.response.use(onResponse, onRejected);
