import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useState} from "react";

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    max-width: 400px;
    cursor: pointer;
`;

const EventName = styled.h3`
    color: #333;
    margin-bottom: 5px;
`;

const EventDetails = styled.div`
    display: ${props => props['$show'] ? 'flex' : 'none'};
    align-items: center;
    flex-direction: column;
    color: #666;
    font-size: 0.9em;
`;

const StyledButton = styled.button`
    background-color: #61dafb;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
`;

const EventCard = ({ event, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDetails = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card onClick={toggleDetails}>
            <EventName>{event.name}</EventName>
            <EventDetails $show={isExpanded}>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
                <p>Type: {event.type}</p>
                <p>{event.description}</p>

                <StyledButton onClick={() => onEdit(event.id)}>Edit</StyledButton>
                <StyledButton onClick={() => onDelete(event.id)}>Delete</StyledButton>
            </EventDetails>
        </Card>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default EventCard;
