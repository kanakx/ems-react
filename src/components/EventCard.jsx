import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useState} from "react";

const Card = styled.div`
    border: 1px solid #ddd;  // Consider adding a border color to your theme
    border-radius: ${props => props.theme.borders.borderRadius};
    padding: ${props => props.theme.spacing.medium};
    margin: ${props => props.theme.spacing.small} 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.theme.colors.background};
    max-width: 25rem;
    cursor: pointer;
`;

const EventName = styled.h3`
    color: ${props => props.theme.colors.primary};  // Adjust if a different color is needed
    margin-bottom: ${props => props.theme.spacing.small};
`;

const EventDetails = styled.div`
    display: ${props => props['$show'] ? 'flex' : 'none'};
    align-items: center;
    flex-direction: column;
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.text};
`;

const StyledButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    border: none;
    padding: ${props => props.theme.spacing.small};
    border-radius: ${props => props.theme.borders.borderRadius};
    cursor: pointer;
    margin-top: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.buttonTextColor};
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
