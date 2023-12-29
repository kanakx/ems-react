import {useNavigate} from 'react-router-dom';
import {PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import LoginForm from "../components/LoginForm.jsx";
import {useState} from "react";
import PageLayout from "../components/PageLayout.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState('');

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <PageLayout>
            {notification.message && <Notification message={notification.message} type={notification.type}/>}
            <PageTitle>Login</PageTitle>
            <LoginForm/>
            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default LoginPage;
