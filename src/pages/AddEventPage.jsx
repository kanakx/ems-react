import {useNavigate} from "react-router-dom";
import EventForm from "../components/EventForm.jsx";
import {save} from "../services/eventService.js";
import {PageLayout} from "../themes/SharedStyles.jsx";

const AddEventPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (newEventData) => {
        save(newEventData)
            .then(() => navigate('/events'))
            .catch(error => {
                console.error('Failed to save event: ', error);
                //TODO Message to the user. What happens here?
            });
    };

    return (
        <PageLayout>
            <EventForm onSubmit={handleSubmit}/>
        </PageLayout>);
}

export default AddEventPage;
