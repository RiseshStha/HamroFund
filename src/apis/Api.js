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
export const updateCampaignApi = (id, data) => Api.put(`/api/campaign/update_camp/${id}`, data);
export const getUserCampaignsApi = (userId) => Api.get(`/api/campaign/get_user_campaign/${userId}`);
export const deleteCampaignApi = (id) => Api.delete(`/api/campaign/${id}`);
//update profile image
export const updateUserProfile = (id, file) => Api.put(`/api/user/update_user_image/${id}`,file)

//search campaign
export const searchCampaignsApi = (params) => {
    // Create a new URLSearchParams object
    const queryString = new URLSearchParams();
    
    // Add parameters if they exist
    if (params.page) queryString.append('page', params.page);
    if (params.limit) queryString.append('limit', params.limit);
    if (params.search) queryString.append('search', params.search);
    if (params.category) queryString.append('category', params.category);
    if (params.sortBy) queryString.append('sortBy', params.sortBy);
    
    return Api.get(`/api/campaign/search?${queryString.toString()}`);
};

//payment apis
export const initiatePaymentApi = (data) => Api.post('/api/payment/initiate', data);
export const getMyContributionsApi = () => Api.get('/api/payment/my-contributions');