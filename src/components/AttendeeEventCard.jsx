import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {Card} from "../themes/SharedStyles.jsx";

// TODO generic name in shared styles (the same in all 3 entities)
const AttendeeEventCardContent = styled.h3`
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
`;

const AttendeeEventCard = ({ attendeeEvent }) => {
    const navigate = useNavigate();

    //TODO maybe here there is no need to create separate service... Just use those already existing to compose data?
    const handleClick = () => {
        navigate(`/attendeesEvents/${attendeeEvent.idAttendeeEvent}`);
    };

    return (
        <Card onClick={handleClick}>
            <AttendeeEventCardContent>{'ATTENDEE EVENT INFO HERE'}</AttendeeEventCardContent>
        </Card>
    );
};

AttendeeEventCard.propTypes = {
    attendee: PropTypes.shape({
        idAttendee: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        attendeeEventDtoList: PropTypes.array.isRequired,
        userDto: PropTypes.shape({
            idUser: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired,
            userRole: PropTypes.string.isRequired
        })
    }).isRequired
};

export default AttendeeEventCard;
