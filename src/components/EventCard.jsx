import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {Card, CardContent} from "../themes/SharedStyles.jsx";

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.idEvent}`);
    };

    return (
        <Card onClick={handleClick}>
            <CardContent>{event.name}</CardContent>
        </Card>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        idEvent: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        startTimestamp: PropTypes.string.isRequired,
        endTimestamp: PropTypes.string.isRequired,
        locationName: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default EventCard;
