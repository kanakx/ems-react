import EventCard from './EventCard';
import PropTypes from "prop-types";
import styled from "styled-components";

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventList = ({events, onEdit, onDelete}) => {
    return (
        <EventListContainer>
            {events.map(event => (
                <EventCard
                    key={event.id}
                    event={event}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </EventListContainer>
    );

};

EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default EventList;
