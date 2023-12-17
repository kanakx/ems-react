import {useParams, useNavigate} from 'react-router-dom';
import EventForm from '../components/EventForm';
import {getById, updateById} from '../services/eventService.js'
import {useEffect, useState} from "react";

const EditEventPage = () => {
    const {eventId} = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        getById(eventId)
            .then(fetchedData => setEventData(fetchedData))
            .catch(error => {
                console.error('Failed to fetch event to update: ', error);
                //TODO Message to the user. What happens here?
            });
    }, [eventId]);


    //TODO Inform user about the success
    const handleSubmit = (updatedEventData) => {
        updateById(updatedEventData)
            .then(() => navigate('/events'))
            .catch(error => {
                console.error('Failed to update event: ', error);
                //TODO Message to the user. What happens here?
            });
    };

    if (!eventData) return <div>Loading...</div>;

    return (
        <EventForm onSubmit={handleSubmit} initialEvent={eventData}/>
    );
};

export default EditEventPage;
