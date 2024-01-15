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
    const { isAuth, isAdmin, attendee, logoutUser } = useUserContext();

    //TODO move from separate function to direct func in component
    const handleUserProfileButtonClick = () => {
        navigate(`/attendees/profile/${attendee.idAttendee}`);
    };

    const handleSignInButtonClick = () => {
        navigate('/login');
    };

    const handleAdminPanelClick = () => {
        navigate('/admin');
    };

    const isOnLoginPage = location.pathname === '/login';
    const isOnRegisterPage = location.pathname === '/register';

    return (
        <StyledNavBar>
            {isAuth && attendee ? (
                <>
                    <NavBarButton buttonText={attendee.firstName} onClick={handleUserProfileButtonClick}/>
                    <NavBarButton buttonText="Sign Out" onClick={logoutUser} />
                    {isAdmin && <NavBarButton buttonText="Admin Panel" onClick={handleAdminPanelClick} />}
                </>
            ) : (
                !(isOnLoginPage || isOnRegisterPage) && <NavBarButton buttonText="Sign In" onClick={handleSignInButtonClick} />
            )}
        </StyledNavBar>
    );
};

export default NavBar;
