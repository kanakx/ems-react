import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import EventsPaginator from "../components/EventsPaginator.jsx";
import {useEffect, useState} from "react";
import {getAllEvents} from "../services/eventService.js";
import EventCard from "../components/EventCard.jsx";
import GenericItemPaginator from "../components/GenericItemPaginator.jsx";

const EventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, attendee} = useUserContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getAllEvents()
            .then(fetchedEvents => {
                setEvents(fetchedEvents);
            })
            .catch(error => console.log(error));
    }, []);

    if (!attendee) return <div>Please log in to view events</div>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            {isAuth ? (
                <>
                    <StyledButton onClick={() => navigate('/events/add')}>
                        Add new
                    </StyledButton>

                    <GenericItemPaginator
                        items={events}
                        pageSize={4}
                        renderItem={event => <EventCard key={event.idEvent} event={event} />}
                        noItemsMessage="No events available"
                    />
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
