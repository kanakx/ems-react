import {useNavigate} from "react-router-dom";
import EventForm from "../components/EventForm.jsx";
import {saveEvent} from "../services/eventService.js";
import {PageTitle} from "../themes/SharedStyles.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {toast} from "react-toastify";

const AddEventPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (newEventData) => {
        saveEvent(newEventData)
            .then(() => {
                toast.success('Event saved successfully!');
                setTimeout(() => navigate('/events'), 2000);
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
