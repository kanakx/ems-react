import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import EventForm from "../components/EventForm";
import {getEventById, updateEventById} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import {PageTitle} from "../themes/SharedStyles.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {toast} from "react-toastify";

const EditEventPage = () => {
    const { idEvent } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        getEventById(idEvent)
            .then(fetchedEvent => setEventData(fetchedEvent))
    }, [idEvent]);

    const handleSubmit = (updatedEventData) => {
        updateEventById(idEvent, updatedEventData)
            .then(() => {
                toast.success('Event updated successfully!');
                setTimeout(() => navigate('/events'), 2000);
            });
    };

    const handleBackButton = () => {
        navigate('/events');
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
