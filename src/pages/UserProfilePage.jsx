import PageLayout from "../components/PageLayout.jsx";
import {PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useState} from "react";
import PasswordChangeForm from "../components/PasswordChangeForm.jsx";

const UserProfilePage = () => {
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const togglePasswordFormVisibility = () => {
        setShowPasswordForm(!showPasswordForm);
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
        </PageLayout>
    );
};

export default UserProfilePage;
