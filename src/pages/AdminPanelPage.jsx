import PageLayout from "../components/PageLayout.jsx";
import {Card, PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";

const AdminPanelPage = () => {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <PageTitle>Admin Panel</PageTitle>

            <Card>
                <PageSubtitle>Manage entities</PageSubtitle>

                <StyledButton onClick={() => navigate('/attendees')}>
                    Attendee
                </StyledButton>

                <StyledButton onClick={() => navigate('/attendees-events')}>
                    AttendeeEvents
                </StyledButton>
            </Card>

            <StyledButton onClick={() => navigate('/events')}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default AdminPanelPage;
