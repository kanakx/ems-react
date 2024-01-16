import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {useEffect, useState} from "react";
import GenericItemPaginator from "../components/GenericItemPaginator.jsx";
import {getAllAttendeeEvents, updateAttendeeEvent} from "../services/attendeeEventsService.js";
import AttendeeEventCard from "../components/AttendeeEventCard.jsx";
import {getAllAttendees} from "../services/attendeeService.js";
import {getAllEvents} from "../services/eventService.js";

const AttendeeEventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, isAdmin,  attendee} = useUserContext();
    const [attendeeEvents, setAttendeeEvents] = useState([]);
    const [allAttendees, setAllAttendees] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    useEffect(() => {
        getAllAttendeeEvents()
            .then(fetchedAttendeeEvents => {
                setAttendeeEvents(fetchedAttendeeEvents);
            })
            .catch(error => console.log(error));

        getAllAttendees()
            .then(fetchedAttendees => setAllAttendees(fetchedAttendees))
            .catch(error => console.log(error));

        getAllEvents()
            .then(fetchedEvents => setAllEvents(fetchedEvents))
            .catch(error => console.log(error));
    }, [lastUpdated]);

    const handleSaveAssociation = (idAttendeeEvent, attendeeEventDto) => {
        updateAttendeeEvent(idAttendeeEvent, attendeeEventDto)
            .then(() => {
                console.log('Association updated successfully');
                setLastUpdated(Date.now());
            })
            .catch(error => {
                console.error('Error updating association', error);
                // Handle error appropriately
            });
    };

    if (!attendee) return <div>Please log in to view attendees events</div>

    return (
        <PageLayout>
            <PageTitle>Attendee Events</PageTitle>
            {isAuth && isAdmin ? (
                <>
                    <GenericItemPaginator
                        items={attendeeEvents}
                        pageSize={2}
                        renderItem={(attendeeEvent) => (
                            <AttendeeEventCard
                                key={attendeeEvent.idAttendeeEvent}
                                attendeeEvent={attendeeEvent}
                                allAttendees={allAttendees}
                                allEvents={allEvents}
                                onSave={handleSaveAssociation}
                            />
                        )}
                        noItemsMessage="No attendee events available"
                    />
                </>
            ) : (
                <PageSubtitle>Sign in to add attendee events</PageSubtitle>
            )}

            <StyledButton onClick={() => navigate('/admin')}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default AttendeeEventsPage;
