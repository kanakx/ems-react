import {useState} from "react";
import PropTypes from "prop-types";
import {ActionButtonsGroup, ErrorMessage} from "../themes/SharedStyles.jsx";
import {FaCheck, FaTimes} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {StyledForm, StyledFormButton, StyledFormInput, StyledFormTextArea} from "../themes/FormStyles.jsx";

const EventForm = ({ onSubmit, initialEvent = {} }) => {
    const navigate = useNavigate();

    const [event, setEvent] = useState(initialEvent || {
        name: '',
        date: '',
        location: '',
        type: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Clears error message when user starts writing
    const handleChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value});
        setErrorMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!event.name || !event.date || !event.location) {
            setErrorMessage('Please fill out all fields.');
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
                <StyledFormInput type="date" name="date" placeholder="Date" value={event.date} onChange={handleChange}/>
                <StyledFormInput type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange}/>
                <StyledFormInput type="text" name="type" placeholder="Type" value={event.type} onChange={handleChange}/>
                <StyledFormTextArea name="description" placeholder="Description" value={event.description} onChange={handleChange}/>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
