import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import NavBarButton from "./NavBarButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const StyledNavBar = styled.nav`
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, attendee, logoutUser } = useUserContext();

    const handleUserProfileButtonClick = () => {
        navigate(`/attendees/profile/${attendee.idAttendee}`);
    };

    const handleSignInButtonClick = () => {
        navigate('/login');
    };

    const isOnLoginPage = location.pathname === '/login';

    return (
        <StyledNavBar>
            {isAuth && attendee ? (
                <>
                    <NavBarButton buttonText={attendee.firstName} onClick={handleUserProfileButtonClick}/>
                    <NavBarButton buttonText="Sign Out" onClick={logoutUser} />
                </>
            ) : (
                !isOnLoginPage && <NavBarButton buttonText="Sign In" onClick={handleSignInButtonClick} />
            )}
        </StyledNavBar>
    );
};

export default NavBar;
