import {useNavigate} from 'react-router-dom';
import {PageLayout, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import Notification from "../components/Notification.jsx";
import LoginForm from "../components/LoginForm.jsx";
import {useState} from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState('');

    const handleBackButton = () => {
        navigate('/');
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
