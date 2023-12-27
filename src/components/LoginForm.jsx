import {useUserContext} from "../contexts/UserContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {StyledForm, StyledFormButton, StyledFormInput} from "../themes/FormStyles.jsx";
import {ErrorMessage} from "../themes/SharedStyles.jsx";

const LoginForm = () => {
    const navigate = useNavigate();
    const {loginUser} = useUserContext();
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
        setErrorMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(credentials)
            .then(() => {
                navigate('/dashboard'); //TODO Redirect to homepage or dashboard after login
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Login failed. ');
            });
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledFormInput
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
            />
            <StyledFormInput
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <StyledFormButton type="submit">Login</StyledFormButton>
        </StyledForm>
    );
};

export default LoginForm;
