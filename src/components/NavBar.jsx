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
    const isOnLoginPage = location.pathname === '/login';
    const isOnRegisterPage = location.pathname === '/register';

    return (
        <StyledNavBar>
            {isAuth && attendee ? (
                <>
                    {isAdmin && <NavBarButton buttonText="Admin Panel" onClick={() => navigate('/admin')} />}
                    <NavBarButton buttonText={attendee.firstName} onClick={() => navigate(`/attendees/profile/${attendee.idAttendee}`)}/>
                    <NavBarButton buttonText="Sign Out" onClick={logoutUser} />
                </>
            ) : (
                !(isOnLoginPage || isOnRegisterPage) && <NavBarButton buttonText="Sign In" onClick={() => navigate('/login')} />
            )}
        </StyledNavBar>
    );
};

export default NavBar;
