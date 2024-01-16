import PageLayout from "../components/PageLayout.jsx";
import {PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useState} from "react";
import PasswordChangeForm from "../components/PasswordChangeForm.jsx";
import {useNavigate} from "react-router-dom";

const UserProfilePage = () => {
    const navigate = useNavigate();
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const togglePasswordFormVisibility = () => {
        setShowPasswordForm(!showPasswordForm);
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <PageLayout>
            <PageTitle>Attendee Profile</PageTitle>
            {!showPasswordForm && (
                <StyledButton onClick={togglePasswordFormVisibility}>
                    Change Password
                </StyledButton>
            )}
            {showPasswordForm && (
                <PasswordChangeForm onFormClose={togglePasswordFormVisibility} />
            )}

            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default UserProfilePage;
