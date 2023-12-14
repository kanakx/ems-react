import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useState} from "react";

// Styled components
const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    max-width: 400px;
    cursor: pointer; // Added for better user indication
`;

const EventName = styled.h3`
    color: #333;
    margin-bottom: 5px;
`;

const EventDetails = styled.div`
    display: ${props => props['$show'] ? 'block' : 'none'};
    color: #666;
    font-size: 0.9em;
`;

const EventCard = ({ event }) => {
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
    }).isRequired
};

export default EventCard;
