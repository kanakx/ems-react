import axios from 'axios';

const API_URL = 'YOUR_API_URL'; //TODO Replace with actual URL

const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials)
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
