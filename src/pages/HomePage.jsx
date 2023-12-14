import styled from 'styled-components';
import LogoSVG from '../assets/logo.svg?react';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    text-align: center;
`;

const Header = styled.header`
    background-color: lightgray;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledLogo = styled(LogoSVG)`
    max-width: 150px;
    max-height: 150px;
    fill: white;
`;

const IntroductionText = styled.p`
    margin-top: 20px;
`;

const StyledButton = styled.button`
    background-color: #565656;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    color: lightgray;
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
