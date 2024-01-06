import {useNavigate} from 'react-router-dom';
import {PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import LoginForm from "../components/LoginForm.jsx";
import PageLayout from "../components/PageLayout.jsx";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleRegisterButton = () => {
      navigate('/register')
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <PageLayout>
            <PageTitle>Log in</PageTitle>
            <LoginForm/>
            <StyledButton onClick={handleRegisterButton}>
                Create account
            </StyledButton>
            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default LoginPage;
