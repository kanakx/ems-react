import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import EventsPaginator from "../components/EventsPaginator.jsx";
import {useEffect, useState} from "react";
import {getAllEvents} from "../services/eventService.js";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const {isAuth, attendee} = useUserContext();
    const pageSize = 4;

    useEffect(() => {
        getAllEvents()
            .then(fetchedEvents => {
                setEvents(fetchedEvents);
            })
            .catch(error => console.log(error));
    }, []);

    //TODO maybe some error page or something?
    if (!attendee) return <div>Please log in to view events</div>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            {isAuth ? (
                <>
                    <StyledButton onClick={() => navigate('/events/add')}>
                        Add new
                    </StyledButton>

                    <EventsPaginator events={events} pageSize={pageSize}/>
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
