import EventList from "../components/EventList";
import mockEvents from '../data/events.json';
import {useEffect, useState} from "react";
import {PageLayout, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {deleteById} from "../services/eventService.js";
import Notification from "../components/Notification.jsx";

const EventsPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        //TODO API GET + error handling like in EditEventPage
        setEvents(mockEvents);
    }, []);

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
        navigate('/');
    };

    const handleEditEvent = (eventId) => {
        navigate(`/events/edit/${eventId}`);
    };

    //TODO Inform user about the success
    const handleDeleteEvent = (eventId) => {
        //TODO API DELETE
        deleteById(eventId)
            .then(() => {
                setNotification({ message: 'Event deleted successfully!', type: 'error' });
                setTimeout(() => navigate('/events'), 4000);
            })
            .catch(error => {
                console.error('Failed to delete event: ', error);
                setNotification({ message: 'Failed to delete event.', type: 'error' });
            });
    };

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            <EventList events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent}/>
            {notification.message && <Notification message={notification.message} type={notification.type}/>}
            <StyledButton onClick={handleAddNewButton}>
                Add new
            </StyledButton>
            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default EventsPage;
