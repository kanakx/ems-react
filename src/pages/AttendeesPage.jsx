import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {useEffect, useState} from "react";
import {getAllAttendees} from "../services/attendeeService.js";
import GenericItemPaginator from "../components/GenericItemPaginator.jsx";
import AttendeeCard from "../components/AttendeeCard.jsx";

const AttendeesPage = () => {
    const navigate = useNavigate();
    const {isAuth, isAdmin,  attendee} = useUserContext();
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        getAllAttendees()
            .then(fetchedAttendees => {
                setAttendees(fetchedAttendees);
            })
            .catch(error => console.log(error));
    }, []);

    //TODO maybe some error page or something?
    if (!attendee) return <div>Please log in to view attendees</div>

    return (
        <PageLayout>
            <PageTitle>Attendees</PageTitle>
            {isAuth && isAdmin ? (
                <>
                    <GenericItemPaginator
                        items={attendees}
                        pageSize={4}
                        renderItem={attendee => <AttendeeCard key={attendee.idAttendee} attendee={attendee} />}
                        noItemsMessage="No attendees available"
                    />
                </>
            ) : (
                <PageSubtitle>Sign in to add events</PageSubtitle>
            )}

            <StyledButton onClick={() => navigate('/admin')}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default AttendeesPage;
