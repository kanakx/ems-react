import EventList from "../components/EventList";
import mockEvents from '../data/events.json';
import {useEffect, useState} from "react";
import {PageLayout, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
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
