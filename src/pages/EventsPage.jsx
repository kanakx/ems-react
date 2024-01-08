import EventList from "../components/EventList";
import {useEffect, useState} from "react";
import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {getAllEvents} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import EventsPaginator from "../components/EventsPaginator.jsx";

const EventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, attendee} = useUserContext();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     console.log(attendee)
    //
    //     setIsLoading(true);
    //     getAllEvents()
    //         .then(events => {
    //             setEvents(events);
    //         })
    //         .finally(() => setIsLoading(false));
    // }, []);

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
        navigate('/');
    };

    // if (isLoading) return <Loading onBack={handleBackButton}/>

    //TODO maybe some error page or smth?
    if (!attendee) return <div>Please log in to view events</div>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            <PageSubtitle>You are invited to</PageSubtitle>
            {/*{events && events.length > 0 ? (*/}
            {/*    <EventList events={events}/>*/}
            {/*) : (*/}
            {/*    <NoEventsMessage>No events available</NoEventsMessage>*/}
            {/*)}*/}

            <EventsPaginator pageSize={2}/>

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
