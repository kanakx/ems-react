import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import NavBarButton from "./NavBarButton.jsx";
import {useNavigate} from "react-router-dom";

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
    const { isAuth, attendee, logout } = useUserContext();

    const handleUserProfileButtonClick = () => {
        navigate(`/attendees/profile/${attendee.idAttendee}`);
    };

    const handleSignInButtonClick = () => {
        navigate('/login');
    };

    return (
        <StyledNavBar>
            {isAuth && attendee ? (
                <>
                    <NavBarButton buttonText={attendee.fullName} onClick={handleUserProfileButtonClick}/>
                    <NavBarButton buttonText="Sign Out" onClick={logout} />
                </>
            ) : (
                <NavBarButton buttonText="Sign In" onClick={handleSignInButtonClick} />
            )}
        </StyledNavBar>
    );
};

export default NavBar;
