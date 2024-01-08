import {PageSubtitle, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";
import PageLayout from "../components/PageLayout.jsx";
import EventsPaginator from "../components/EventsPaginator.jsx";

const EventsPage = () => {
    const navigate = useNavigate();
    const {isAuth, attendee} = useUserContext();
    const pageSize = 2;

    const handleAddNewButton = () => {
        navigate('/events/add');
    };

    const handleBackButton = () => {
        navigate('/');
    };

    //TODO maybe some error page or smth?
    if (!attendee) return <div>Please log in to view events</div>

    return (
        <PageLayout>
            <PageTitle>Events</PageTitle>
            <PageSubtitle>You are invited to</PageSubtitle>
            <EventsPaginator pageSize={pageSize}/>

            {!isAuth && <PageSubtitle>Sign in to add events</PageSubtitle>}
            {isAuth && (
                <StyledButton onClick={handleAddNewButton}>
                    Add new
                </StyledButton>
            )}

            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default EventsPage;
