import { useUserContext } from "../contexts/UserContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledForm, StyledFormButton, StyledFormInput } from "../themes/FormStyles.jsx";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { registerUser } = useUserContext();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(userInfo)
            .then(() => {
                navigate('/events');
                toast.success('Registration successful.');
            })
            .catch(error => {
                console.error(error);
                toast.error('Registration failed.');
            });
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledFormInput
                type="text"
                name="firstName"
                placeholder="First Name"
                value={userInfo.firstName}
                onChange={handleChange}
                required
            />
            <StyledFormInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={userInfo.lastName}
                onChange={handleChange}
                required
            />
            <StyledFormInput
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleChange}
                required
            />
            <StyledFormInput
                type="password"
                name="password"
                placeholder="Password"
                value={userInfo.password}
                onChange={handleChange}
                required
            />
            <StyledFormButton type="submit">Register</StyledFormButton>
        </StyledForm>
    );
};

export default RegisterForm;
