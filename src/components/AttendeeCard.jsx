import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {Card} from "../themes/SharedStyles.jsx";

const AttendeeCardContent = styled.h3`
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
`;

const AttendeeCard = ({ attendee }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/attendees/${attendee.idAttendee}`);
    };

    return (
        <Card onClick={handleClick}>
            <AttendeeCardContent>{attendee.firstName + " " + attendee.lastName}</AttendeeCardContent>
        </Card>
    );
};

AttendeeCard.propTypes = {
    attendee: PropTypes.shape({
        idAttendee: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        attendeeEventDtoList: PropTypes.array.isRequired,
        userDto: PropTypes.shape({
          email: PropTypes.string.isRequired,
          userRole: PropTypes.string.isRequired
        })
    }).isRequired
};

export default AttendeeCard;
