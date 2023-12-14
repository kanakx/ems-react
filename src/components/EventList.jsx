import EventCard from './EventCard';
import PropTypes from "prop-types";

const EventList = ({events, onEdit, onDelete}) => {

    return (
        <div>
            {events.map(event => (
                <EventCard
                    key={event.id}
                    event={event}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );

};

EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default EventList;
