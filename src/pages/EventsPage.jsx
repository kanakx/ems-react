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
                setEvents(eventsPage.content);
            })
            .catch(error => console.log(error));
    }, []);

    const sortEvents = (sortCriteria) => {
        let sorted = [...events]; // Create a copy of the events array
        switch (sortCriteria) {
            case 'start date':
                sorted.sort((a, b) => new Date(a.startTimestamp) - new Date(b.startTimestamp));
                break;
            case 'end date':
                sorted.sort((a, b) => new Date(a.endTimestamp) - new Date(b.endTimestamp));
                break;
            case 'duration':
                sorted.sort((a, b) =>
                    (new Date(a.endTimestamp) - new Date(a.startTimestamp)) -
                    (new Date(b.endTimestamp) - new Date(b.startTimestamp))
                );
                break;
            case 'type':
                sorted.sort((a, b) => a.type.localeCompare(b.type));
                break;
            default:
            // No sorting or default sorting logic
        }
        return sorted;
    };

    const handleSortChange = (newSortCriteria) => {
        setSortCriteria(newSortCriteria);
        setEvents(sortEvents(events));
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

                    {/*<SortComponent onChange={handleSortChange}/>*/}

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
