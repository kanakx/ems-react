import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useState} from "react";
import {ActionButtonsGroup, StyledButton} from "../themes/SharedStyles.jsx";
import {FaEdit, FaTrashAlt} from "react-icons/fa";

const Card = styled.div`
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    background-color: ${props => props.theme.colors.background};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 25rem;
    cursor: pointer;
    text-align: center;
    //width: 100%;
`;

const EventName = styled.h3`
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
`;

const EventDetails = styled.div`
    display: ${props => props['$show'] ? 'flex' : 'none'};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.text};
    align-items: center;
    flex-direction: column;
`;

const DetailItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
    padding: ${props => props.theme.spacing.xsmall} 0;
`;

const Label = styled.span`
    font-weight: bold;
`;

const Value = styled.span`
    // Styles for the value
`;

const EventCard = ({event, onEdit, onDelete}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDetails = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card onClick={toggleDetails}>
            <EventName>{event.name}</EventName>
            <EventDetails $show={isExpanded}>
                <DetailItem>
                    <Label>Date:</Label>
                    <Value>{event.date}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Location:</Label>
                    <Value>{event.location}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Type:</Label>
                    <Value>{event.type}</Value>
                </DetailItem>
                <DetailItem>
                    <Value>{event.description}</Value>
                </DetailItem>


                <ActionButtonsGroup>
                    <StyledButton onClick={() => onDelete(event.id)}>
                        <FaTrashAlt/>
                    </StyledButton>
                    <StyledButton onClick={() => onEdit(event.id)}>
                        <FaEdit/>
                    </StyledButton>
                </ActionButtonsGroup>
            </EventDetails>
        </Card>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default EventCard;
