import styled from 'styled-components';
import LogoSVG from '../assets/logo.svg?react';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    text-align: center;
    background-color: ${props => props.theme.colors.background}; // Use theme background color
`;

const Header = styled.header`
    background-color: ${props => props.theme.colors.secondary}; // Use theme secondary color
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledLogo = styled(LogoSVG)`
    max-width: 150px;
    max-height: 150px;
    fill: ${props => props.theme.colors.logoFill}; // Use theme logoFill color
`;

const IntroductionText = styled.p`
    margin-top: 20px;
    font-size: ${props => props.theme.typography.introductionText}; // Use theme typography
`;

const StyledButton = styled.button`
    background-color: ${props => props.theme.colors.primary}; // Use theme primary color
    border: none;
    padding: ${props => props.theme.spacing.small}; // Use theme spacing
    border-radius: ${props => props.theme.borderRadius}; // Use theme border-radius
    cursor: pointer;
    margin-top: ${props => props.theme.spacing.medium}; // Use theme spacing
    color: ${props => props.theme.colors.buttonTextColor}; // Use theme text color
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
        <Container>
            <Header>
                <StyledLogo alt="Logo" />
                <IntroductionText>Welcome to Our Event Management System</IntroductionText>
                <StyledButton onClick={handleExploreEventsButton}>
                    Explore events
                </StyledButton>
                {/*<StyledButton onClick={handleExploreEventsButton}>*/}
                {/*    Your private events*/}
                {/*</StyledButton>*/}
                <StyledButton onClick={handleAboutButton}>
                    About
                </StyledButton>
            </Header>
        </Container>
    );
};

export default HomePage;
