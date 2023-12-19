import {useUserContext} from "../contexts/UserContext.jsx";
import {useState} from "react";
import {StyledButton} from "../themes/SharedStyles.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

// const Input = styled.input`
//     padding: ${props => props.theme.spacing.small};
//     border: ${props => props.theme.borders.border};
//     border-radius: ${props => props.theme.borders.borderRadius};
//     color: ${props => props.theme.colors.text};
// `;


const Form = styled.form`
    background-color: ${props => props.theme.colors.background};
    padding: ${props => props.theme.spacing.medium};
    border-radius: ${props => props.theme.borders.borderRadius};
    margin: ${props => props.theme.spacing.medium} auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    min-width: 18rem;
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormInput = styled.input`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    text-align: center;
    width: 100%;
`;

const FormTextArea = styled.textarea`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    text-align: center;
    width: 100%;
    height: 10rem;
    resize: vertical;
`;

const FormButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.buttonTextColor};
    padding: ${props => props.theme.spacing.small};
    border-radius: ${props => props.theme.borders.borderRadius};
    margin-top: ${props => props.theme.spacing.small};
    border: none;
    cursor: pointer;
`;


const LoginForm = () => {
    const navigate = useNavigate();
    const {loginUser} = useUserContext();
    const [credentials, setCredentials] = useState({email: '', password: ''});

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

    return (
            <Form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <FormButton type="submit">Login</FormButton>
            </Form>
    );
};

export default LoginForm;
