import axios from 'axios';

const API_URL = 'http://localhost:8080/attendees';

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAttendeeById = (attendeeId) => {
    return axios.get(`${API_URL}/${attendeeId}`, {headers: getAuthorizationHeader()})
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching attendee:', error);
            throw error;
        });
};

export const getAttendeeByUserId = (userId) => {
    return axios.get(`${API_URL}/${userId}`, {headers: getAuthorizationHeader()})
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching attendee by user ID:', error);
            throw error;
        });
};

export const getAttendeeEvents = (attendeeId) => {
    return axios.get(`${API_URL}/${attendeeId}`, {headers: getAuthorizationHeader()})
        .then(response => {
            return response.data.attendeeEventDtoList;
        })
        .catch(error => {
            console.error('Error fetching attendee events:', error);
            throw error;
        });
};
