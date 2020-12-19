import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://burger-builder-app-dee9e.firebaseio.com/"
});

export default axiosInstance;