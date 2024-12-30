import axios from "axios";

const Api = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : true,
    headers : {
        "Content-Type" : "multipart/form-data"
    }
});

Api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('token', token)
      }
      return config;
    },
    error => Promise.reject(error)
  );


export const registerUserApi = (data) => Api.post('/api/user/create', data)

export const loginUserApi = (data) => Api.post('/api/user/login', data);