import axios from 'axios';
import {handleApiResponse, handleApiError} from '../utils/apiHandler';

const API_URL = 'http://localhost:8080/events';

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    return token ? {Authorization: `Bearer ${token}`} : {};
};

export const getAllEvents = () => {
    return axios.get(API_URL, {headers: getAuthorizationHeader()}
    )
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const getEventById = (idEvent) => {
    return axios.get(`${API_URL}/${idEvent}`, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const saveEvent = (eventData) => {
    return axios.post(API_URL, eventData, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const updateEventById = (idEvent, updatedEventData) => {
    return axios.put(`${API_URL}/${idEvent}`, updatedEventData, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const deleteEventById = (idEvent) => {
    return axios.delete(`${API_URL}/${idEvent}`, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};
