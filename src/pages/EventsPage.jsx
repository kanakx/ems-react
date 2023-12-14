import EventList from "../components/EventList";
import styled from 'styled-components';
import mockEvents from '../data/events.json';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const StyledEventsPage = styled.div`
    text-align: center;
    background-color: #282c34; // Same as homepage header
    min-height: 100vh;
    color: white; // Text color as on the homepage
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

const BackButton = styled.button`
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

    const handleBackButton = () => {
        navigate('/');
    };

    useEffect(() => {
        setEvents(mockEvents);
    }, []);

    return (
        <StyledEventsPage>
            <PageTitle>Events</PageTitle>
            <EventList events={events} />
            <BackButton onClick={handleBackButton}>
                Back
            </BackButton>
        </StyledEventsPage>
    );
};

export default EventsPage;
