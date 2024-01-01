import EventList from "../components/EventList";
import {useEffect, useState} from "react";
import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {getAllEvents} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {getAttendeeById} from "../services/attendeeService.js";

const NoEventsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

const EventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, user} = useUserContext();
    const [allEvents, setAllEvents] = useState([]);
    const [ownedEvents, setOwnedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getAllEvents(),
            getAttendeeById(user.idAttendee)
        ])
            .then(([allEventsData, attendeeData]) => {
                const ownedEventIds = new Set(attendeeData.attendeeEventDtoList.map(ae => ae.eventDto.idEvent));
                const owned = attendeeData.attendeeEventDtoList.map(ae => ae.eventDto);
                const others = allEventsData.filter(event => !ownedEventIds.has(event.idEvent));

                setAllEvents(others);
                setOwnedEvents(owned);
            })
            .finally(() => setIsLoading(false));
    }, [user.idAttendee]);

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
        navigate('/');
    };

    if (isLoading) return <Loading onBack={handleBackButton}/>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            {allEvents && allEvents.length > 0 ? (
                <EventList events={allEvents}/>
            ) : (
                <NoEventsMessage>No events available</NoEventsMessage>
            )}

            {ownedEvents && ownedEvents.length > 0 ? (
                <>
                    <PageSubtitle>Owned by you</PageSubtitle>
                    <EventList events={ownedEvents}/>
                </>
            ) : (
                <NoEventsMessage>No events available</NoEventsMessage>
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
