import styled from 'styled-components';
import LogoSVG from '../assets/logoGray.svg?react';
import {useNavigate} from "react-router-dom";
import {PageLayout, StyledButton} from "../components/SharedComponents.jsx";


//TODO page title close to logo and further from buttons


const StyledLogo = styled(LogoSVG)`
    //fill: ${props => props.theme.colors.logoFill};
    max-width: 150px;
    max-height: 150px;
    //margin-bottom: ${props => props.theme.spacing.small};
    margin: -20px;
`;

const Header = styled.p`
    font-size: ${props => props.theme.typography.header};
    margin-bottom: ${props => props.theme.spacing.medium};
`;

const HomePage = () => {

    const navigate = useNavigate();

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
