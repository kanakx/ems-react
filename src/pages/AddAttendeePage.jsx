import {useNavigate} from "react-router-dom";
import {PageTitle} from "../themes/SharedStyles.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {toast} from "react-toastify";
import {saveAttendee} from "../services/attendeeService.js";
import AttendeeForm from "../components/AttendeeForm.jsx";

const AddAttendeePage = () => {
    const navigate = useNavigate();

    const handleSubmit = (newAttendeeData) => {
        saveAttendee(newAttendeeData)
            .then(() => {
                toast.success('Attendee saved successfully!');
                setTimeout(() => navigate('/attendees'), 2000);
            });
    };

    return (
        <PageLayout>
            <PageTitle>Add new</PageTitle>
            <AttendeeForm onSubmit={handleSubmit} initialEvent={null} />
        </PageLayout>
    );
}

export default AddAttendeePage;
