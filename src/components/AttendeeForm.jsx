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
        if (!addAttendeeDto.firstName || !addAttendeeDto.lastName || !addAttendeeDto.email || !addAttendeeDto.userRole) {
            toast.warning('Please fill out all fields.');
            return;
        }
        onSubmit(addAttendeeDto);
    };

    const handleCancelButton = () => {
        navigate('/attendees');
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledFormInput type="text" name="firstName" placeholder="First name" value={addAttendeeDto.firstName} onChange={handleChange}/>

            <StyledFormInput type="text" name="lastName" placeholder="Last name" value={addAttendeeDto.lastName} onChange={handleChange}/>

            <StyledFormInput type="text" name="email" placeholder="Email" value={addAttendeeDto.email} onChange={handleChange}/>

            <StyledFormSelect name="userRole" value={addAttendeeDto.userRole} onChange={handleChange}>
                <option value={addAttendeeDto.userRole}>{addAttendeeDto.userRole}</option>
                {addAttendeeDto.userRole === 'USER' ? (
                    <option value="ADMIN">ADMIN</option>
                ) : (
                    <option value="USER">USER</option>
                )}
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
