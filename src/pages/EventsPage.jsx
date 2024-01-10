import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import EventsPaginator from "../components/EventsPaginator.jsx";
import SortComponent from "../components/SortComponent.jsx";
import {useEffect, useState} from "react";
import {getAllEvents} from "../services/eventService.js";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('date');
    const [filterCriteria, setFilterCriteria] = useState([]);
    const navigate = useNavigate();
    const {isAuth, attendee} = useUserContext();
    const pageSize = 4;

    useEffect(() => {
        getAllEvents()
            .then(eventsPage => {
                const sortedEvents = sortEvents(eventsPage.content, sortCriteria);
                setEvents(sortedEvents);
            })
            .catch(error => console.log(error));
    }, []);

    const sortEvents = (events, sortCriteria) => {
        switch (sortCriteria) {
            case 'start date':
                return events.sort((a, b) => new Date(a.startTimestamp) - new Date(b.startTimestamp));
            case 'end date':
                return events.sort((a, b) => new Date(a.endTimestamp) - new Date(b.endTimestamp));
            case 'duration':
                return events.sort((a, b) =>
                    (new Date(a.endTimestamp) - new Date(a.startTimestamp)) -
                    (new Date(b.endTimestamp) - new Date(b.startTimestamp))
                );
            case 'type':
                return events.sort((a, b) => a.type.localeCompare(b.type));
            default:
                return events;
        }
    };

    const handleSortChange = (newSortCriteria) => {
        setSortCriteria(newSortCriteria);
        setEvents(sortEvents(events, newSortCriteria));
    };

    //TODO maybe some error page or smth?
    if (!attendee) return <div>Please log in to view events</div>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            {isAuth ? (
                <>
                    <StyledButton onClick={() => navigate('/events/add')}>
                        Add new
                    </StyledButton>

                    <SortComponent onChange={handleSortChange}/>

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
