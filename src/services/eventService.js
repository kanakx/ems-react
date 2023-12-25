const API_URL = 'http://localhost:8080/api/v1/events';

const getAll = () =>
    fetch(`${API_URL}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            return response.json();
        })
        .catch(error => console.error('Error fetching events:', error));


const getById = (eventId) =>
    fetch(`${API_URL}/${eventId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the event');
            }
            return response.json();
        })
        .catch(error => console.error('Error fetching event:', error));

const save = (eventData) =>
    fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save the event');
            }
            return response.json();
        })
        .catch(error => console.error('Error saving event:', error));

const updateById = (eventId, updatedEventData) =>
    fetch(`${API_URL}/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEventData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update the event');
            }
            return response.json();
        })
        .catch(error => console.error('Error updating event:', error));



const deleteById = (eventId) =>
    fetch(`${API_URL}/${eventId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete the event');
            }
        })
        .catch(error => console.error('Error deleting event:', error));

export {getAll, getById, save, updateById, deleteById};
