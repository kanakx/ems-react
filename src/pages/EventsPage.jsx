import EventList from "../components/EventList";
import mockEvents from '../data/events.json';
import {useEffect, useState} from "react";
import {ErrorMessage, PageLayout, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {deleteById} from "../services/eventService.js";

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

    const handleEditEvent = (eventId) => {
        navigate(`/events/edit/${eventId}`);
    };

    //TODO Inform user about the success
    const handleDeleteEvent = (eventId) => {
        //TODO API DELETE
        deleteById(eventId)
            .then(() => navigate('/events'))
            .catch(error => {
                console.error('Failed to delete event: ', error);
                //TODO Message to the user. What happens here?
            });
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
