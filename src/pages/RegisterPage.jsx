import { useNavigate } from 'react-router-dom';
import { PageTitle, StyledButton } from "../themes/SharedStyles.jsx";
import RegisterForm from "../components/RegisterForm.jsx"; // Make sure to create and import this
import PageLayout from "../components/PageLayout.jsx";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate('/login'); // Navigate to the login page
    };

    const handleBackButton = () => {
        navigate(-1); // Go back in history
    };

    return (
        <PageLayout>
            <PageTitle>Register</PageTitle>
            <RegisterForm/>
            <StyledButton onClick={handleLoginButton}>
                Already have an account?
            </StyledButton>
            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default RegisterPage;
