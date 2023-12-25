import EventList from "../components/EventList";
import {useEffect, useState} from "react";
import {PageLayout, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import Notification from "../components/Notification.jsx";
import {getAll} from "../services/eventService.js";

const EventsPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        getAll()
            .then(data => setEvents(data))
            .catch(error => {
                console.error('Failed to fetch events: ', error);
                setNotification({ message: 'Failed to load events.', type: 'error' });
            });
    }, [events]);

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
        navigate('/');
    };

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            <EventList events={events}/>
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
