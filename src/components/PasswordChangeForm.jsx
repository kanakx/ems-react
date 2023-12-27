import {StyledForm, StyledFormButton, StyledFormInput} from "../themes/FormStyles.jsx";
import Notification from "./Notification.jsx";
import {useState} from "react";
import {ActionButtonsGroup} from "../themes/SharedStyles.jsx";
import {FaCheck, FaTimes} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.jsx";

const PasswordChangeForm = ({onFormClose}) => {
    const navigate = useNavigate();
    const {user} = useUserContext();
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [notification, setNotification] = useState({message: '', type: ''});

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            setNotification({message: 'New passwords do not match.', type: 'error'});
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
            {notification.message && (
                <Notification message={notification.message} type={notification.type}/>
            )}
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

export default PasswordChangeForm;
