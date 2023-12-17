import styled from 'styled-components';
import {useState} from "react";
import PropTypes from "prop-types";

const PageTitle = styled.h1`
    margin-top: ${props => props.theme.spacing.medium};
    margin-bottom: ${props => props.theme.spacing.large};
`;

const Form = styled.form`
    background-color: ${props => props.theme.colors.background};
    padding: ${props => props.theme.spacing.medium};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 25rem;
    margin: ${props => props.theme.spacing.medium} auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormInput = styled.input`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    border: 1px solid #ddd;
    border-radius: ${props => props.theme.borderRadius};
    width: 100%;
`;

const FormButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.buttonTextColor};
    border: none;
    padding: ${props => props.theme.spacing.small};
    border-radius: ${props => props.theme.borderRadius};
    cursor: pointer;
    margin-top: ${props => props.theme.spacing.small};
`;

const ErrorMessage = styled.p`
    color: ${props => props.theme.colors.error};
    font-size: 0.8em;
`;

const EventForm = ({ onSubmit, initialEvent = {} }) => {
    const [event, setEvent] = useState(initialEvent || {
        name: '',
        date: '',
        location: '',
        type: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value});
        setErrorMessage(''); // Clear error message when user starts typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate fields
        if (!event.name || !event.date || !event.location) {
            setErrorMessage('Please fill out all fields.');
            return;
        }
        onSubmit(event);
    };

    return (
        <>
            <PageTitle>Event details</PageTitle>
            <Form onSubmit={handleSubmit}>
                <FormInput type="text" name="name" placeholder="Name" value={event.name} onChange={handleChange}/>
                <FormInput type="date" name="date" placeholder="Date" value={event.date} onChange={handleChange}/>
                <FormInput type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange}/>
                <FormInput type="text" name="type" placeholder="Type" value={event.type} onChange={handleChange}/>
                <FormInput type="text" name="description" placeholder="Description" value={event.description} onChange={handleChange}/>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <FormButton type="submit">Save Event</FormButton>
            </Form>
        </>
    );
};

EventForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialEvent: PropTypes.object
};

export default EventForm;
