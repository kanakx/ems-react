import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {updateEventById} from "../services/eventService.js";
import Loading from "../components/Loading.jsx";
import {PageTitle} from "../themes/SharedStyles.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {toast} from "react-toastify";
import {getAttendeeById} from "../services/attendeeService.js";
import AttendeeForm from "../components/AttendeeForm.jsx";

//TODO potentially generic component - pass functions to edit and delete
const EditAttendeePage = () => {
    const {idAttendee} = useParams();
    const navigate = useNavigate();
    const [attendeeData, setAttendeeData] = useState(null);

    useEffect(() => {
        getAttendeeById(idAttendee)
            .then(fetchedAttendee => setAttendeeData(fetchedAttendee))
    }, [idAttendee]);

    const handleSubmit = (updatedAttendeeData) => {
        updateEventById(idAttendee, updatedAttendeeData)
            .then(() => {
                toast.success('Attendee updated successfully!');
                setTimeout(() => navigate('/attendees'), 2000);
            });
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    if (!attendeeData) return <Loading onBack={handleBackButton}/>;

    return (
        <PageLayout>
            <PageTitle>Attendee details</PageTitle>
            <AttendeeForm onSubmit={handleSubmit} initialEvent={attendeeData}/>
        </PageLayout>
    );
};

export default EditAttendeePage;
