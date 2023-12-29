import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {StyledButton} from "../themes/SharedStyles.jsx";

const StyledAuthButton = styled(StyledButton)`
    position: absolute;
    top: 1rem;
    right: 10rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
`;

const UserProfileButton = () => {
    const navigate = useNavigate();
    const { isAuth, user } = useUserContext();

    const handleClick = () => {
        if (isAuth) {
            navigate('/userProfile');
        } else {
            navigate('/login');
        }
    };

    return (
        isAuth && (
            <StyledAuthButton onClick={handleClick}>
                {user.fullName}
            </StyledAuthButton>
        )
    );
};

export default UserProfileButton;
