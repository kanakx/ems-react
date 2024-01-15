import {useState} from "react";
import PropTypes from "prop-types";
import {ActionButtonsGroup} from "../themes/SharedStyles.jsx";
import {FaCheck, FaTimes} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {StyledForm, StyledFormButton, StyledFormInput, StyledFormSelect} from "../themes/FormStyles.jsx";
import {toast} from "react-toastify";

const AttendeeForm = ({ onSubmit, initialEvent = {} }) => {
    const navigate = useNavigate();

    const [addAttendeeDto, setAddAttendeeDto] = useState(initialEvent || {
        firstName: '',
        lastName: '',
        email: '',
        userRole: '',
    });

    const handleChange = (e) => {
        setAddAttendeeDto({...addAttendeeDto, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!addAttendeeDto.name || !addAttendeeDto.startTimestamp || !addAttendeeDto.endTimestamp || !addAttendeeDto.locationName || !addAttendeeDto.type) {
            toast.warning('Please fill out all fields.');
            return;
        }
        onSubmit(addAttendeeDto);
    };

    //TODO path to admin panel attendees
    const handleCancelButton = () => {
        navigate('/');
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledFormInput type="text" name="firstName" placeholder="First name" value={addAttendeeDto.firstName} onChange={handleChange}/>

            <StyledFormInput type="text" name="lastName" placeholder="Last name" value={addAttendeeDto.lastName} onChange={handleChange}/>

            <StyledFormInput type="text" name="email" placeholder="Email" value={addAttendeeDto.userDto.email} onChange={handleChange}/>

            <StyledFormSelect name="type" value={addAttendeeDto.type} onChange={handleChange}>
                <option value="">User role</option>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
            </StyledFormSelect>

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

AttendeeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialEvent: PropTypes.object
};

export default AttendeeForm;
