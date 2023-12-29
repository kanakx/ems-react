import {StyledForm, StyledFormButton, StyledFormInput} from "../themes/FormStyles.jsx";
import {useState} from "react";
import {ActionButtonsGroup} from "../themes/SharedStyles.jsx";
import {FaCheck, FaTimes} from "react-icons/fa";
import {toast} from "react-toastify";
import PropTypes from "prop-types";

const PasswordChangeForm = ({onFormClose}) => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            toast.warning('New passwords do not match.');
        }
        //TODO Add logic here for password update API call
    };

    const handleCancelButton = () => {
        onFormClose();
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledFormInput
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwords.currentPassword}
                onChange={handleChange}
                required
            />
            <StyledFormInput
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handleChange}
                required
            />
            <StyledFormInput
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={passwords.confirmNewPassword}
                onChange={handleChange}
                required
            />
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

PasswordChangeForm.propTypes = {
  onFormClose: PropTypes.func.isRequired
};

export default PasswordChangeForm;
