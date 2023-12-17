import styled from 'styled-components';
import LogoSVG from '../assets/logoGray.svg?react';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    text-align: center;
    background-color: ${props => props.theme.colors.background};
`;

const Header = styled.header`
    background-color: ${props => props.theme.colors.secondary};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledLogo = styled(LogoSVG)`
    fill: ${props => props.theme.colors.logoFill};
    max-width: 150px;
    max-height: 150px;
`;

const IntroductionText = styled.p`
    font-size: ${props => props.theme.typography.introductionText};
`;

const StyledButton = styled.button`
    color: ${props => props.theme.colors.buttonTextColor};
    background-color: ${props => props.theme.colors.primary};
    padding: ${props => props.theme.spacing.small};
    border-radius: ${props => props.theme.borders.borderRadius};
    margin-top: ${props => props.theme.spacing.medium};
    border: none;
    cursor: pointer;
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
                <IntroductionText>Event Management System</IntroductionText>
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
