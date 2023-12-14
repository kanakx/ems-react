import EventCard from './EventCard';
import PropTypes from "prop-types";

const EventList = ({events}) => {

    return (
        <div>
            {events.map(event => (
                <EventCard key={event.id} event={event}/>
            ))}
        </div>
    );

};

EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventList;
