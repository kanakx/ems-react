import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import {getById, updateById} from '../services/eventService.js'
import {useEffect, useState} from "react";

const EditEventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        getById(eventId)
            .then(fetchedData => setEventData(fetchedData));
    }, [eventId]);

    const handleSubmit = (updatedEventData) => {
        updateById(updatedEventData);
        navigate('/events');
    };

    if (!eventData) return <div>Loading...</div>;

    return (
        <EventForm initialEvent={eventData} onSubmit={handleSubmit} />
    );
};

export default EditEventPage;
