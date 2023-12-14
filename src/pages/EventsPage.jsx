import EventList from "../components/EventList";
import styled from 'styled-components';
import mockEvents from '../data/events.json';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EventForm from "../components/EventForm.jsx";

const StyledEventsPage = styled.div`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const PageTitle = styled.h1`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const StyledButton = styled.button`
    background-color: #61dafb;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
`;

const EventsPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    //TODO when fetched from an actual API add collection to dependency array so it will be refreshed
    useEffect(() => {
        setEvents(mockEvents);
    }, []);

    const handleAddNewButton = () => {
        setCurrentEvent(null);
        setIsAddingOrEditing(true);
    };

    const handleBackButton = () => {
        if (isAddingOrEditing) {
            setIsAddingOrEditing(false);
        } else {
            navigate('/');
        }
    };

    const handleEditEvent = (eventId) => {
        const eventToEdit = events.find(event => event.id === eventId);
        setCurrentEvent(eventToEdit);
        setIsAddingOrEditing(true);
    };

    const handleDeleteEvent = (eventId) => {

    };

    const handleSaveEvent = (formData) => {
        if (currentEvent === null) {
            //TODO POST

        } else {
            //TODO PUT

        }
        setIsAddingOrEditing(false);
    };

    return (
        <StyledEventsPage>
            {isAddingOrEditing ? (
                <EventForm onSubmit={handleSaveEvent} initialEvent={currentEvent} />
            ) : (
                <>
                    <PageTitle>Events</PageTitle>
                    <EventList events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
                    <StyledButton onClick={handleAddNewButton}>
                        Add new
                    </StyledButton>
                </>
            )}
            <StyledButton onClick={handleBackButton}>
                {isAddingOrEditing ? "Cancel" : "Back"}
            </StyledButton>
        </StyledEventsPage>
    );
};

export default EventsPage;
