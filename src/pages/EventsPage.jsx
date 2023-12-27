import EventList from "../components/EventList";
import {useEffect, useState} from "react";
import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import Notification from "../components/Notification.jsx";
import {getAll} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";

const NoEventsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

const EventsPage = () => {
    const navigate = useNavigate();
    const { isAuth } = useUserContext();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        getAll(true)
            .then(fetchedEvents => {
                setEvents(fetchedEvents);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch events: ', error);
                setNotification({ message: 'Failed to load events.', type: 'error' });
            });
    }, []);

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
        navigate('/');
    };

    if (loading) return <Loading onBack={handleBackButton}/>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            {events && events.length > 0 ? (
                <EventList events={events}/>
            ) : (
                <NoEventsMessage>No public events available</NoEventsMessage>
            )}
            {notification.message && <Notification message={notification.message} type={notification.type}/>}

            {!isAuth && <PageSubtitle>Sign in to add events</PageSubtitle>}
            {isAuth && (
                <>
                    <StyledButton onClick={handleAddNewButton}>
                        Add new
                    </StyledButton>
                </>
            )}
            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default EventsPage;
