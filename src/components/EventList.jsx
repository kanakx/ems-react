import EventCard from './EventCard';
import PropTypes from "prop-types";
import styled from "styled-components";

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventList = ({events}) => {
    return (
            <EventListContainer>
                <>
                    {events.map(event => (
                        <EventCard
                            key={event.idEvent}
                            event={event}
                        />
                    ))}
                </>
            </EventListContainer>
    );

};

EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventList;
