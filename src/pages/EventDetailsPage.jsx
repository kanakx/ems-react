import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteEventById, getEventById} from "../services/eventService.js";
import {useUserContext} from '../contexts/UserContext';
import {ActionButtonsGroup, Card, StyledButton} from "../themes/SharedStyles.jsx";
import Notification from "../components/Notification.jsx";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {FaCheck, FaEdit, FaTimes, FaTrashAlt} from "react-icons/fa";
import PageLayout from "../components/PageLayout.jsx";
import {getAttendee, getAttendeeEvents} from "../services/attendeeService.js";

const EventName = styled.h3`
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
    font-size: ${props => props.theme.typography.header};
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

`;

const EventDetailsPage = () => {
    const navigate = useNavigate();
    const {eventId} = useParams();
    const {isAuth, user} = useUserContext();
    const [event, setEvent] = useState(null);
    const [canEditAndDelete, setCanEditAndDelete] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [notification, setNotification] = useState({message: '', type: ''});

    useEffect(() => {
        getEventById(eventId)
            .then(eventData => {
                setEvent(eventData);
                if (isAuth && user) {
                    return getAttendeeEvents(user.idAttendee);
                }
            })
            .then(userEvents => {
                if (userEvents && event) {
                    const canEditAndDelete = userEvents.some(userEvent =>
                        userEvent.eventDto.idEvent === event.idEvent
                    );
                    setCanEditAndDelete(canEditAndDelete);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setNotification({message: 'Error loading event', type: 'error'});
            });
    }, [eventId, user, isAuth, event]);

    const handleEdit = () => {
        navigate(`/events/edit/${eventId}`);
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        setShowDeleteConfirmation(false);

        deleteEventById(eventId)
            .then(() => {
                setNotification({message: 'Event deleted successfully!', type: 'success'});
                setTimeout(() => navigate('/events'), 2000);
            })
            .catch(error => {
                console.error('Failed to delete event: ', error);
                setNotification({message: 'Failed to delete event.', type: 'error'});
            });
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    if (!event) return <Loading onBack={handleBackButton}/>;

    return (
        <PageLayout>
            <Card>
                <EventName>{event.name}</EventName>
                <DetailItem>
                    <Label>Start:</Label>
                    <Value>{formatDate(event.startTimestamp)}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>End:</Label>
                    <Value>{formatDate(event.endTimestamp)}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Location:</Label>
                    <Value>{event.locationName}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Type:</Label>
                    <Value>{event.type}</Value>
                </DetailItem>
                <DetailItem>
                    <Value>{event.description}</Value>
                </DetailItem>

                {isAuth && canEditAndDelete && (
                    <ActionButtonsGroup>
                        {showDeleteConfirmation ? (
                            <>
                                <StyledButton onClick={cancelDelete}>
                                    <FaTimes/>
                                </StyledButton>
                                <StyledButton onClick={confirmDelete}>
                                    <FaCheck/>
                                </StyledButton>
                            </>
                        ) : (
                            <>
                                <StyledButton onClick={handleDeleteClick}>
                                    <FaTrashAlt/>
                                </StyledButton>
                                <StyledButton onClick={handleEdit}>
                                    <FaEdit/>
                                </StyledButton>
                            </>
                        )}
                    </ActionButtonsGroup>
                )}

                {notification.message && (
                    <Notification message={notification.message} type={notification.type}/>
                )}

                <StyledButton onClick={handleBackButton}>
                    Back
                </StyledButton>
            </Card>
        </PageLayout>
    );
};

export default EventDetailsPage;
