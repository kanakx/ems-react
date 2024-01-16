import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {useEffect, useState} from "react";
import EventCard from "../components/EventCard.jsx";
import GenericItemPaginator from "../components/GenericItemPaginator.jsx";
import {getAttendeeById} from "../services/attendeeService.js";

const EventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, attendee} = useUserContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (attendee && attendee.idAttendee) {
            getAttendeeById(attendee.idAttendee)
                .then(fetchedAttendee => {
                    setEvents(fetchedAttendee.attendeeEventDtoList.map(ae => ae.eventDto));
                })
                .catch(error => console.log(error));
        }
    }, [attendee]);

    if (!attendee) return <div>Please log in to view events</div>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            {isAuth ? (
                <>
                    <StyledButton onClick={() => navigate('/events/add')}>
                        Add new
                    </StyledButton>
                    {events.length > 0 &&
                        <GenericItemPaginator
                            items={events}
                            pageSize={4}
                            renderItem={event => <EventCard key={event.idEvent} event={event} />}
                            noItemsMessage="No events available"
                        />
                    }
                </>
            ) : (
                <PageSubtitle>Sign in to add events</PageSubtitle>
            )}

            <StyledButton onClick={() => navigate('/')}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default EventsPage;
