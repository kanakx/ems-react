import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {useEffect, useState} from "react";
import {getAllAttendees} from "../services/attendeeService.js";
import GenericItemPaginator from "../components/GenericItemPaginator.jsx";
import AttendeeCard from "../components/AttendeeCard.jsx";

const AttendeeEventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, isAdmin,  attendee} = useUserContext();
    const [attendeeEvents, setAttendeeEvents] = useState([]);

    useEffect(() => {
        getAllAttendeeEvents()
            .then(fetchedAttendees => {
                setAttendees(fetchedAttendees);
            })
            .catch(error => console.log(error));
    }, []);

    //TODO maybe some error page or something?
    if (!attendee) return <div>Please log in to view attendees</div>

    return (
        <PageLayout>
            <PageTitle>Attendee Events</PageTitle>
            {isAuth && isAdmin ? (
                <>
                    {/*//TODO Form to add attendees just like events*/}
                    <StyledButton onClick={() => navigate('/attendeeEvents/add')}>
                        Add new
                    </StyledButton>

                    <GenericItemPaginator
                        items={attendeeEvents}
                        pageSize={4}
                        renderItem={attendee => <AttendeeEventsCard key={attendee.idAttendee} attendee={attendee} />}
                        noItemsMessage="No events available"
                    />
                </>
            ) : (
                <PageSubtitle>Sign in to add attendee events</PageSubtitle>
            )}

            <StyledButton onClick={() => navigate('/')}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default AttendeeEventsPage;
