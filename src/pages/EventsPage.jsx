import EventList from "../components/EventList";
import {useEffect, useState} from "react";
import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {getAllEvents} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {toast} from "react-toastify";

const NoEventsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

const EventsPage = () => {
    const navigate = useNavigate();
    const { isAuth } = useUserContext();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let loadingTimeout = setTimeout(() => {
            setIsLoading(true);

            getAllEvents(true)
                .then(fetchedEvents => {
                    setEvents(fetchedEvents);
                })
                .catch(error => {
                    console.error('Failed to fetch events: ', error);
                    toast.error('Failed to load events.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 500);

        return () => clearTimeout(loadingTimeout);
    }, []);

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
        navigate('/events');
    };

    if (isLoading) return <Loading onBack={handleBackButton}/>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            {events && events.length > 0 ? (
                <EventList events={events}/>
            ) : (
                <NoEventsMessage>No events available</NoEventsMessage>
            )}

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
