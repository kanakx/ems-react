import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById, deleteById } from "../services/eventService.js";
import { useUserContext } from '../contexts/UserContext';
import {ActionButtonsGroup, PageLayout, StyledButton} from "../themes/SharedStyles.jsx";
import Notification from "../components/Notification.jsx";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {FaEdit, FaTrashAlt} from "react-icons/fa";

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
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useUserContext();
    const [event, setEvent] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        getById(eventId)
            .then(data => setEvent(data))
            .catch(error => {
                console.error('Failed to fetch event: ', error);
                setNotification({ message: 'Failed to load event.', type: 'error' });
            });
    }, [eventId]);

    const handleEdit = () => {
        navigate(`/events/edit/${eventId}`);
    };

    const handleDelete = () => {
        // Confirm before deleting
        if (window.confirm("Are you sure you want to delete this event?")) {
            deleteById(eventId)
                .then(() => {
                    setNotification({ message: 'Event deleted successfully!', type: 'success' });
                    setTimeout(() => navigate('/events'), 2000);
                })
                .catch(error => {
                    console.error('Failed to delete event: ', error);
                    setNotification({ message: 'Failed to delete event.', type: 'error' });
                });
        }
    };

    const handleBackButton = () => {
        navigate('/events');
    };

    if (!event) return <Loading onBack={handleBackButton}/>;

    return (
        <PageLayout>
            <EventName>{event.name}</EventName>
            <DetailItem>
                <Label>Start:</Label>
                <Value>{event.startTimestamp}</Value>
            </DetailItem>
            <DetailItem>
                <Label>End:</Label>
                <Value>{event.endTimestamp}</Value>
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
                <Label>Description:</Label>
                <Value>{event.description}</Value>
            </DetailItem>

            {isAuth && (
                <ActionButtonsGroup>
                    <StyledButton onClick={handleDelete}>
                        <FaTrashAlt/>
                    </StyledButton>
                    <StyledButton onClick={handleEdit}>
                        <FaEdit/>
                    </StyledButton>
                </ActionButtonsGroup>
            )}

            {notification.message && (
                <Notification message={notification.message} type={notification.type}/>
            )}

            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default EventDetailsPage;
