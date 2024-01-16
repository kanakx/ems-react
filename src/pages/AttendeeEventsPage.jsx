import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {useEffect, useState} from "react";
import GenericItemPaginator from "../components/GenericItemPaginator.jsx";
import {getAllAttendeeEvents} from "../services/attendeeEventsService.js";
import AttendeeEventCard from "../components/AttendeeEventCard.jsx";
import {getAllAttendees} from "../services/attendeeService.js";
import {getAllEvents} from "../services/eventService.js";

const AttendeeEventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, isAdmin,  attendee} = useUserContext();
    const [attendeeEventAssociations, setAttendeeEventAssociations] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getAllAttendeeEvents()
            .then(fetchedAttendeeEvents => {
                setAttendeeEventAssociations(fetchedAttendeeEvents);
            })
            .catch(error => console.log(error));

        getAllAttendees()
            .then(fetchedAttendees => setAttendees(fetchedAttendees))
            .catch(error => console.log(error));

        getAllEvents()
            .then(fetchedEvents => setEvents(fetchedEvents))
            .catch(error => console.log(error));
    }, []);

    const handleAttendeeEventChange = (updatedAssociation, attendeeEventIndex) => {
        // Update the association in state and optionally send update to backend
        const updatedAssociations = [...attendeeEventAssociations];
        updatedAssociations[attendeeEventIndex] = updatedAssociation;
        setAttendeeEventAssociations(updatedAssociations);
        // Optionally send update request to backend here
    };

    if (!attendee) return <div>Please log in to view attendees events</div>

    return (
        <PageLayout>
            <PageTitle>Attendee Events</PageTitle>
            {isAuth && isAdmin ? (
                <>
                    <GenericItemPaginator
                        items={attendeeEventAssociations}
                        pageSize={4}
                        renderItem={(attendeeEvent, index) => (
                            <AttendeeEventCard
                                key={attendeeEvent.idAttendeeEvent}
                                attendeeEvent={attendeeEvent}
                                allAttendees={attendees}
                                allEvents={events}
                                onChange={handleAttendeeEventChange}
                                index={index}
                            />
                        )}
                        noItemsMessage="No attendee events available"
                    />
                </>
            ) : (
                <PageSubtitle>Sign in to add attendee events</PageSubtitle>
            )}

            <StyledButton onClick={() => navigate('/attendeeEvents')}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default AttendeeEventsPage;
