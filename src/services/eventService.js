import axios from 'axios';
import {handleApiResponse, handleApiError} from '../utils/apiHandler';

const API_URL = 'http://localhost:8080/events';

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    return token ? {Authorization: `Bearer ${token}`} : {};
};

//TODO probably no more pagination. Adjust
export const getAllEvents = (type, pageNo, pageSize) => {
    return axios.get(API_URL, {
            headers: getAuthorizationHeader(),
            params: {
                type: type,
                pageNo: pageNo,
                pageSize: pageSize
            }
        }
    )
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const getEventById = (eventId) => {
    return axios.get(`${API_URL}/${eventId}`, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const saveEvent = (eventData) => {
    return axios.post(API_URL, eventData, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const updateEventById = (eventId, updatedEventData) => {
    return axios.put(`${API_URL}/${eventId}`, updatedEventData, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const deleteEventById = (eventId) => {
    return axios.delete(`${API_URL}/${eventId}, {headers: getAuthorizationHeader()}`, {headers: getAuthorizationHeader()})
        .catch(error => handleApiError(error));
};
