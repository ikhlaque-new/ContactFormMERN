import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
});


export const getAllItems = () => api.get('/list');
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (item) => api.post('/create', item);
export const updateItem = (id, item) => api.post(`/update/${id}`, item);
export const deleteItem = (id) => api.delete(`/delete/${id}`);

const apiService = {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    getItem
};

export default apiService;