import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try{
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await instance.post('/api/token/refresh/', {
                    refresh: refreshToken
                });
                const { access } = response.data;
                localStorage.setItem('token', access);
                instance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return instance(originalRequest);
            }catch (error) {
                console.log('Refresh token failed:', error);
            }
        }
        return Promise.reject(error);
    }  
);

export default instance;