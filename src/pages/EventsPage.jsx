import EventList from "../components/EventList";
import mockEvents from '../data/events.json';
import {useEffect, useState} from "react";
import {ErrorMessage, PageLayout, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        //TODO API GET
        setEvents(mockEvents);
    }, []);

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
      navigate('/');
    };

    const handleEditEvent = (updatedEvent) => {
        //TODO API PUT

        setEvents(currentEvents => currentEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    };

    const handleDeleteEvent = (eventId) => {
        //TODO API DELETE

        setEvents(currentEvents => currentEvents.filter(event => event.id !== eventId));
    };

    return (
        <PageLayout>
                    <PageTitle>Events</PageTitle>
                    <EventList events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent}/>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
