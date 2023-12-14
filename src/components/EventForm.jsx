import styled from 'styled-components';
import {useState} from "react";

const PageTitle = styled.h1`
    margin-top: 20px;
    margin-bottom: 30px;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const FormButton = styled.button`
  background-color: #61dafb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8em;
`;

const EventForm = ({ onSubmit, initialEvent = {} }) => {
    const [event, setEvent] = useState(initialEvent);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
        setError(''); // Clear error message when user starts typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate fields
        if (!event.name || !event.date || !event.location) {
            setError('Please fill out all fields.');
            return;
        }
        onSubmit(event);
    };

    return (
        <>
            <PageTitle>New event</PageTitle>
            <Form onSubmit={handleSubmit}>
                <FormInput type="text" name="name" placeholder="Event Name" value={event.name || ''} onChange={handleChange} />
                <FormInput type="date" name="date" placeholder="Event Date" value={event.date || ''} onChange={handleChange} />
                <FormInput type="text" name="location" placeholder="Event Location" value={event.location || ''} onChange={handleChange} />
                <FormInput type="select" name="type" placeholder="Event Type" value={event.type || ''} onChange={handleChange} />
                <FormInput type="text" name="description" placeholder="Event Description" value={event.description || ''} onChange={handleChange} />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <FormButton type="submit">Save Event</FormButton>
            </Form>
        </>
    );
};

export default EventForm;
