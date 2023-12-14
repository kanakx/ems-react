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
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        setEvents(mockEvents);
    }, []);

    const handleAddNewButton = () => {
        setIsAdding(true);
    };

    const handleBackButton = () => {
        if (isAdding) {
            setIsAdding(false);
        } else {
            navigate('/');
        }
    };

    const handleSaveEvent = (newEvent) => {
        //TODO POST to save new event
        const updatedEvents = [...events, { ...newEvent, id: events.length + 1 }];
        setEvents(updatedEvents);
        setIsAdding(false);
    };

    return (
        <StyledEventsPage>
            {isAdding ? (
                <EventForm onSubmit={handleSaveEvent} />
            ) : (
                <>
                    <PageTitle>Events</PageTitle>
                    <EventList events={events} />
                    <StyledButton onClick={handleAddNewButton}>
                        Add new
                    </StyledButton>
                </>
            )}
            <StyledButton onClick={handleBackButton}>
                {isAdding ? "Cancel" : "Back"}
            </StyledButton>
        </StyledEventsPage>
    );
};

export default EventsPage;
