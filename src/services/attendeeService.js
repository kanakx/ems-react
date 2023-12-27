import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/attendees';

const getAttendee = (attendeeId) => {
    return axios.get(`${API_URL}/${attendeeId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching attendee:', error);
            throw error;
        });
};

const getAttendeeEvents = (attendeeId) => {
    return axios.get(`${API_URL}/${attendeeId}`)
        .then(response => {
            return response.data.attendeeEventDtoList;
        })
        .catch(error => {
            console.error('Error fetching attendee events:', error);
            throw error;
        });
};

export { getAttendeeEvents };


export { getAttendee };
