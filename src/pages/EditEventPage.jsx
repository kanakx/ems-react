import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { fetchEvent } from '../api';
import {useEffect, useState} from "react";

const EditEventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        fetchEvent(eventId).then(data => setEventData(data));
    }, [eventId]);

    const handleSubmit = (updatedEventData) => {
        // Update event logic
        navigate('/events');
    };

    if (!eventData) return <div>Loading...</div>;

    return (
        <EventForm initialEvent={eventData} onSubmit={handleSubmit} />
    );
};

export default EditEventPage;
