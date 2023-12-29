import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import EventForm from "../components/EventForm";
import {getEventById, updateEventById} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import {PageTitle} from "../themes/SharedStyles.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {toast} from "react-toastify";

const EditEventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        getEventById(eventId)
            .then(fetchedEvent => setEventData(fetchedEvent))
    }, [eventId]);

    const handleSubmit = (updatedEventData) => {
        updateEventById(eventId, updatedEventData)
            .then(() => {
                toast.success('Event updated successfully!');
                setTimeout(() => navigate('/events'), 2000);
            });
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    if (!eventData) return <Loading onBack={handleBackButton} />;

    return (
        <PageLayout>
            <PageTitle>Event details</PageTitle>
            <EventForm onSubmit={handleSubmit} initialEvent={eventData} />
        </PageLayout>
    );
};

export default EditEventPage;
