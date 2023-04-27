import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
export const baseUrl = 'http://192.168.0.107:4000/'

const axiosClient =  axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `${localStorage.getItem('token')}`
  }

});


axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use(function (response: AxiosResponse) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosClient;