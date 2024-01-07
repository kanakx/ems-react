import axios from 'axios';
import { handleApiResponse, handleApiError } from '../utils/apiHandler';

const API_URL = 'http://localhost:8080/events';

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllEvents = () => {
    return axios.get(API_URL, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const getEventById = (eventId) => {
    return axios.get(`${API_URL}/${eventId}`, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const saveEvents = (eventData) => {
    return axios.post(API_URL, eventData, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const updateEventById = (eventId, updatedEventData) => {
    return axios.put(`${API_URL}/${eventId}`, updatedEventData, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const deleteEventById = (eventId) => {
    return axios.delete(`${API_URL}/${eventId}, {headers: getAuthorizationHeader()}`, {headers: getAuthorizationHeader()})
        .catch(handleApiError);
};
