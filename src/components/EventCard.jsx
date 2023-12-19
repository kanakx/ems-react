import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

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
    //width: 100%;
`;

const EventName = styled.h3`
    color: ${props => props.theme.colors.primary};
     margin-bottom: ${props => props.theme.spacing.small};
`;

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <Card onClick={handleClick}>
            <EventName>{event.name}</EventName>
        </Card>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default EventCard;
