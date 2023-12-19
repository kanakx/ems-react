import { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useUserContext} from '../contexts/UserContext';
import {PageLayout, PageTitle, StyledButton} from "../themes/SharedStyles.jsx";

const LoginContainer = styled.div`
    width: 90%;
    max-width: 20rem; // Using rem for scalable sizing
    margin: 2rem auto; // Using rem for scalable margin
    text-align: center;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.medium};
`;

const Input = styled.input`
    padding: ${props => props.theme.spacing.small};
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    color: ${props => props.theme.colors.text};
`;

const LoginPage = () => {
    const navigate = useNavigate();
    const { loginUser } = useUserContext();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(credentials)
            .then(() => {
                navigate('/dashboard'); // Redirect to homepage or dashboard after login
            })
            .catch(error => {
                console.error(error);
                // Handle login error (e.g., show an error message)
            });
    };

    const handleBackButton = () => {
        navigate('/');
    };

    return (
        <PageLayout>
            <LoginContainer>
                <PageTitle>Login</PageTitle>
                <LoginForm onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <StyledButton type="submit">Login</StyledButton>
                </LoginForm>
                <StyledButton onClick={handleBackButton}>
                    Back
                </StyledButton>
            </LoginContainer>
        </PageLayout>
    );
};

export default LoginPage;
