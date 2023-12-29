import {useState} from "react";
import PropTypes from "prop-types";
import {ActionButtonsGroup} from "../themes/SharedStyles.jsx";
import {FaCheck, FaTimes} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {
    FormLabel,
    StyledForm,
    StyledFormButton,
    StyledFormInput,
    StyledFormSelect,
    StyledFormTextArea
} from "../themes/FormStyles.jsx";
import {toast} from "react-toastify";

const EventForm = ({ onSubmit, initialEvent = {} }) => {
    const navigate = useNavigate();

    const [event, setEvent] = useState(initialEvent || {
        name: '',
        startTimestamp: '',
        endTimestamp: '',
        locationName: '',
        type: '',
        description: '',
    });

    const handleChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!event.name || !event.startTimestamp || !event.endTimestamp || !event.locationName || !event.type) {
            toast.warning('Please fill out all fields.');
            return;
        }
        onSubmit(event);
    };

    const handleCancelButton = () => {
      navigate('/events');
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledFormInput type="text" name="name" placeholder="Name" value={event.name} onChange={handleChange}/>

            <StyledFormSelect name="type" value={event.type} onChange={handleChange}>
                <option value="">Type</option>
                <option value="CONFERENCE">CONFERENCE</option>
                <option value="SEMINAR">SEMINAR</option>
                <option value="WORKSHOP">WORKSHOP</option>
                <option value="EXHIBITION">EXHIBITION</option>
                <option value="FESTIVAL">FESTIVAL</option>
                <option value="MEETUP">MEETUP</option>
            </StyledFormSelect>

            <FormLabel htmlFor="startTimestamp">Start timestamp:</FormLabel>
            <StyledFormInput type="datetime-local" name="startTimestamp" placeholder="Start Date"
                             value={event.startTimestamp} onChange={handleChange}/>

            <FormLabel htmlFor="startTimestamp">End timestamp:</FormLabel>
            <StyledFormInput type="datetime-local" name="endTimestamp" placeholder="End Date" value={event.endTimestamp}
                             onChange={handleChange}/>

            <StyledFormInput type="text" name="locationName" placeholder="Location" value={event.locationName}
                             onChange={handleChange}/>

            <StyledFormTextArea name="description" placeholder="Description" value={event.description}
                                onChange={handleChange}/>

            <ActionButtonsGroup>
                <StyledFormButton type="button" onClick={handleCancelButton}>
                    <FaTimes/>
                </StyledFormButton>
                <StyledFormButton type="submit">
                    <FaCheck/>
                </StyledFormButton>
            </ActionButtonsGroup>
        </StyledForm>
    );
};

EventForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialEvent: PropTypes.object
};

export default EventForm;
