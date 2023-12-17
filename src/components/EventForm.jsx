import styled from 'styled-components';
import {useState} from "react";
import PropTypes from "prop-types";
import {PageTitle} from "./SharedComponents.jsx";

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

    // Clears error message when user starts writing
    const handleChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value});
        setErrorMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <FormTextArea name="description" placeholder="Description" value={event.description} onChange={handleChange}/>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <FormButton type="submit">Save</FormButton>
            </Form>
        </>
    );
};

EventForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialEvent: PropTypes.object
};

export default EventForm;
