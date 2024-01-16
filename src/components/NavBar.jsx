import styled from "styled-components";
import {useUserContext} from "../contexts/UserContext.jsx";
import NavBarButton from "./NavBarButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const StyledNavBar = styled.nav`
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
`;

const RightSideWrapper = styled.div`
    display: flex;
    gap: 1rem; // Add gap between buttons
`;

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, isAdmin, attendee, logoutUser } = useUserContext();
    const isOnLoginPage = location.pathname === '/login';
    const isOnRegisterPage = location.pathname === '/register';

    return (
        <StyledNavBar>
            {isAdmin && <NavBarButton buttonText="Admin Panel" onClick={() => navigate('/admin')} />}
            <RightSideWrapper> {/* Use the RightSideWrapper here */}
                {isAuth && attendee ? (
                    <>
                        <NavBarButton buttonText={attendee.firstName} onClick={() => navigate(`/attendees/profile/${attendee.idAttendee}`)}/>
                        <NavBarButton buttonText="Sign Out" onClick={logoutUser} />
                    </>
                ) : (
                    !(isOnLoginPage || isOnRegisterPage) && <NavBarButton buttonText="Sign In" onClick={() => navigate('/login')} />
                )}
            </RightSideWrapper>
        </StyledNavBar>
    );
};

export default NavBar;
