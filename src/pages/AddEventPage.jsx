import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm.jsx";
import Notification from "../components/Notification";
import { save } from "../services/eventService.js";
import { PageLayout } from "../themes/SharedStyles.jsx";

const AddEventPage = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleSubmit = (newEventData) => {
        save(newEventData)
            .then(() => {
                setNotification({ message: 'Event saved successfully!', type: 'success' });
                setTimeout(() => navigate('/events'), 4000);
            })
            .catch(error => {
                console.error('Failed to save event: ', error);
                setNotification({ message: 'Failed to save event.', type: 'error' });
            });
    };


    return (
        <PageLayout>
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            <EventForm onSubmit={handleSubmit} initialEvent={null} />
        </PageLayout>
    );
}

export default AddEventPage;
