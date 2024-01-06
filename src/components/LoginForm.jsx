import {useUserContext} from "../contexts/UserContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {StyledForm, StyledFormButton, StyledFormInput} from "../themes/FormStyles.jsx";
import {toast} from "react-toastify";

const LoginForm = () => {
    const navigate = useNavigate();
    const {loginUser} = useUserContext();
    const [credentials, setCredentials] = useState({email: '', password: ''});

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(credentials)
            .then(() => {
                navigate('/events');
                toast.success('Login successful.');
            })
            .catch(error => {
                console.error(error);
                toast.error('Login failed. ');
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
            <StyledFormButton type="submit">Confirm</StyledFormButton>
        </StyledForm>
    );
};

export default LoginForm;
