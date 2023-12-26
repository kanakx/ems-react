import EventList from "../components/EventList";
import {useEffect, useState} from "react";
import {PageLayout, PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import Notification from "../components/Notification.jsx";
import {getAll} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";

const NoEventsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

const EventsPage = () => {
    const navigate = useNavigate();
    const [publicEvents, setPublicEvents] = useState([]);
    const [privateEvents, setPrivateEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        getAll(true)
            .then(fetchedPublicEvents => {
                setPublicEvents(fetchedPublicEvents);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch public events: ', error);
                setNotification({ message: 'Failed to load public events.', type: 'error' });
            });

        getAll(false)
            .then(fetchedPrivateEvents => {
                setPrivateEvents(fetchedPrivateEvents);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch private events: ', error);
                setNotification({ message: 'Failed to load private events.', type: 'error' });
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

            <PageSubtitle>Public</PageSubtitle>
            {publicEvents && publicEvents.length > 0 ? (
                <EventList events={publicEvents}/>
            ) : (
                <NoEventsMessage>No public events available</NoEventsMessage>
            )}
            {notification.message && <Notification message={notification.message} type={notification.type}/>}

            <PageSubtitle>Your private</PageSubtitle>
            {privateEvents && privateEvents.length > 0 ? (
                <EventList events={privateEvents}/>
            ) : (
                <NoEventsMessage>No private events available</NoEventsMessage>
            )}
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
