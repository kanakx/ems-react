import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import NavBarButton from "./NavBarButton.jsx";
import {useNavigate, useParams} from "react-router-dom";

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
    const { isAuth, user, logout } = useUserContext();

    const handleUserProfileButtonClick = () => {
        navigate(`/attendees/profile/${user.idAttendee}`);
    };

    const handleSignInButtonClick = () => {
        navigate('/login');
    };

    return (
        <StyledNavBar>
            {isAuth && user ? (
                <>
                    <NavBarButton buttonText={user.fullName} onClick={handleUserProfileButtonClick}/>
                    <NavBarButton buttonText="Sign Out" onClick={logout} />
                </>
            ) : (
                <NavBarButton buttonText="Sign In" onClick={handleSignInButtonClick} />
            )}
        </StyledNavBar>
    );
};

export default NavBar;
