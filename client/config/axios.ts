import axios from 'axios';

const BASE_URL = 'https://hypercoffee-api.onrender.com/api/v1';
export const axiosInstance = axios.create({
	baseURL: BASE_URL,
});
