import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

// Add default headers
Api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Only set multipart header when sending files
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    error => Promise.reject(error)
);


//User APIs
export const registerUserApi = (data) => Api.post('/api/user/create', data)
export const loginUserApi = (data) => Api.post('/api/user/login', data);

// Campaign APIs
export const createCampaignApi = (data) => Api.post('/api/campaign/create', data);
export const getAllCampaignsApi = () => Api.get('/api/campaign/all');
export const getLatestCampaignsApi = () => Api.get('/api/campaign/latest');
export const getCampaignByIdApi = (id) => Api.get(`/api/campaign/${id}`);
export const updateCampaignApi = (id, data) => Api.put(`/api/campaign/${id}`, data);
export const deleteCampaignApi = (id) => Api.delete(`/api/campaign/${id}`);