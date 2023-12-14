import styled from 'styled-components';
import LogoSVG from '../assets/logo.svg?react';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    text-align: center;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`;

const StyledLogo = styled(LogoSVG)`
    max-width: 150px;
    max-height: 150px;
    fill: white;
`;

const IntroductionText = styled.p`
    margin-top: 20px;
`;

const ExploreButton = styled.button`
    background-color: #61dafb;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
`;

const HomePage = () => {

    const navigate = useNavigate();

    const handleExploreEventsButton = () => {
        navigate('/events');
    };

    return (
        <Container>
            <Header>
                <StyledLogo alt="Logo" />
                <IntroductionText>Welcome to Our Event Management System</IntroductionText>
                <ExploreButton onClick={handleExploreEventsButton}>
                    Explore events
                </ExploreButton>
            </Header>
        </Container>
    );
};

export default HomePage;
