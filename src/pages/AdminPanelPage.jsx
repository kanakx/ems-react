import PageLayout from "../components/PageLayout.jsx";
import {Card, PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";

const AdminPanelPage = () => {
    const navigate = useNavigate();

    const handleManageAttendees = () => {
        navigate('/attendees');
    };

    const handleManageAttendeeEvents = () => {
        navigate('/attendeeEvents');
    };

    const handleManageEvents = () => {
        navigate('/events');
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <PageLayout>
            <PageTitle>Admin Panel</PageTitle>

            <Card>
                <PageSubtitle>Manage entities</PageSubtitle>

                <StyledButton onClick={handleManageAttendees}>
                    Attendee
                </StyledButton>

                <StyledButton onClick={handleManageAttendeeEvents}>
                    AttendeeEvents
                </StyledButton>

                <StyledButton onClick={handleManageEvents}>
                    Events
                </StyledButton>
            </Card>

            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default AdminPanelPage;
