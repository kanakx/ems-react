import axios from 'axios';
import {handleApiError, handleApiResponse} from "../utils/apiHandler.js";

const API_URL = 'http://localhost:8080/attendees';

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllAttendees = () => {
    return axios.get(API_URL, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const getAttendeeById = (attendeeId) => {
    return axios.get(`${API_URL}/${attendeeId}`, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const saveAttendee = (attendeeData) => {
    return axios.post(API_URL, attendeeData, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const updateAttendeeById = (attendeeId, updatedAttendee) => {
    return axios.put(`${API_URL}/${attendeeId}`, updatedAttendee, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const deleteAttendeeById = (attendeeId) => {
    return axios.delete(`${API_URL}/${attendeeId}`, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};

export const getAttendeeEvents = (attendeeId) => {
    return axios.get(`${API_URL}/${attendeeId}`, {headers: getAuthorizationHeader()})
        .then(response => {
            return response.attendeeEventDtoList;
        })
        .catch(error => handleApiError(error));
};
