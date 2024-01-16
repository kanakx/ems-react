import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Card} from "../themes/SharedStyles.jsx";
import {StyledFormSelect} from "../themes/FormStyles.jsx";
import {useState} from "react";

// TODO generic name in shared styles (the same in all 3 entities)
const AttendeeEventCardContent = styled.h3`
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
`;

const SelectHorizontalGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const AttendeeEventCard = ({ attendeeEvent, allAttendees, allEvents, onChange, index }) => {
    const [localAttendeeEvent, setLocalAttendeeEvent] = useState(attendeeEvent);

    const handleChange = (e) => {
        const updatedAttendeeEvent = { ...localAttendeeEvent, [e.target.name]: e.target.value };
        setLocalAttendeeEvent(updatedAttendeeEvent);
        onChange(updatedAttendeeEvent, index);
    };

    return (
        <Card>
            <AttendeeEventCardContent>
                <SelectHorizontalGroup>
                    <StyledFormSelect
                        name="userEmail"
                        value={localAttendeeEvent.userEmail}
                        onChange={handleChange}
                    >
                        {allAttendees.map(attendee => (
                            <option key={attendee.userDto.email} value={attendee.userDto.email}>{attendee.userDto.email}</option>
                        ))}
                    </StyledFormSelect>

                    <StyledFormSelect
                        name="eventName"
                        value={localAttendeeEvent.eventName}
                        onChange={handleChange}
                    >
                        {allEvents.map(event => (
                            <option key={event.name} value={event.name}>{event.name}</option>
                        ))}
                    </StyledFormSelect>
                </SelectHorizontalGroup>
            </AttendeeEventCardContent>
        </Card>
    );
};

AttendeeEventCard.propTypes = {
    attendeeEvent: PropTypes.shape({
        idAttendeeEvent: PropTypes.number.isRequired,
        userEmail: PropTypes.string.isRequired,
        eventName: PropTypes.string.isRequired,
    }).isRequired
};

export default AttendeeEventCard;
