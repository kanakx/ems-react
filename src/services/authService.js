import axios from 'axios';
import {handleApiError} from "../utils/apiHandler.js";

const API_URL = 'http://localhost:8080/auth';

export const register = (credentials) => {
    return axios.post(`${API_URL}/register`, credentials)
        .then(response => {
            console.log('Registration successful:', response.data);
            return response.data;
        })
        .catch(error => handleApiError(error));
};

export const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials)
        .then(response => {
            const {data} = response;
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch(error => handleApiError(error));
};

export const validateToken = (tokenDto) => {
    return axios.post(`${API_URL}/validate`, tokenDto)
        .then(response => response.data)
        .catch(error => {
            handleApiError(error);
            return {isValid: false};
        })
};

export const logout = () => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem('token');
            resolve('Logged out successfully');
        } catch (error) {
            console.error('Error logging out:', error);
            handleApiError(error);
            reject(error);
        }
    });
};

const authService = {
    register,
    login,
    logout
};

export default authService;
