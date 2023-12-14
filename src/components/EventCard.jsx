import styled from 'styled-components';
import PropTypes from "prop-types";

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    max-width: 400px;
`;

const EventName = styled.h3`
  color: #333;
  margin-bottom: 5px;
`;

const EventInfo = styled.p`
  color: #666;
  margin: 5px 0;
  font-size: 0.9em;
`;

const EventDescription = styled.p`
  color: #444;
  margin-top: 10px;
`;

const EventCard = ({ event }) => {

    return (
        <Card>
            <EventName>{event.name}</EventName>
            <EventInfo>Date: {event.date}</EventInfo>
            <EventInfo>Location: {event.location}</EventInfo>
            <EventInfo>Type: {event.type}</EventInfo>
            <EventDescription>{event.description}</EventDescription>
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
