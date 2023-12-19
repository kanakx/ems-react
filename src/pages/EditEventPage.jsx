import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import Notification from "../components/Notification"; // Import Notification component
import { getById, updateById } from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import {PageTitle} from "../themes/SharedStyles.jsx";

const EditEventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        getById(eventId)
            .then(fetchedData => {
                setEventData(fetchedData)
            })
            .catch(error => {
                console.error('Failed to fetch event to update: ', error);
                setNotification({ message: 'Failed to load event data.', type: 'error' });
            });
    }, [eventId]);

    const handleSubmit = (updatedEventData) => {
        updateById(updatedEventData)
            .then(() => {
                setNotification({ message: 'Event updated successfully!', type: 'success' });
                setTimeout(() => navigate('/events'), 4000);
            })
            .catch(error => {
                console.error('Failed to update event: ', error);
                setNotification({ message: 'Failed to update event.', type: 'error' });
            });
    };

    if (!eventData) return <Loading />;

    return (
        <>
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            <PageTitle>Event details</PageTitle>
            <EventForm onSubmit={handleSubmit} initialEvent={eventData} />
        </>
    );
};

export default EditEventPage;
