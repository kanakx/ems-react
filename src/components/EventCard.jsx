import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useState} from "react";
import {ActionButtonsGroup, StyledButton} from "../themes/SharedStyles.jsx";
import {FaEdit, FaTrashAlt} from "react-icons/fa";

const Card = styled.div`
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    background-color: ${props => props.theme.colors.background};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 25rem;
    cursor: pointer;
    text-align: center;
`;

const EventName = styled.h3`
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
`;

const EventDetails = styled.div`
    display: ${props => props['$show'] ? 'flex' : 'none'};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.text};
    align-items: center;
    flex-direction: column;
`;

const EventCard = ({event, onEdit, onDelete}) => {
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

                <ActionButtonsGroup>
                    <StyledButton onClick={() => onDelete(event.id)}>
                        <FaTrashAlt/>
                    </StyledButton>
                    <StyledButton onClick={() => onEdit(event.id)}>
                        <FaEdit/>
                    </StyledButton>
                </ActionButtonsGroup>
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
