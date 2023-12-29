import {useNavigate} from "react-router-dom";
import EventForm from "../components/EventForm.jsx";
import {saveEvents} from "../services/eventService.js";
import {PageTitle} from "../themes/SharedStyles.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {toast} from "react-toastify";

const AddEventPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (newEventData) => {
        saveEvents(newEventData)
            .then(() => {
                toast.success('Event saved successfully!');
                setTimeout(() => navigate('/events'), 4000);
            })
            .catch(error => {
                console.error('Failed to save event: ', error);
                toast.error('Failed to save event.');
            });
    };

    return (
        <PageLayout>
            <PageTitle>Add new</PageTitle>
            <EventForm onSubmit={handleSubmit} initialEvent={null} />
        </PageLayout>
    );
}

export default AddEventPage;
