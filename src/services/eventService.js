import axios from 'axios';
import { handleApiResponse, handleApiError } from '../utils/apiHandler';

const API_URL = 'http://localhost:8080/api/v1/events';

export const getAllEvents = (isPublic) => {
    const params = {};
    if (isPublic !== undefined) {
        params.isPublic = isPublic;
    }

    return axios.get(API_URL, { params })
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const getEventById = (eventId) => {
    return axios.get(`${API_URL}/${eventId}`)
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const saveEvents = (eventData) => {
    return axios.post(API_URL, eventData)
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const updateEventById = (eventId, updatedEventData) => {
    return axios.put(`${API_URL}/${eventId}`, updatedEventData)
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const deleteEventById = (eventId) => {
    return axios.delete(`${API_URL}/${eventId}`)
        .catch(handleApiError);
};
