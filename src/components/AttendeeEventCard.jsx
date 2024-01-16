import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Card, CardContent, StyledButton} from "../themes/SharedStyles.jsx";
import {StyledFormSelect} from "../themes/FormStyles.jsx";
import {useState} from "react";

const SelectHorizontalGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const AttendeeEventCard = ({ attendeeEvent, allAttendees, allEvents, onSave }) => {
    const currentAttendeeEmail = allAttendees.find(a => a.id === attendeeEvent.idAttendee)?.userDto.email || '';
    const currentEventName = allEvents.find(e => e.id === attendeeEvent.idEvent)?.name || '';

    const [currentAttendeeEvent, setCurrentAttendeeEvent] = useState({
        ...attendeeEvent,
        userEmail: currentAttendeeEmail,
        eventName: currentEventName
    });

    const handleChange = (e) => {
        if (e.target.name === "attendeeDto") {
            setCurrentAttendeeEvent(prevState => ({ ...prevState, idAttendee: parseInt(e.target.value, 10) }));
        } else if (e.target.name === "eventDto") {
            setCurrentAttendeeEvent(prevState => ({ ...prevState, idEvent: parseInt(e.target.value, 10) }));
        } else if (e.target.name === "status") {
            setCurrentAttendeeEvent(prevState => ({ ...prevState, status: e.target.value }));
        }
    };

    return (
        <Card>
            <CardContent>
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

                    <StyledFormSelect
                        name="status"
                        value={currentAttendeeEvent.status}
                        onChange={handleChange}
                    >
                        <option value={currentAttendeeEvent.status}>{currentAttendeeEvent.status}</option>
                        {currentAttendeeEvent.status === 'ACCEPTED' ? (
                            <option value="DECLINED">DECLINED</option>
                        ) : (
                            <option value="ACCEPTED">ACCEPTED</option>
                        )}

                    </StyledFormSelect>
                </SelectHorizontalGroup>
                <StyledButton onClick={() => onSave(currentAttendeeEvent.idAttendeeEvent, {
                    idAttendeeEvent: currentAttendeeEvent.idAttendeeEvent,
                    idAttendee: currentAttendeeEvent.idAttendee,
                    idEvent: currentAttendeeEvent.idEvent,
                    status: currentAttendeeEvent.status
                })}>
                    Save
                </StyledButton>

            </CardContent>
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
