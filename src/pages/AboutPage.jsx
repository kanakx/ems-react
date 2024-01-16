import styled from 'styled-components';
import PageLayout from "../components/PageLayout.jsx";
import {Card, CardContent, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";

const AboutContainer = styled(Card)`
    width: 80%;
    max-width: 800px;
    margin: ${props => props.theme.spacing.medium} auto;
    padding: ${props => props.theme.spacing.medium};
`;

const Paragraph = styled.p`
    margin-bottom: ${props => props.theme.spacing.medium};
`;

const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <AboutContainer>

                <PageTitle>Event Management System</PageTitle>
                <Paragraph>
                    Welcome to our Event Management System (EMS), a comprehensive solution designed to streamline the
                    organization and management of events. Our system provides a user-friendly platform for event
                    organizers, attendees, and vendors.
                </Paragraph>

                <CardContent>
                    <p>Key features</p>
                </CardContent>

                <p>CRUD operations</p>
                <p>Attendee registration and management</p>
                <p>Seamless administration</p>

            </AboutContainer>

            <StyledButton onClick={() => navigate('/')}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default AboutPage;
