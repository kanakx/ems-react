import axios from "axios";
import {handleApiError, handleApiResponse} from "../utils/apiHandler.js";

const API_URL = 'http://localhost:8080/attendeesEvents';

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllAttendeeEvents = () => {
    return axios.get(API_URL, {headers: getAuthorizationHeader()})
        .then(handleApiResponse)
        .catch(error => handleApiError(error));
};
