import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Card, StyledButton} from "../themes/SharedStyles.jsx";
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

const AttendeeEventCard = ({ attendeeEvent, allAttendees, allEvents, onSave }) => {
    const currentAttendeeEmail = allAttendees.find(a => a.id === attendeeEvent.idAttendee)?.userDto.email || null;
    const currentEventName = allEvents.find(e => e.id === attendeeEvent.idEvent)?.name || null;

    console.log(attendeeEvent)
    console.log(allAttendees)
    console.log(allEvents)
    const [currentAttendeeEvent, setCurrentAttendeeEvent] = useState({
        ...attendeeEvent,
        userEmail: currentAttendeeEmail,
        eventName: currentEventName
    });


    const handleChange = (e) => {
        setCurrentAttendeeEvent({ ...currentAttendeeEvent, [e.target.name]: e.target.value });
    };

    return (
        <Card>
            <AttendeeEventCardContent>
                <SelectHorizontalGroup>
                    <StyledFormSelect
                        name="attendeeDto"
                        value={currentAttendeeEvent.idAttendee}
                        onChange={handleChange}
                    >
                        {allAttendees.map(attendee => (
                            <option key={attendee.idAttendee} value={attendee.idAttendee}>
                                {attendee.userDto.email}
                            </option>
                        ))}
                    </StyledFormSelect>

                    <StyledFormSelect
                        name="eventDto"
                        value={currentAttendeeEvent.idEvent}
                        onChange={handleChange}
                    >
                        {allEvents.map(event => (
                            <option key={event.idEvent} value={event.idEvent}>
                                {event.name}
                            </option>
                        ))}
                    </StyledFormSelect>
                </SelectHorizontalGroup>
                <StyledButton onClick={() => onSave(currentAttendeeEvent)}>
                    Save
                </StyledButton>
            </AttendeeEventCardContent>
        </Card>
    );
};


AttendeeEventCard.propTypes = {
    attendeeEvent: PropTypes.shape({
        idAttendeeEvent: PropTypes.number.isRequired,
        idAttendee: PropTypes.number.isRequired,
        idEvent: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired,
    allAttendees: PropTypes.array.isRequired,
    allEvents: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired
};

export default AttendeeEventCard;
