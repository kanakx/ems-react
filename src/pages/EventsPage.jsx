import EventList from "../components/EventList";
import {useEffect, useState} from "react";
import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {getAllEvents} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {getAttendeeById, getAttendeeEvents} from "../services/attendeeService.js";

const NoEventsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

const EventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, attendee } = useUserContext();
    const [allEvents, setAllEvents] = useState([]);
    const [ownedEvents, setOwnedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getAllEvents(),
            getAttendeeEvents(attendee.idAttendee)
        ])
            .then(([allEventsData, attendeeEvents]) => {
                const ownedEventIds = new Set(attendeeEvents.map(ae => ae.eventDto.idEvent));
                const owned = attendeeEvents.map(ae => ae.eventDto);
                const others = allEventsData.filter(event => !ownedEventIds.has(event.idEvent));

                setAllEvents(others);
                setOwnedEvents(owned);
            })
            .finally(() => setIsLoading(false));
    }, [attendee.idAttendee]);

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
        navigate('/');
    };

    if (isLoading) return <Loading onBack={handleBackButton}/>

    //TODO maybe some error page or smth?
    if (!attendee) return <div>Please log in to view events</div>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            <PageSubtitle>You're invited to</PageSubtitle>
            {allEvents && allEvents.length > 0 ? (
                <EventList events={allEvents}/>
            ) : (
                <NoEventsMessage>No events available</NoEventsMessage>
            )}

            {ownedEvents && ownedEvents.length > 0 && (
                <>
                    <PageSubtitle>Owned by you</PageSubtitle>
                    <EventList events={ownedEvents}/>
                </>
            )}

            {!isAuth && <PageSubtitle>Sign in to add events</PageSubtitle>}
            {isAuth && (
                <StyledButton onClick={handleAddNewButton}>
                    Add new
                </StyledButton>
            )}
            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default EventsPage;
