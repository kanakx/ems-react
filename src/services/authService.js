import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1/auth';

const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials, {headers: getAuthorizationHeader()})
        .then(response => {
            const { data } = response;
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch(error => {
            console.error('Error logging in:', error);
            throw error;
        });
};

const logout = () => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem('token');
            resolve('Logged out successfully');
        } catch (error) {
            console.error('Error logging out:', error);
            reject(error);
        }
    });
};

const authService = {
    login,
    logout
};

export default authService;
