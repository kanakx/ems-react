import styled from 'styled-components';
import LogoSVG from '../assets/logoGray.svg?react';
import {useNavigate} from "react-router-dom";
import PageLayout from "../components/PageLayout.jsx";
import {PageSubtitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useUserContext} from "../contexts/UserContext.jsx";

const StyledLogo = styled(LogoSVG)`
    max-width: 150px;
    max-height: 150px;
    margin: -20px;
`;

const Header = styled.p`
    font-size: ${props => props.theme.typography.header};
    margin-bottom: ${props => props.theme.spacing.medium};
`;

const HomePage = () => {
    const navigate = useNavigate();
    const {isAuth, attendee} = useUserContext();

    const handleExploreEventsButton = () => {
        navigate('/events');
    };

    const handleAboutButton = () => {
        navigate('/about');
    };

    return (
        <PageLayout>
            <StyledLogo alt="Logo"/>
            <Header>Event Management System</Header>

            {isAuth && attendee && (
                <PageSubtitle>Welcome, {attendee.firstName}</PageSubtitle>
            )}

            <StyledButton onClick={handleExploreEventsButton}>
                Explore events
            </StyledButton>
            <StyledButton onClick={handleAboutButton}>
                About
            </StyledButton>
        </PageLayout>
    );
};

export default HomePage;
