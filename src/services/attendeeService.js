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
        .catch(handleApiError);
};

export const getAttendeeById = (attendeeId) => {
    return axios.get(`${API_URL}/${attendeeId}`, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(handleApiError);
};

export const getAttendeeByUserId = (userId) => {
    return axios.get(`${API_URL}/${userId}`, {headers: getAuthorizationHeader()})
        .then(response => response.data)
        .then(handleApiResponse)
        .catch(handleApiError);
};


//TODO consistent handling. Check if it won't break anything (line 35)
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
