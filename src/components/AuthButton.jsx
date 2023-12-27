import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {StyledButton} from "../themes/SharedStyles.jsx";

const StyledAuthButton = styled(StyledButton)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
`;

const AuthButton = () => {
    const { isAuth, logout } = useUserContext();
    const navigate = useNavigate();

    const handleAuthAction = () => {
        if (isAuth) {
            logout();
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <StyledAuthButton onClick={handleAuthAction}>
            {!isAuth ? 'Sign In' : 'Sign Out'}
        </StyledAuthButton>
    );
};

export default AuthButton;
