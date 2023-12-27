import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/events';

const getAllEvents = (isPublic) => {
    const params = {};
    if (isPublic !== undefined) {
        params.isPublic = isPublic;
    }

    return axios.get(API_URL, { params })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching events:', error);
            throw error;
        });
};

const getEventById = (eventId) => {
    return axios.get(`${API_URL}/${eventId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching event:', error);
            throw error;
        });
};

const saveEvents = (eventData) => {
    return axios.post(API_URL, eventData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error saving event:', error);
            throw error;
        });
};

const updateEventById = (eventId, updatedEventData) => {
    return axios.put(`${API_URL}/${eventId}`, updatedEventData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error updating event:', error);
            throw error;
        });
};

const deleteEventById = (eventId) => {
    return axios.delete(`${API_URL}/${eventId}`)
        .catch(error => {
            console.error('Error deleting event:', error);
            throw error;
        });
};

export { getAllEvents, getEventById, saveEvents, updateEventById, deleteEventById };
