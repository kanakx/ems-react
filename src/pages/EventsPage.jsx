import EventList from "../components/EventList";
import styled from 'styled-components';
import mockEvents from '../data/events.json';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EventForm from "../components/EventForm.jsx";

const Container = styled.div`
    background-color: ${props => props.theme.colors.background}; // Use theme background color
`;

const StyledEventsPage = styled.div`
    text-align: center;
    background-color: ${props => props.theme.colors.background};
    min-height: 100vh;
    color: ${props => props.theme.colors.text};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const PageTitle = styled.h1`
    margin-top: ${props => props.theme.spacing.medium};
    margin-bottom: ${props => props.theme.spacing.large};
`;

const StyledButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    border: none;
    padding: 10px 20px;
    border-radius: ${props => props.theme.borderRadius};
    cursor: pointer;
    margin-top: 20px;
    color: ${props => props.theme.colors.text};
`;

const ErrorMessage = styled.p`
    color: ${props => props.theme.colors.error};
    font-size: 0.8em;
`;


const EventsPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setEvents(mockEvents);
    }, []);

    const handleAddNewButton = () => {
        setCurrentEvent(null);
        setIsAddingOrEditing(true);
        setErrorMessage('');
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
        //TODO DELETE
        const url = `https://api.yourservice.com/events/${eventId}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete event');
                }
                setEvents(events.filter(event => event.id !== eventId));
            })
            .catch((error) => {
                console.error("Failed to delete event:", error);
                setErrorMessage('Failed to delete event. Please try again.');
            });
    };

    const handleSaveEvent = (formData) => {
        if (currentEvent) {
            // Editing existing event
            const url = `https://api.yourservice.com/events/${currentEvent.id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update event');
                    }
                    setEvents(events.map(event => event.id === currentEvent.id ? {...formData, id: currentEvent.id} : event));
                })
                .catch((error) => {
                    console.error("Failed to update event:", error);
                    setErrorMessage('Failed to save event. Please try again.');
                });
        } else {
            // Adding new event
            const url = `https://api.yourservice.com/events`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add new event');
                    }
                    // Retrieve the newly added event with its ID
                    return response.json();
                })
                .then(newEvent => {
                    setEvents([...events, newEvent]);
                })
                .catch((error) => {
                    console.error("Failed to add new event:", error);
                    setErrorMessage('Failed to update event. Please try again.');
                });
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
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
