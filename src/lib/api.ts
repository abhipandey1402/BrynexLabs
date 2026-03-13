import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance
export const api: AxiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can add auth headers here if needed using a store or generic cookie method
        // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error: AxiosError) => {
        console.error('[API REQUEST ERROR]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(`[API RESPONSE] ${response.status} ${response.config.url}`);
        return response;
    },
    (error: AxiosError) => {
        const errorMessage = (error.response?.data as { message?: string })?.message || error.message || 'Something went wrong';
        console.error(`[API RESPONSE ERROR] ${error.config?.url}:`, errorMessage);

        // Optionally trigger a global notification/toast here

        return Promise.reject(error);
    }
);

export default api;
